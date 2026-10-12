param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('generic', 'itwerf', 'all')]
  [string]$Target
)

$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

function Publish-One {
  param(
    [string]$Variant,
    [string]$RemoteUrl,
    [string]$RemoteName
  )

  Write-Host "`n=== Publishing $Variant -> $RemoteUrl ===" -ForegroundColor Cyan

  & (Join-Path $PSScriptRoot 'apply-variant.ps1') -Variant $Variant
  if ($Variant -eq 'generic') {
    & (Join-Path $PSScriptRoot 'pack-release.ps1')
    & (Join-Path $PSScriptRoot 'apply-variant.ps1') -Variant generic
  }

  $tmp = Join-Path $env:TEMP ("devfolio-publish-" + $Variant + "-" + [guid]::NewGuid().ToString('n'))
  New-Item -ItemType Directory -Force -Path $tmp | Out-Null

  $copy = @(
    'about.html', 'blog.html', 'contact.html', 'download.html', 'index.html', 'post.html', 'project.html', 'projects.html',
    'favicon.svg', '.nojekyll', '.gitignore', 'README.md',
    'assets', 'config', 'content', 'i18n', 'releases', 'variants', 'scripts'
  )
  foreach ($item in $copy) {
    $from = Join-Path $root $item
    if (Test-Path $from) {
      Copy-Item $from (Join-Path $tmp $item) -Recurse -Force
    }
  }

  Push-Location $tmp
  try {
    & 'C:\Program Files\Git\cmd\git.exe' init -b main | Out-Null
    & 'C:\Program Files\Git\cmd\git.exe' add -A
    $msg = "Publish $Variant site.`n`nAssisted by Cursor - project realisation and bug correction."
    $msgFile = Join-Path $tmp 'COMMITMSG'
    [IO.File]::WriteAllText($msgFile, $msg + "`n", [Text.UTF8Encoding]::new($false))
    & 'C:\Program Files\Git\cmd\git.exe' -c user.email='49352136+djdeathgirl@users.noreply.github.com' -c user.name='djdeathgirl' commit -F $msgFile | Out-Null
    & 'C:\Program Files\Git\cmd\git.exe' remote add origin $RemoteUrl
    & 'C:\Program Files\Git\cmd\git.exe' push -u origin main --force
    Write-Host "Pushed $Variant successfully." -ForegroundColor Green
  }
  finally {
    Pop-Location
    Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
  }
}

# Restore org files in the working tree after publish by default
$restore = 'itwerf'

if ($Target -eq 'generic' -or $Target -eq 'all') {
  Publish-One -Variant 'generic' -RemoteUrl 'https://github.com/itwerf/devfolio.git' -RemoteName 'devfolio'
}
if ($Target -eq 'itwerf' -or $Target -eq 'all') {
  Publish-One -Variant 'itwerf' -RemoteUrl 'https://github.com/itwerf/itwerf.github.io.git' -RemoteName 'pages'
}

& (Join-Path $PSScriptRoot 'apply-variant.ps1') -Variant $restore
Write-Host "`nWorking tree restored to variant: $restore" -ForegroundColor Yellow
