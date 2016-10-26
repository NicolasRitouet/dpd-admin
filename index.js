'use strict';

/**
 * Module dependencies
 */
var	debug = require('debug')('dpd-admin'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
	  util = require('util'),
    Collection	= require('deployd/lib/resources/collection');

var clientAppPath = 'client';


function Admin(name, options) {
	Collection.apply(this, arguments);
}

util.inherits(Admin, Collection);

Admin.events = ["Get"];
Admin.dashboard = Collection.dashboard;


function getFilenameFromUrl(urlToParse, adminPath) {
  var pathname = url
    .parse(urlToParse)
    .pathname
    .replace(adminPath, '');
  return !pathname || pathname === '/' ? '/index.html' : pathname;
}

/**
 * Module methods
 */
Admin.prototype.handle = function (ctx, next) {
	ctx.query.id = ctx.query.id || this.parseId(ctx) || (ctx.body && ctx.body.id);
	var req = ctx.req,
		self = this,
    adminPath = this.path;

	if (req.method === "GET") {
    var fileLocation = path.join(__dirname, clientAppPath);
    ctx.res.setHeader('content-type', 'text/html');
    var fileData = fs.readFileSync(fileLocation + getFilenameFromUrl(req.url, adminPath));
    ctx.done(null, fileData.toString());
	} else {
		Collection.prototype.handle.apply(this, [ctx, next]);
	}
};


/**
 * Module export
 */
module.exports = Admin;