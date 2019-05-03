#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

const packageJson = require(getPackageJsonDir());

console.log(chalk.cyan('\nChecking dependencies for wildcards...'));

const dependencySections = [packageJson.dependencies, packageJson.devDependencies].filter(Boolean);
dependencySections.forEach(checkDependencySection);

console.log(chalk.green('All dependencies are wildcard free!'));

function getPackageJsonDir() {
    return process.argv.slice(2)[0] || '../../package.json';
}

function checkDependencySection(dependencySection) {
    Object.keys(dependencySection).forEach(checkDependency);

    function checkDependency(dependencyName) {
        const versionString = dependencySection[dependencyName];
        if (versionString.includes('http')) {
            console.log(
                chalk.yellow(
                    `HTTP dependency ${chalk.magenta.bold(
                        dependencyName
                    )} detected (${chalk.magenta.bold(versionString)}), skipping.`
                )
            );
            return;
        }
        const allowedCharacters = /^[a-zA-Z\d.-]+$/;
        const valid = allowedCharacters.test(versionString);
        if (!valid) {
            const errorMessage = chalk.red(
                `Dependency ${chalk.magenta.bold(
                    dependencyName
                )} has a version string (${chalk.magenta.bold(
                    versionString
                )}) with invalid characters`
            );
            console.log(errorMessage);
            throw errorMessage;
        }
    }
}
