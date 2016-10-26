'use strict';

/**
 * Module dependencies
 */
var	debug = require('debug')('dpd-admin'),
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

/**
 * Module methods
 */
Admin.prototype.handle = function (ctx, next) {
	ctx.query.id = ctx.query.id || this.parseId(ctx) || (ctx.body && ctx.body.id);
	var req = ctx.req,
		self = this;

	if (req.method === "GET") {
    console.log(__dirname)
    var fileLocation = fs.realpathSync(path.join(__dirname, clientAppPath, 'index.html'));
    console.log(fileLocation);
    ctx.res.setHeader('content-type', 'text/html');

    var fileData = fs.readFileSync(fileLocation);
    console.log(fileData)
    ctx.done(null, fileData);
	} else {
		Collection.prototype.handle.apply(this, [ctx, next]);
	}
};


/**
 * Module export
 */
module.exports = Admin;