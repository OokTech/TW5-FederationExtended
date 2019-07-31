title: $:/plugins/Federation/FederationExtended/ReadMe
caption: ReadMe

!! What is this?

Some tools that work on top of the FederationCore plugin.
The FederationCore is just the minimum needed to set up federation to pull
tiddlers from other wikis.
This plugin is for tools that are built on top of that.

!! New Bundle Options

None so far

!! New window message handlers

None so far

!! New bundle handler functions

!!!autoUnpack

This handler receives the incoming bundle and immediately uses the built in
importer to list the tiddlers for import without saving the bundle locally.
