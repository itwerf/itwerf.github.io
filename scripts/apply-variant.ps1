param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('generic', 'itwerf')]
  [string]$Variant
)

$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$src = Join-Path $root "variants\$Variant"

if (-not (Test-Path $src)) {
  throw "Variant folder missing: $src"
}

Copy-Item (Join-Path $src 'config\site.json') (Join-Path $root 'config\site.json') -Force
Copy-Item (Join-Path $src 'content\projects.json') (Join-Path $root 'content\projects.json') -Force

$about = Join-Path $src 'content\about.json'
if (Test-Path $about) {
  Copy-Item $about (Join-Path $root 'content\about.json') -Force
}

$readme = Join-Path $src 'README.md'
if (Test-Path $readme) {
  Copy-Item $readme (Join-Path $root 'README.md') -Force
}

Write-Host "Applied variant: $Variant"
