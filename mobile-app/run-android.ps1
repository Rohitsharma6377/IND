# Quick Run Script for Android Emulator
# This script builds the app and opens Android Studio

Write-Host "🚀 TaskFlow - Running on Android Emulator" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the app
Write-Host "📦 Step 1: Building the app..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Step 2: Sync to Android
Write-Host "🔄 Step 2: Syncing to Android..." -ForegroundColor Yellow
npm run android:sync

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Sync failed! Check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Sync successful!" -ForegroundColor Green
Write-Host ""

# Step 3: Open Android Studio
Write-Host "📱 Step 3: Opening Android Studio..." -ForegroundColor Yellow
npm run android:open

Write-Host ""
Write-Host "✨ Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Wait for Android Studio to open" -ForegroundColor White
Write-Host "  2. Wait for Gradle sync to complete" -ForegroundColor White
Write-Host "  3. Click 'Device Manager' to create/start an emulator" -ForegroundColor White
Write-Host "  4. Click the green Run button (▶️)" -ForegroundColor White
Write-Host "  5. Select your emulator" -ForegroundColor White
Write-Host "  6. Wait for the app to build and launch!" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your app will launch in the emulator!" -ForegroundColor Green
