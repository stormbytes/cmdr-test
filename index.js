'use strict';

var fs = require('fs');
var program = require('commander');
var commands = require('./commands')(program);

program
  .usage('<command> [options]')

program.on('*', function() {
  console.log('Unknown Command: ' + program.args.join(' '));
  program.help();
});

// Process Commands
program.parse(process.argv);

