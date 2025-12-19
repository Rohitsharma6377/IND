# Fix CSS in Android Build
Write-Host "Fixing CSS for Android Build..." -ForegroundColor Cyan

# Copy CSS to static folder
Copy-Item ".indjs\client\styles.css" ".indjs\static\styles.css" -Force
Write-Host "CSS copied!" -ForegroundColor Green

# Update HTML files
$htmlFiles = Get-ChildItem -Path ".indjs\static" -Filter "*.html"
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -notmatch '<link rel="stylesheet" href="/styles.css">') {
        $content = $content -replace '</head>', '  <link rel="stylesheet" href="/styles.css">`n</head>'
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated: $($file.Name)" -ForegroundColor Green
    }
}

# Sync to Android
Write-Host "Syncing to Android..." -ForegroundColor Yellow
npm run android:sync

Write-Host "Done! Now rebuild in Android Studio." -ForegroundColor Green
