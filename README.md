# Ensure-Wildcard-Free-Dependencies

This is a simple tool that ensures your Node.js dependencies are wildcard (^) free.

## Description

A wildcard in a dependancy version indicates that that dependence has to be the specified version or higher - which means that two `npm install`/`yarn install` commands could result in two diffirent versions of the dependancy being installed. This could introduce unwanted errors, so it is good practice to ensure your dependencies are wildcard free. 

This tool checks all your dependancies (including devDependancies) and will fail if any of them contain a wildcard. It will also notify as to where the wildcards are, which makes it easy to detect and correct them. 

This tool is thus ideal for pre-commit hooks and linting steps.

## Installation

NPM package coming soon!
