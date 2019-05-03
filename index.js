const chalk = require('chalk');

const packageJsonDir = process.argv.slice(2)[0] || '../../package.json';

const packageJson = require(packageJsonDir);

log('Checking dependencies for wildcards');

const dependencySections = [packageJson.dependencies, packageJson.devDependencies];
dependencySections.forEach(checkDependencySection);

log('All dependencies are wildcard free', 'success');

function checkDependencySection(dependencySection) {
    Object.keys(dependencySection).forEach(dependencyName => {
        const versionString = dependencySection[dependencyName];
        if (versionString.startsWith('http')) {
            log(`HTTP dependency detected (${versionString}), skipping.`, 'warning');
            return;
        }
        const allowedCharacters = /^[a-zA-Z\d.-]+$/;
        const valid = allowedCharacters.test(versionString);
        if (!valid) {
            const errorMessage = `Dependency ${dependencyName} has a version string (${versionString}) with invalid characters`;
            log(errorMessage, 'error');
            throw errorMessage;
        }
    });
}

function log(message, type) {
    switch (type) {
        case 'error':
            console.log(chalk.red(message));
            break;
        case 'warning':
            console.log(chalk.yellow(message));
            break;
        case 'success':
            console.log(chalk.green(message));
            break;
        default:
            console.log(chalk.cyan(message));
    }
}
