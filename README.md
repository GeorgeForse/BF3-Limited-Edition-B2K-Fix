# Battlefield 3 Limited Edition Back To Karkand DLC Battlelog Fix

## Disclaimer:

### Neither DICE nor the /r/Battlefield3 subreddit moderators have endorsed this fix, and, as a result, cannot be held responsible for any issues that may result from the use thereof.

#### I am also not responsible for game bans or other issues that you may experience as a result of using this. 'BetterBattlelog' used similar methods, so I assume it's fine, but please be aware that you do so at your own risk.

#### You MUST own Battlefield 3 Limited Edition for this fix to work. Make no attempt to try to use it without actually owning B2K, BF3 Premium or BF3 Limited Edition. You still need to own the DLC in some way, shape or form. This will not bypass Origin's DRM, and you should not make any attempt to do so.

## The problem:
One of the current Battlelog JS Scripts incorrectly checks for ownership of the Back to Karkand DLC. 

Battlelog queries Origin using HTTP on 127.0.0.1:3235 about which DLC the user owns. Origin responds (correctly!) with the installed DLCs, and also whether the user owns Limited Edition/Premium. This response is in JSON format.

Battlelog then checks the installed/owned DLC against a hardcoded list of DLC for BF3, which works as long as the user doesn't own BF3 Limited edition, as in some cases this seems to be missing from the hardcoded list of DLC. For those who don't know, Battlefield 3 Limited Edition includes Back to Karkand in the base game, as opposed to Battlefield 3 Standard which has it as a DLC. If the user owns Battlefield 3 Limited Edition, Battlelog will tell the user that they need Back to Karkand to play on a Premium/B2K server, even though the user owns B2K as part of Battlefield 3 Limited Edition.

![Image of B2K Buy Dialog](https://cdn.discordapp.com/attachments/164374781188243456/724303739908784128/unknown.png)

This is pure conjecture (and should not be taken as hard fact in the slightest), but I believe there must've been either some miscommunication between development studios, or a backend change modified some of the strings that Origin reports back to Battlelog. To be fair, Battlefield 3 has been out of support for the best part of a decade.

These are used in EA's original JavaScript file to check for DLC ownership of Back to Karkand (BF3B2K):

```
// BF3
    offerToGameExpansion["OFB-EAST:41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["234138300"] = gameExpansions.BF3B2K;
    offerToGameExpansion["DR:234138300"] = gameExpansions.BF3B2K;
    offerToGameExpansion["DR:234138400"] = gameExpansions.BF3B2K;
    offerToGameExpansion["OFB-EAST: 41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["_OFB-EAST:41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["OFB-EAST41331"] = gameExpansions.BF3B2K;
```

I will refer to this as the "Expansion Check". Interestingly, the other DLCs only have two entries.

A common workaround is to use a browser with PAPI/NPAPI Plug-In support, such as Microsoft Internet Explorer. This is not a good option in my opinion for various reasons which I won't delve into, considering PAPI/NPAPI plugin support has been absent in modern browsers for 4+ years. Internet Explorer is probably an incredibly difficult piece of software to get working for anyone using SteamPlay/Proton/WINE...

## The Fix:

Through hours of testing, I have discovered the method used to query the Origin client, and I have found the correct Battlefield 3 Limited Edition variable that needs to be checked by Battlelog to get Back to Karkand to launch. Battlefield 3 Limited Edition is reported as "DR: 224766400" by the Origin client.

This is the fixed Expansion Check for BF3B2K:

```
 // BF3
    offerToGameExpansion["OFB-EAST:41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["234138300"] = gameExpansions.BF3B2K;
    offerToGameExpansion["DR:234138300"] = gameExpansions.BF3B2K;
    offerToGameExpansion["DR:234138400"] = gameExpansions.BF3B2K;
    offerToGameExpansion["OFB-EAST: 41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["_OFB-EAST:41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["OFB-EAST41331"] = gameExpansions.BF3B2K;
    offerToGameExpansion["DR:224766400"] = gameExpansions.BF3B2K;
    offerToGameExpansion["224766400"] = gameExpansions.BF3B2K;
    offerToGameExpansion["DR: 224766400"] = gameExpansions.BF3B2K;
    offerToGameExpansion["_DR:224766400"] = gameExpansions.BF3B2K
```

Feel free to check the history of the main JS file in this repo to see how I arrived at the fix. You can see all of the functions I broke to try to get it to work, only to realise that there only needed to be 4 more lines added to the file (the file is 12MiB in size, and contains tens of thousands of lines of JS/JQuery).

## How do I use the fixed Expansion Check?

There are two parts to this fix. The first part is to block the original script, and the second part is to replace the script with one from this repository.

You will need the following browser extensions:
- uBlock Origin (or equivelant ad-blocker/script-blocker extension)
- Tampermonkey (or equivelant extension)

### 1. In uBlock Origin:

**Please note: This will break Battlelog until you set up Tampermonkey, but this is intentional and necessary for the fix to work. You must remove the filter list from your custom filters if you want to revert the changes.**

Open your uBlock Origin Dashboard, click "Filter Lists", scroll down to the bottom of the page, click "Import" and add the following filter list:

```https://raw.githubusercontent.com/MrGForse/BF3-Limited-Edition-B2K-Fix/master/script-blocklist```

Like this:

![Image uBlock Origin Import](https://cdn.discordapp.com/attachments/164374781188243456/724307623851327488/unknown.png)

Then click "Apply changes".

### 2. In Tampermonkey:

#### Please note: Installing random Tampermonkey scripts from unknown sources can be dangerous. Make sure that the author/source is someone you trust, or check through the script yourself to see what it does.

Once you have installed and enabled the Tampermonkey extension for your browser, click [here](https://github.com/MrGForse/BF3-Limited-Edition-B2K-Fix/blob/master/FixBF3BL.user.js), then click "Raw". Tampermonkey will prompt you to install the script. Make sure you also enable the script after installation.

The script is only active on ```https://battlelog.battlefield.com/bf3/*```, and all it does is replace the original file with the one hosted here (githack CDN). The changes ONLY include the fix for the Expansion Check. I encourage you to compare the original file with this one.

### Result:

If you have installed both the uBlock filter and Tampermonkey script correctly, you will now be able to join servers using B2K, as long as you are a legitimate owner of B2K or Battlefield 3 Limited Edition.

![Success!](https://cdn.discordapp.com/attachments/164374781188243456/724336840114438174/unknown.png)

## Closing thoughts:
#### If you, or someone you know, works at EA/DICE, please consider merging the changes to the Expansion Check. This will save EA countless customer support hours, and will make the experience for new Battlefield 3 Limited Edition users much less confusing.
#### I will try to contact the developers myself through supported channels, however I appreciate that corporate structures sometimes prevent support staff from contacting developers directly.
