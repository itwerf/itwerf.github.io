# ITwerf

Organisation site for **[ITwerf](https://github.com/itwerf)** - powered by [Devfolio](https://github.com/itwerf/devfolio).

**Live:** https://itwerf.github.io

This repository is the **branded org site**.  
The clean, reusable starter lives at: https://github.com/itwerf/devfolio

## For visitors

- **Who we are** - about ITwerf  
- **Work** - projects (including Devfolio)  
- **Download** - Devfolio version history / prebuilds  
- Header: **EN/NL** and **dark/light**

## For contributors (this monorepo checkout)

Local working copy uses variants:

```powershell
# Preview org site files
.\scripts\apply-variant.ps1 -Variant itwerf

# Preview / pack generic starter
.\scripts\apply-variant.ps1 -Variant generic
.\scripts\pack-release.ps1

# Publish both remotes (force-updates each repo tree)
.\scripts\publish.ps1 -Target all
# or:
.\scripts\publish.ps1 -Target generic   # -> itwerf/devfolio
.\scripts\publish.ps1 -Target itwerf    # -> itwerf/itwerf.github.io
```

Pages setting for this org site: **Deploy from a branch → main → / (root)**.

## Credits

Assisted by Cursor - project realisation and bug correction.
