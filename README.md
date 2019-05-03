# Ensure-Wildcard-Free-Dependencies

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

### Introduction

This is a simple tool that ensures your Node.js dependencies are wildcard (^) free.

A wildcard in a dependency version indicates that that dependence has to be the specified version or higher - which 
means that two `npm install`/`yarn install` commands could result in two different versions of the dependency being 
installed. This could introduce unwanted errors, so it is good practice to ensure your dependencies are wildcard free. 

This tool checks all your dependencies (including devDependencies) and will fail if any of them contain a wildcard. It 
will also notify as to where the wildcards are, which makes it easy to detect and correct them. 

This tool is ideal for git hooks and linting steps.

### Installation

To install this package, simply run one of the following commands:

###### NPM
```shell 
npm install ensure-wildcard-free-dependencies --save-dev
```

###### Yarn
```shell 
yarn add ensure-wildcard-free-dependencies --dev
```

### Usage
 
 In order to make sure your dependencies are wildcard free, simply run the following command:
 ```shell
 ensure-wildcard-free-dependencies
 ``` 
 If it finds any wildcards it will throw an error containing all the relevant information.
 
### Examples
 
###### Invalid Dependency:
 ```json
 // package.json
{
    ...
    "dependencies": {
        "chalk": "2.4.2"
    },
    "devDependencies": {
        "ensure-wildcard-free-dependencies": "^1.0.0", // <- Wildcard
        "prettier": "1.17.0"
    },
    ...
}
```
```shell
// local terminal
$ ensure-wildcard-free-dependencies
 
Checking dependencies for wildcards
Dependency ensure-wildcard-free-dependencies has a version string (^1.0.0) with invalid characters // <- Exception
```
 
###### Valid Dependency:
 ```json
 // package.json
{
    ...
    "dependencies": {
        "chalk": "2.4.2"
    },
    "devDependencies": {
        "ensure-wildcard-free-dependencies": "1.0.0",
        "prettier": "1.17.0"
    },
    ...
}
```
```shell
// local terminal
$ ensure-wildcard-free-dependencies
 
Checking dependencies for wildcards
All dependencies are wildcard free // <- No exceptions
```
