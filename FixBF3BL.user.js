// ==UserScript==
// @name         FixBF3BL
// @namespace    http://example.com/
// @version      1.0.0
// @description  Fix BF3 Limited Edition B2K/Premium Servers
// @author       MrGForse
// @match        https://battlelog.battlefield.com/bf3/*
// @run-at       document-start
// ==/UserScript==

// The below code will replace all relevant hosted JS assets with custom ones.


var new438223020 = "https://rawcdn.githack.com/MrGForse/BF3-Limited-Edition-B2K-Fix/8195622f9f148613d512b1a375eb2cb68f245a27/bundle_base_bottombundles_438223020.js";
var old438223020 = "//eaassets-a.akamaihd.net/bl-cdn/cdnprefix/production-284-20170531/public/generated/en_US/bundle_base_bottombundles_438223020.js";

var pattern2 = new RegExp(old438223020, "i");

function injectScript(originalPage) { //Function injectScript replaces the file
    console.log('Performing inection, please wait...');
    var moddedPagept2 = originalPage.replace(pattern2, new438223020);
    document.open();
    console.log('Reloading page with injected scripts...');
    document.write(moddedPagept2);
    document.close();
}

setTimeout(function() { // Initialise script and wait for HTML to load
    console.log('Initialising...');
    injectScript(document.documentElement.outerHTML);
}, 1111);