package com.lokeshreddy.portfolio

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.unit.dp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.WindowCompat
import com.lokeshreddy.portfolio.ui.ErrorScreen
import com.lokeshreddy.portfolio.ui.PortfolioWebView
import com.lokeshreddy.portfolio.ui.PortfolioWebViewState
import com.lokeshreddy.portfolio.ui.rememberPortfolioWebViewState
import com.lokeshreddy.portfolio.ui.theme.PortfolioTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    // Read by the splash screen on every frame, so a plain field (not Compose state) is the right fit.
    @Volatile
    private var pageReady = false

    override fun onCreate(savedInstanceState: Bundle?) {
        // Must run before super.onCreate(): it swaps the Starting theme for postSplashScreenTheme.
        val splash = installSplashScreen()
        // Keep the splash up until the site has drawn, instead of flashing an empty WebView.
        // The timeout is a safety net so a slow network never traps the user on the splash.
        splash.setKeepOnScreenCondition { !pageReady }
        window.decorView.postDelayed({ pageReady = true }, SPLASH_TIMEOUT_MS)

        // Edge-to-edge is forced from targetSdk 35; this also picks status bar icon colours for the theme.
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        // Lets desktop Chrome's chrome://inspect attach DevTools to the WebView; never in release builds.
        if (BuildConfig.DEBUG) WebView.setWebContentsDebuggingEnabled(true)
        setContent {
            val state = rememberPortfolioWebViewState()
            LaunchedEffect(state.firstLoadDone) {
                if (state.firstLoadDone) pageReady = true
            }
            // Once the page reports its theme over the bridge, native UI follows the site, not the OS.
            val darkTheme = state.webDarkTheme ?: isSystemInDarkTheme()
            SystemBarIcons(darkTheme)
            PortfolioTheme(darkTheme = darkTheme) {
                Surface(modifier = Modifier.fillMaxSize()) {
                    PortfolioScreen(state)
                }
            }
        }
    }

    private companion object {
        const val SPLASH_TIMEOUT_MS = 4_000L
    }
}

/** Dark status/navigation bar icons on a light page, light icons on a dark page. */
@Composable
private fun SystemBarIcons(darkTheme: Boolean) {
    val view = LocalView.current
    LaunchedEffect(darkTheme) {
        val window = (view.context as ComponentActivity).window
        WindowCompat.getInsetsController(window, view).apply {
            isAppearanceLightStatusBars = !darkTheme
            isAppearanceLightNavigationBars = !darkTheme
        }
    }
}

@Composable
private fun PortfolioScreen(state: PortfolioWebViewState) {
    val context = LocalContext.current
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    // WebView knows nothing about window insets, so Compose pads it clear of the status and navigation bars.
    Box(modifier = Modifier.fillMaxSize().windowInsetsPadding(WindowInsets.safeDrawing)) {
        PortfolioWebView(
            url = BuildConfig.PORTFOLIO_URL,
            state = state,
            modifier = Modifier.fillMaxSize(),
            onCopyRequested = { label, text ->
                copyToClipboard(context, label, text)
                // Android 13+ shows its own clipboard confirmation; a second one would just be noise.
                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
                    scope.launch { snackbarHostState.showSnackbar("$label copied") }
                }
            },
            onShareRequested = { url, title -> shareLink(context, url, title) },
        )

        AnimatedVisibility(
            visible = state.isLoading,
            enter = fadeIn(),
            exit = fadeOut(),
            modifier = Modifier.align(Alignment.TopCenter),
        ) {
            LinearProgressIndicator(
                progress = { state.progress / 100f },
                modifier = Modifier.fillMaxWidth(),
                color = MaterialTheme.colorScheme.primary,
                trackColor = MaterialTheme.colorScheme.primaryContainer,
            )
        }

        state.error?.let { error ->
            ErrorScreen(error = error, onRetry = state::reload)
        }

        SnackbarHost(
            hostState = snackbarHostState,
            modifier = Modifier.align(Alignment.BottomCenter).padding(16.dp),
        )
    }
}

/** Opens Android's share sheet (WebView doesn't implement the Web Share API, so the site asks us). */
private fun shareLink(context: Context, url: String, title: String) {
    val send = Intent(Intent.ACTION_SEND).apply {
        type = "text/plain"
        putExtra(Intent.EXTRA_TEXT, url)
        putExtra(Intent.EXTRA_TITLE, title) // Shown as the share sheet's preview title.
    }
    context.startActivity(Intent.createChooser(send, null))
}

private fun copyToClipboard(context: Context, label: String, text: String) {
    val clipboard = context.getSystemService(ClipboardManager::class.java)
    clipboard.setPrimaryClip(ClipData.newPlainText(label, text))
}
