package com.lokeshreddy.portfolio.ui

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.rememberUpdatedState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.net.toUri
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

@SuppressLint("SetJavaScriptEnabled") // The site is a React app: without JS it renders a blank page.
@Composable
fun PortfolioWebView(
    url: String,
    state: PortfolioWebViewState,
    modifier: Modifier = Modifier,
    onCopyRequested: (label: String, text: String) -> Unit = { _, _ -> },
    onShareRequested: (url: String, title: String) -> Unit = { _, _ -> },
) {
    // The factory below runs once, so the bridge reads the latest callbacks through these holders
    // instead of capturing the lambdas from the first composition forever.
    val currentOnCopy by rememberUpdatedState(onCopyRequested)
    val currentOnShare by rememberUpdatedState(onShareRequested)

    // Back gesture walks the page history first; only when there's none left does it close the app.
    BackHandler(enabled = state.canGoBack) { state.goBack() }

    val spinnerColor = MaterialTheme.colorScheme.primary.toArgb()
    val spinnerBackground = MaterialTheme.colorScheme.surfaceContainer.toArgb()
    val toolbarColor = MaterialTheme.colorScheme.surface.toArgb()

    AndroidView(
        modifier = modifier,
        factory = { context ->
            // Compose's PullToRefreshBox relies on nested scrolling, which WebView doesn't take part in,
            // so the classic SwipeRefreshLayout view wraps the WebView instead.
            val swipeRefresh = SwipeRefreshLayout(context)
            val linkHandler = LinkHandler(
                context = context,
                homeHost = url.toUri().host.orEmpty(),
                toolbarColor = toolbarColor,
            )

            val webView = WebView(context).apply {
                layoutParams = android.view.ViewGroup.LayoutParams(MATCH_PARENT, MATCH_PARENT)
                settings.javaScriptEnabled = true
                // The site keeps the light/dark choice in localStorage; it's off by default in WebView.
                settings.domStorageEnabled = true

                webViewClient = object : WebViewClient() {
                    override fun onPageStarted(view: WebView, url: String?, favicon: Bitmap?) {
                        state.error = null
                    }

                    override fun onPageFinished(view: WebView, url: String?) {
                        swipeRefresh.isRefreshing = false
                        state.firstLoadDone = true
                    }

                    // Called before every navigation the page starts (taps, target="_blank", redirects).
                    // Returning true means "handled elsewhere": the WebView doesn't load it.
                    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean =
                        linkHandler.handle(request.url)

                    // Fires for in-page navigations too (e.g. #contact anchors), which onPageStarted misses.
                    override fun doUpdateVisitedHistory(view: WebView, url: String?, isReload: Boolean) {
                        state.canGoBack = view.canGoBack()
                    }

                    override fun onReceivedError(view: WebView, request: WebResourceRequest, error: WebResourceError) {
                        // A failed image or font shouldn't replace the whole page with an error screen.
                        if (!request.isForMainFrame) return
                        swipeRefresh.isRefreshing = false
                        state.firstLoadDone = true
                        state.error = when (error.errorCode) {
                            ERROR_HOST_LOOKUP, ERROR_CONNECT, ERROR_TIMEOUT -> LoadError.Offline
                            else -> LoadError.Other(error.description.toString())
                        }
                    }
                }

                webChromeClient = object : WebChromeClient() {
                    override fun onProgressChanged(view: WebView, newProgress: Int) {
                        state.progress = newProgress
                    }
                }

                NativeBridge.install(
                    webView = this,
                    pageUrl = url,
                    bridge = NativeBridge(
                        onCopy = { label, text -> currentOnCopy(label, text) },
                        onThemeChanged = { dark -> state.webDarkTheme = dark },
                        onShare = { shareUrl, title -> currentOnShare(shareUrl, title) },
                    ),
                )
                // After process death, bring back the history the user had; otherwise start fresh.
                val restored = state.consumeRestoredWebViewState()
                if (restored == null || restoreState(restored) == null) loadUrl(url)
            }

            swipeRefresh.apply {
                addView(webView)
                setColorSchemeColors(spinnerColor)
                setProgressBackgroundColorSchemeColor(spinnerBackground)
                setOnRefreshListener { state.reload() }
                // Only allow the pull when the page is scrolled to the very top.
                setOnChildScrollUpCallback { _, _ -> webView.scrollY > 0 }
            }
            state.webView = webView
            swipeRefresh
        },
        onRelease = { state.webView = null },
    )
}
