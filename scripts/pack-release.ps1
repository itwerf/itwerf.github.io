param(
  [string]$Version = '0.1.0-prerelease'
)

$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$outDir = Join-Path $root 'releases'
$zipName = "devfolio-$Version.zip"
$zipPath = Join-Path $outDir $zipName
$stage = Join-Path $env:TEMP ("devfolio-pack-" + [guid]::NewGuid().ToString('n'))

New-Item -ItemType Directory -Force -Path $outDir, $stage | Out-Null

# Ensure generic branding inside the zip people download
& (Join-Path $PSScriptRoot 'apply-variant.ps1') -Variant generic

$include = @(
  'about.html', 'blog.html', 'contact.html', 'download.html', 'index.html', 'post.html', 'project.html', 'projects.html',
  'favicon.svg', '.nojekyll', '.gitignore', 'README.md',
  'assets', 'config', 'content', 'i18n', 'releases'
)

foreach ($item in $include) {
  $from = Join-Path $root $item
  if (-not (Test-Path $from)) { continue }
  Copy-Item $from (Join-Path $stage $item) -Recurse -Force
}

Get-ChildItem (Join-Path $stage 'releases') -Filter '*.zip' -ErrorAction SilentlyContinue | Remove-Item -Force

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zipPath -Force
Copy-Item $zipPath (Join-Path $outDir 'devfolio-starter.zip') -Force
Remove-Item $stage -Recurse -Force

Write-Host "Wrote $zipPath and releases/devfolio-starter.zip"
