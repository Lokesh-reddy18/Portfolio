package com.lokeshreddy.portfolio.ui

import android.net.Uri
import android.webkit.WebView
import androidx.core.net.toUri
import androidx.webkit.JavaScriptReplyProxy
import androidx.webkit.WebMessageCompat
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import org.json.JSONObject

/**
 * Receives messages from the website through `window.AndroidBridge.postMessage(json)`.
 *
 * Unlike @JavascriptInterface (callable by *any* page the WebView loads, on a background thread),
 * a WebMessageListener is only injected into origins we allow, tells us the sender's origin,
 * runs on the main thread, and can reply through [JavaScriptReplyProxy].
 */
class NativeBridge(
    private val onCopy: (label: String, text: String) -> Unit,
    private val onThemeChanged: (dark: Boolean) -> Unit,
    private val onShare: (url: String, title: String) -> Unit,
) : WebViewCompat.WebMessageListener {

    override fun onPostMessage(
        view: WebView,
        message: WebMessageCompat,
        sourceOrigin: Uri,
        isMainFrame: Boolean,
        replyProxy: JavaScriptReplyProxy,
    ) {
        // Embedded iframes (ads, widgets) could share the origin rules; only trust the page itself.
        if (!isMainFrame) return
        val json = message.data?.let { runCatching { JSONObject(it) }.getOrNull() } ?: return

        when (json.optString("type")) {
            "copy" -> {
                val text = json.optString("text")
                val label = json.optString("label", "Text")
                // The page is still untrusted input: don't let it stuff huge payloads into the clipboard.
                if (text.isBlank() || text.length > MAX_COPY_LENGTH) return
                onCopy(label, text)
                // Only reachable when the feature exists (see install), but lint wants the check at the call.
                if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) {
                    replyProxy.postMessage(JSONObject().put("type", "copied").put("label", label).toString())
                }
            }
            "theme" -> onThemeChanged(json.optBoolean("dark"))
            "share" -> {
                val url = json.optString("url").toUri()
                // Only share real web links; never let the page hand us intent:, file: or content: URIs.
                if (url.scheme != "https" && url.scheme != "http") return
                onShare(url.toString(), json.optString("title").take(MAX_TITLE_LENGTH))
            }
        }
    }

    companion object {
        const val JS_OBJECT_NAME = "AndroidBridge"
        private const val MAX_COPY_LENGTH = 1_000
        private const val MAX_TITLE_LENGTH = 200

        /** Must run before loadUrl(): the object is injected when each matching page starts loading. */
        fun install(webView: WebView, pageUrl: String, bridge: NativeBridge): Boolean {
            if (!WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) return false
            WebViewCompat.addWebMessageListener(webView, JS_OBJECT_NAME, setOf(originOf(pageUrl)), bridge)
            return true
        }

        // "https://lokesh-reddy18.netlify.app/" -> "https://lokesh-reddy18.netlify.app" (port kept if present).
        private fun originOf(url: String): String {
            val uri = url.toUri()
            val port = if (uri.port != -1) ":${uri.port}" else ""
            return "${uri.scheme}://${uri.host}$port"
        }
    }
}
