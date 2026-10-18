package com.lokeshreddy.portfolio.ui

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.widget.Toast
import androidx.browser.customtabs.CustomTabColorSchemeParams
import androidx.browser.customtabs.CustomTabsIntent

/**
 * Decides where a link tapped inside the WebView should go. Returns true when the link was
 * handed off to another app, meaning the WebView must not load it itself.
 */
class LinkHandler(
    private val context: Context,
    private val homeHost: String,
    private val toolbarColor: Int,
) {
    fun handle(uri: Uri): Boolean = when (uri.scheme?.lowercase()) {
        "http", "https" -> if (uri.host.equals(homeHost, ignoreCase = true)) false else openWebLink(uri)
        "mailto", "tel", "sms", "geo", "market", "intent" -> openInOtherApp(uri)
        // about:blank, data:, javascript: and the like stay inside the WebView.
        else -> false
    }

    private fun openWebLink(uri: Uri): Boolean {
        // Prefer a native app that verifies itself for the URL (Play Store, GitHub, LinkedIn...).
        // FLAG_ACTIVITY_REQUIRE_NON_BROWSER makes startActivity throw instead of opening a browser,
        // so we can fall back to a Custom Tab without needing <queries> for package visibility.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val nativeApp = Intent(Intent.ACTION_VIEW, uri).apply {
                addCategory(Intent.CATEGORY_BROWSABLE)
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_REQUIRE_NON_BROWSER
            }
            try {
                context.startActivity(nativeApp)
                return true
            } catch (_: ActivityNotFoundException) {
                // No app claims this URL: fall through to a Custom Tab.
            }
        }
        openCustomTab(uri)
        return true
    }

    private fun openCustomTab(uri: Uri) {
        val colors = CustomTabColorSchemeParams.Builder().setToolbarColor(toolbarColor).build()
        val customTab = CustomTabsIntent.Builder()
            .setDefaultColorSchemeParams(colors)
            .setShowTitle(true)
            .build()
        customTab.intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        try {
            customTab.launchUrl(context, uri)
        } catch (_: ActivityNotFoundException) {
            // No browser at all (rare, e.g. stripped-down devices).
            showNoAppToast()
        }
    }

    private fun openInOtherApp(uri: Uri): Boolean {
        val intent = if (uri.scheme == "intent") {
            // Untrusted page content: parse it, but never let it target a specific component of ours.
            Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME).apply {
                component = null
                selector = null
                addCategory(Intent.CATEGORY_BROWSABLE)
            }
        } else {
            Intent(Intent.ACTION_VIEW, uri)
        }
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        try {
            context.startActivity(intent)
        } catch (_: ActivityNotFoundException) {
            showNoAppToast()
        }
        return true
    }

    private fun showNoAppToast() {
        Toast.makeText(context, "No app found to open this link", Toast.LENGTH_SHORT).show()
    }
}
