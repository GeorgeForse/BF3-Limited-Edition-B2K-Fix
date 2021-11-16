// ==UserScript==
// @name         FixBF3BL
// @namespace    https://frae.io
// @version      1.0.0a
// @description  Fix BF3 Limited Edition B2K/Premium Servers
// @author       MrGForse
// @match        https://battlelog.battlefield.com/bf3/*
// @run-at       document-start
// ==/UserScript==

// The below code will replace all relevant hosted JS assets with custom ones.

//438223020
const old_data = /\/\/eaassets-a.akamaihd.net\/bl-cdn\/cdnprefix\/production-\d+-\d+\/public\/generated\/en_US\/bundle_base_bottombundles_438223020.js/;
const new_data = "https://rawcdn.githack.com/MrGForse/BF3-Limited-Edition-B2K-Fix/8195622f9f148613d512b1a375eb2cb68f245a27/bundle_base_bottombundles_438223020.js";

function injectScript(originalPage) { //Function injectScript replaces the file
    console.log('Performing inection, please wait...');
    document.open();
    console.log('Reloading page with injected scripts...');
    document.write(originalPage.replace(old_data, new_data));
    document.close();
}

setTimeout(function() { // Initialise script and wait for HTML to load
    console.log('Initialising...');
    injectScript(document.documentElement.outerHTML);
}, 1111);
