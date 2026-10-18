package com.lokeshreddy.portfolio.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// Same saffron Material 3 roles as the website's src/index.css, so native UI matches the web content.
private val LightColors = lightColorScheme(
    primary = Color(0xFF8B5000),
    onPrimary = Color(0xFFFFFFFF),
    primaryContainer = Color(0xFFFFDCBE),
    onPrimaryContainer = Color(0xFF2C1600),
    secondaryContainer = Color(0xFFF5E6D8),
    onSecondaryContainer = Color(0xFF2A1705),
    background = Color(0xFFFFF8F3),
    surface = Color(0xFFFFF8F3),
    surfaceContainer = Color(0xFFF5EBE2),
    onSurface = Color(0xFF221A13),
    onSurfaceVariant = Color(0xFF52443A),
    outline = Color(0xFF85736A),
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFFFFB870),
    onPrimary = Color(0xFF4A2800),
    primaryContainer = Color(0xFF693C00),
    onPrimaryContainer = Color(0xFFFFDCBE),
    secondaryContainer = Color(0xFF3D2D20),
    onSecondaryContainer = Color(0xFFFFDCBE),
    background = Color(0xFF19120C),
    surface = Color(0xFF19120C),
    surfaceContainer = Color(0xFF261E17),
    onSurface = Color(0xFFEFE0D5),
    onSurfaceVariant = Color(0xFFD6C3B4),
    outline = Color(0xFF9F8D80),
)

@Composable
fun PortfolioTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        content = content,
    )
}
