---
date: 2026-10-20
summary: Download, set up, and launch the PartyVisionSMP Minecraft
  modpack with MultiMC or install the mods manually using Fabric.
tags:
- minecraft
- fabric
- gaming
- tutorials
title: Installing PartyVisionSMP
---

# Installing PartyVisionSMP

Welcome to **PartyVisionSMP (PVSMP)**! This guide explains how to
install the modpack and get ready to play.

There are three ways to get started:

-   **MultiMC:** Import the ready-to-use instance ZIP. Recommended for
    most players.
-   **Modrinth:** Get the modpack from Modrinth once its review is
    complete.
-   **Manual installation:** Install the mods yourself using Fabric and
    download each mod from its original project page.

## Downloads

### Option 1: MultiMC (recommended)

[Download the PartyVisionSMP MultiMC instance
ZIP](https://www.mediafire.com/file/58gmxqpdg0wv0mc/PVSMP.zip/file)

This is the prepared instance, intended to make installation as easy as
possible.

### Option 2: Manual installation

[Download the self-installation
ZIP](https://www.mediafire.com/file/z85spflz6ag0bmr/self-installation.zip/file)

You can also follow the manual installation instructions below and
download each mod from its original project page.

### Option 3: Modrinth

[Download the unverified Modrinth package
(`.mrpack`)](https://www.mediafire.com/file/pl385mg37o94q7r/PVSMP.mrpack/file)

[Visit PartyVisionSMP on
Modrinth](https://modrinth.com/modpack/partyvisionsmp)

**Important:** The Modrinth project is still under review. The `.mrpack`
linked above is an alternative download and has not been verified or
approved by Modrinth. Use it at your own discretion. Until the official
release is available, the MultiMC instance or manual installation is
recommended.

## Minecraft and Java requirements

PartyVisionSMP targets **Minecraft 26.2** and uses Fabric.

-   **Minecraft:** Java Edition 26.2
-   **Fabric Loader:** 0.19.5
-   **Java:** 25, as specified for this setup

Download Fabric from the [official Fabric
website](https://fabricmc.net/).

To install Fabric:

1.  Download and open the Fabric Installer.
2.  Select Minecraft version `26.2`.
3.  Select Fabric Loader version `0.19.5`.
4.  Install the client profile.
5.  Make sure your launcher uses a compatible Java runtime.

If the installer does not offer these exact versions, check their
availability before proceeding.

## Option 1: Install with MultiMC

1.  Download the [PVSMP MultiMC instance
    ZIP](https://www.mediafire.com/file/58gmxqpdg0wv0mc/PVSMP.zip/file).
2.  Open MultiMC.
3.  Choose the option to import an instance from a ZIP file. The exact
    menu wording may vary by launcher version.
4.  Select the downloaded ZIP and complete the import.
5.  Check the instance settings and Java runtime.
6.  Launch the instance.

Keep a copy of the original ZIP as a backup.

## Option 2: Install through Modrinth

Visit the [PartyVisionSMP Modrinth
page](https://modrinth.com/modpack/partyvisionsmp).

The project is still under review, so the official release may not be
available yet.

Once the release is approved and available:

1.  Install the Modrinth App.
2.  Open the PartyVisionSMP project page.
3.  Install the approved release.
4.  Launch the instance through the app.

Until then, use one of the other installation methods.

## Option 3: Install the mods manually

This method is for players who prefer to download the mods themselves
and verify their sources.

### Step 1: Install Fabric Loader

Download the installer from the [official Fabric
website](https://fabricmc.net/).

Select Minecraft `26.2` and Fabric Loader `0.19.5`, then install the
client profile.

Fabric Loader is the mod loader, not an additional mod JAR that you need
to place in the `mods` folder.

### Step 2: Download all nine mods

The list below is based on the JAR filenames included in PartyVisionSMP.
Each link points to the corresponding mod project page. Check the
project's files for the compatible Fabric build and the exact version
before downloading.

  -----------------------------------------------------------------------------------------------------------------
  \#                Mod                 Version in PVSMP  Original project
  ----------------- ------------------- ----------------- ---------------------------------------------------------
  1                 Distant Horizons    `3.3.2-26.2`      [Modrinth
                                                          project](https://modrinth.com/mod/distanthorizons)

  2                 Fabric API          `0.161.0+26.2`    [Modrinth project](https://modrinth.com/mod/fabric-api)

  3                 Iris Shaders        `1.11.4+mc26.2`   [Modrinth project](https://modrinth.com/mod/iris)

  4                 LambDynamicLights   `4.12.4+26.2`     [Modrinth
                                                          project](https://modrinth.com/mod/lambdynamiclights)

  5                 Sodium              `0.9.2+mc26.2`    [Modrinth project](https://modrinth.com/mod/sodium)

  6                 Sodium Zoom         `26.2-1.1.0`      [Modrinth project](https://modrinth.com/mod/sodium-zoom)

  7                 Simple Voice Chat   `26.2.22+26.2`    [Modrinth
                                                          project](https://modrinth.com/plugin/simple-voice-chat)

  8                 Xaero's Minimap     `26.2-26.6.0`     [Modrinth
                                                          project](https://modrinth.com/mod/xaeros-minimap)

  9                 Xaero's World Map   `26.2-1.47.0`     [Modrinth
                                                          project](https://modrinth.com/mod/xaeros-world-map)
  -----------------------------------------------------------------------------------------------------------------

These are project links, not guarantees that the exact versions will
always be available. Confirm the Minecraft version, Fabric support, and
dependencies on each project's page. Do not substitute Forge or NeoForge
builds.

### Step 3: Put the mods in your `mods` folder

1.  Open the game directory for your Fabric installation.
2.  Find or create the `mods` folder.
3.  Download the nine compatible mod JAR files.
4.  Place the JAR files directly into the `mods` folder.
5.  Install any additional dependencies required by the selected mod
    versions.
6.  Start Minecraft using your Fabric installation.

**Do not extract the `.jar` files.** Place them directly in the folder.

### Step 4: Test your installation

Before joining the server, check that:

-   Minecraft is running version 26.2.
-   Fabric Loader is version 0.19.5.
-   All nine intended mods are installed.
-   No required dependencies are missing.
-   The launcher is using a compatible Java runtime.
-   The game starts without mod-loading errors.

If the game crashes, check the latest log or crash report. Incompatible
mod versions and missing dependencies are common causes.

## Troubleshooting

**Minecraft will not launch**

Check the Minecraft version, Fabric Loader version, Java runtime, and
compatibility of every installed mod.

**A dependency is missing**

Read the affected mod's official documentation and install the required
compatible dependency.

**The game crashes after adding a mod**

Check the crash report and try removing the most recently added mod to
help identify the cause.

**The Modrinth release is unavailable**

The project may still be under review. Use the MultiMC instance or
manual installation instead.

## Ready to play?

Choose whichever installation method works best for you:

-   [MultiMC instance
    ZIP](https://www.mediafire.com/file/58gmxqpdg0wv0mc/PVSMP.zip/file)
-   [Manual installation
    ZIP](https://www.mediafire.com/file/z85spflz6ag0bmr/self-installation.zip/file)
-   [Unverified Modrinth
    package](https://www.mediafire.com/file/pl385mg37o94q7r/PVSMP.mrpack/file)
-   [PartyVisionSMP on
    Modrinth](https://modrinth.com/modpack/partyvisionsmp)

If you want to verify the sources yourself, use the original project
links in the manual installation section.

Have fun, and enjoy PartyVisionSMP!
