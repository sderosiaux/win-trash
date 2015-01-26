'use strict';
var fs = require('fs');
var path = require('path');
var test = require('ava');
var winTrash = require('../');

process.chdir(__dirname);

test('should trash files', function (t) {
	t.plan(9);

	var weirdName = 'fixture3';

	fs.writeFileSync('fixture', '');
	fs.writeFileSync('fixture2', '');
	fs.writeFileSync(weirdName, '');
	fs.writeFileSync('123');
	t.assert(fs.existsSync('fixture'));
	t.assert(fs.existsSync('fixture2'));
	t.assert(fs.existsSync(weirdName));
	t.assert(fs.existsSync('123'));

	winTrash([
		'fixture',
		'fixture2',
		weirdName,
		123
	], function (err) {
		t.assert(!err, err);
		t.assert(!fs.existsSync('fixture'));
		t.assert(!fs.existsSync('fixture2'));
		t.assert(!fs.existsSync(weirdName));
		t.assert(!fs.existsSync('123'));
	});
});

test('should trash a dir', function (t) {
	t.plan(7);

	var d1f1 = path.join('fdir', 'fixture');
	var d1f2 = path.join('fdir', 'fixture2');
	var d2f1 = path.join('321', 'fixture');
	var d2f2 = path.join('321', 'fixture2');

	fs.mkdirSync('fdir');
	fs.writeFileSync(d1f1, '');
	fs.writeFileSync(d1f2, '');
	t.assert(fs.existsSync(d1f1));
	t.assert(fs.existsSync(d1f2));

	fs.mkdirSync('321');
	fs.writeFileSync(d2f1, '');
	fs.writeFileSync(d2f2, '');
	t.assert(fs.existsSync(d2f1));
	t.assert(fs.existsSync(d2f2));

	winTrash([
		'fdir',
		321
	], function (err) {
		t.assert(!err, err);
		t.assert(!fs.existsSync('fdir'));
		t.assert(!fs.existsSync(321));
	});
});
