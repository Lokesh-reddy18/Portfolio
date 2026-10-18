plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.lokeshreddy.portfolio"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.lokeshreddy.portfolio"
        minSdk = 26
        targetSdk = 36
        // CI passes these from the git tag (android-v1.2.3 -> versionName 1.2.3, versionCode 10203).
        versionCode = providers.gradleProperty("versionCode").map(String::toInt).getOrElse(1)
        versionName = providers.gradleProperty("versionName").getOrElse("1.0.0")

        // The site the WebView loads. Point a build at a local dev server without editing code:
        //   ./gradlew installDebug -PportfolioUrl=http://localhost:5174/   (plus `adb reverse tcp:5174 tcp:5174`)
        val portfolioUrl = providers.gradleProperty("portfolioUrl").getOrElse("https://lokesh-reddy18.netlify.app/")
        buildConfigField("String", "PORTFOLIO_URL", "\"$portfolioUrl\"")
    }

    // The release key never lives in the repo: CI writes it from GitHub Secrets, and locally you can
    // export the same four variables. Without them, release builds come out unsigned (still compile).
    val releaseKeystore = System.getenv("ANDROID_KEYSTORE_PATH")?.let(::file)?.takeIf { it.exists() }
    signingConfigs {
        if (releaseKeystore != null) {
            create("release") {
                storeFile = releaseKeystore
                storePassword = System.getenv("ANDROID_KEYSTORE_PASSWORD")
                keyAlias = System.getenv("ANDROID_KEY_ALIAS")
                keyPassword = System.getenv("ANDROID_KEY_PASSWORD")
            }
        }
    }

    buildTypes {
        debug {
            // Different package name, so a debug build and the released app can sit side by side.
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
        }
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"))
            signingConfig = signingConfigs.findByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }
}

kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.swiperefreshlayout)
    implementation(libs.androidx.browser)
    implementation(libs.androidx.webkit)
    implementation(libs.androidx.core.splashscreen)

    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    debugImplementation(libs.androidx.compose.ui.tooling)
}
