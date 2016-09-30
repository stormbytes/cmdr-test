module.exports = function (program) {
	'use strict';

	program
		.command('bye <name>')
		.description('Say goodbye to <name>')
		.action(function(name, command) {
			console.log('Goodbye ' + name);
		});

};