#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

const packageJsonDir = process.argv.slice(2)[0] || '../../package.json';
const packageJson = require(packageJsonDir);

console.log(chalk.cyan('\nChecking dependencies for wildcards...'));

const dependencySections = [packageJson.dependencies, packageJson.devDependencies].filter(Boolean);
const numberOfDependencies = dependencySections.reduce(
    (total, dependencies) => Object.keys(dependencies).length + total,
    0
);
let progressTracker = 1;
dependencySections.forEach(dependencySection =>
    Object.keys(dependencySection).forEach(dependencyName => {
        const versionString = dependencySection[dependencyName];
        console.log(
            chalk.cyan(`Progress: ${Math.round((100 * progressTracker++) / numberOfDependencies)}%`)
        );
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
    })
);

console.log(chalk.green('All dependencies are wildcard free!'));
