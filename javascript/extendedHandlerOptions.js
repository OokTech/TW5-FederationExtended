/*\
title: $:/plugins/Federation/FederationExtended/extendedHandlerOptions.js
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

exports.name = "extendedHandlerOptions";
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

/*
  This handler unpacks the received bundle as soon as it is received using the
  built-in import mechanism..

  This is a bad idea.
*/
$tw.wiki.bundleHandler.autoUnpack = function(event) {
  function useNativeImport(self, tiddler) {
    // Use the build-in importer to import each tiddler
    tiddler = JSON.parse(JSON.stringify(tiddler))
    self.dispatchEvent({type: "tm-import-tiddlers", param: JSON.stringify(tiddler)});
  }
  // Parse the incoming bundle
  const self = this
  const filterOutput = this.filter ? true:false;
  const unpackList = (filterOutput)? this.wiki.filterTiddlers(this.filter): []
  const unpackIt = (filterOutput === false || (unpackList.indexOf(tiddlerName) !== -1))
  const tiddler = $tw.wiki.getTiddler(this.actionBundle);
  const separator = (typeof tiddler.fields.separator === 'undefined')?'<!-- TIDDLER SEPARATOR --!>':tiddler.fields.separator;
  if (tiddler) {
    //Get the raw text for the bundle.
    const bundleText = tiddler.getFieldString('text');
    if (tiddler.fields.bundle_type === 'JSON') {
      const bundleObject = JSON.parse(tiddler.fields.text);
      for (let tiddlerName in bundleObject) {
        if (unpackIt) {
          useNativeImport(self, bundleObject[tiddlerName])
        }
      }
    } else {
      //Get the raw text for each tiddler.
      const rawBundleTiddlers = bundleText.split('\n' + separator + '\n');
      //Create a tiddler from each tiddler. Only overwrite existing tiddlers if this.actionOverwrite is true
      for (let i = 0; i < rawBundleTiddlers.length; i++) {
        if (rawBundleTiddlers[i].trim() !== '') {
          const re = new RegExp('\\\\' + separator, 'g')
          const tiddlers = this.wiki.deserializeTiddlers('.tid',rawBundleTiddlers[i].replace(re,separator));
          $tw.utils.each(tiddlers,function(tiddler) {
            if (unpackIt) {
              useNativeImport(self, {fields: tiddler})
            }
          });
        }
      }
    }
  }
};

})();
