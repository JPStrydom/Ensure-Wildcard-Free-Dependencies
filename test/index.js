'use strict';

const chalk = require('chalk');

console.log(chalk.cyan('Starting tests'));
process.argv[2] = './test/test-package.json';
try {
    require('../index.js');
} catch (error) {
    if (
        error !==
        'Dependency test-dev-dependency-3 has a version string (^1.1.1) with invalid characters'
    ) {
        throw error;
    }
    console.log(chalk.green('All tests have passed'));
}
