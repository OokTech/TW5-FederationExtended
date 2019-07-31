/*\
title: $:/plugins/Federation/FederationExtended/extendedBundleOptions.js
type: application/javascript
module-type: utils

These are functions that define how tiddlers are bundled when a tiddler bundle is requested.

This is made to extend what is available in the FederationCore plugin and that
plugin is required for this one to function.

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

exports.name = "extendedBundleOptions";
exports.platforms = ["browser"];
exports.before = ["browser-messaging"];
exports.synchronous = true;

$tw.wiki.bundleHandler = $tw.wiki.bundleHandler || {};
$tw.wiki.bundleFunction = $tw.wiki.bundleFunction || {};

/*
// An example bundle handler
$tw.wiki.bundleHandler.someHandler = function(event) {
  // This is a very simple handler as an example, change it to whatever you
  // want.
  const creationFields = $tw.wiki.getCreationFields();
  event.data.bundle.title = event.data.bundle.title + ' - ' + event.data.origin;
  $tw.wiki.addTiddler(new $tw.Tiddler(creationFields, event.data.bundle));
};
*/

})();
