package com.lokeshreddy.portfolio.ui

import android.os.Bundle
import android.webkit.WebView
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.Saver
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue

sealed interface LoadError {
    data object Offline : LoadError
    data class Other(val description: String) : LoadError
}

/**
 * Observable state for the WebView. The WebView reports through callbacks (WebViewClient /
 * WebChromeClient); this class turns those into Compose state so the UI around it can react.
 */
@Stable
class PortfolioWebViewState internal constructor(
    private var restoredWebViewState: Bundle? = null,
) {
    var progress by mutableIntStateOf(0)
        internal set
    var canGoBack by mutableStateOf(false)
        internal set
    var error by mutableStateOf<LoadError?>(null)
        internal set

    /** The website's own light/dark choice, reported over the JS bridge; null until the page says. */
    var webDarkTheme by mutableStateOf<Boolean?>(null)
        internal set

    /** Becomes true once the first page finishes (or fails); the splash screen waits for this. */
    var firstLoadDone by mutableStateOf(false)
        internal set

    internal var webView: WebView? = null

    val isLoading: Boolean get() = progress in 0..99

    fun goBack() {
        webView?.goBack()
    }

    fun reload() {
        error = null
        webView?.reload()
    }

    /** History saved before the process was killed, handed to the new WebView exactly once. */
    internal fun consumeRestoredWebViewState(): Bundle? = restoredWebViewState.also { restoredWebViewState = null }

    companion object {
        // rememberSaveable runs `save` when the Activity saves its state (e.g. before the system kills
        // a backgrounded app), and `restore` when it comes back. WebView.saveState() stores the
        // back/forward history, not the page itself, so the Bundle stays small.
        val Saver: Saver<PortfolioWebViewState, Bundle> = Saver(
            save = { state -> Bundle().also { bundle -> state.webView?.saveState(bundle) } },
            restore = { bundle -> PortfolioWebViewState(restoredWebViewState = bundle) },
        )
    }
}

@Composable
fun rememberPortfolioWebViewState(): PortfolioWebViewState =
    rememberSaveable(saver = PortfolioWebViewState.Saver) { PortfolioWebViewState() }
