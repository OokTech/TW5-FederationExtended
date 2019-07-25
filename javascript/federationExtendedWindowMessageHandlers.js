/*\
title: $:/plugins/Federation/FederationExtended/federationExtendedWindowMessageHandlers.js
type: application/javascript
module-type: utils

These are functions that handle messages that are sent using the postMessage
function to communicate across the iframe boundary.

These are extensions to what is available in the FederationCore plugin and
this plugin requires that one to function.

You can use this as a function template:

For new ones just use $tw.wiki.functionName = function (event) {
  <<function Content>>
  event.source.postMessage({verb:"DELIVER_BUNDLE", bundle: Bundle, origin: event.data.destination},"*");
}

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.name = "federationExtendedWindowMessageHandlers";
exports.platforms = ["browser"];
exports.before = ["browser-messaging"];
exports.synchronous = true;

function closeIFrame(url) {
  const iframe = document.body.getElementsByTagName('iframe');
  for (let j = 0; j < iframe.length; j++) {
    if (iframe[j].src === url) {
      document.body.removeChild(iframe[j]);
      $tw.browserMessaging.iframeInfoMap[url] = null;
    }
  }
}

$tw.windowMessageHandlers = $tw.windowMessageHandlers || {};

/*
$tw.windowMessageHandlers.EXAMPLE_NAME = function (event) {
  // If this message would open an iframe, generally you want to close it here.
  //closeIFrame(event.data.origin);
}
*/
})();
