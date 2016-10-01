'use strict';

var fs = require('fs');
var path = require('path');

// The code below iterate files inside current directory and calls 'require' for each of them
// (excluding index.js - this file). Result of 'require' it assigns to returning object,
// each property of which is holding corresponding `require-d module object:
//
// {
//   bye: function() { <function-exported-by-bye-js> },
//   hello: { <function-exported-by-hello-js> }
// }
//

/*
 This is equivalent to following lines (in case you have only two constant commands):
 */
// module.exports = function(program) {
//   return {
//     bye:   require('./bye')(program),
//     hello: require('./hello')(program)
//   };
// };

/*
 Same result may be achieved by using npm module like 'require-dir-all' like that:
 */
// module.exports = function(program) {
//   require('require-dir-all')('.', {
//       map: function(reqModule) {
//         reqModule.exports = reqModule.exports( program ); // call exported functions for each module, passing
//       }
//     }
//   );
// };
/*
 You can even do this in one line, but it will require couple of changes in '../index.js':
 var modules = require('require-dir-all')('.');
 */

module.exports = function commandLoader(program) {

	// 1. create obj to store commands
	var commands = {};

	// 2. path/to/commands/dir
	var loadPath = path.dirname(__filename);

	// 3. retrieve all files in /commands 
	var modules = fs.readdirSync(loadPath);

	// 4. filter modules array (files ending in .js && !== index.js)
	var filtered_modules = modules.filter(function (filename) {
		return (/\.js$/.test(filename) && filename !== 'index.js');
	});

	// 5. iterates filtered_modules array to build up 'commands' obj
	filtered_modules.forEach(function (filename) {

		// 5-a. command name = module file name
		var name = filename.substr(0, filename.lastIndexOf('.'));

		// 5-b. command definition = require-d module
		var command = require(path.join(loadPath, filename));

		// 5-c. Initialize command
		commands[name] = command(program);
	});

	// 6. output
	return commands;
};