# Ensure-Wildcard-Free-Dependencies

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

### Introduction

This is a simple tool that ensures your Node.js dependencies are wildcard (^, >, <=, ~, *, etc.) free.

A wildcard in a dependency's version indicates that that dependency does not have to be an exact version (you can read more about Node.js dependency wildcards [here](https://docs.npmjs.com/files/package.json#dependencies)) - which 
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
 
 As an extra precaution, you can configure NPM to not save dependencies with wildcards in their version numbers. This can be done by adding the following line to your `.npmrc` file:
 ```
save-exact=true
```
You can read more about configuring NPM [here](https://docs.npmjs.com/misc/config).
 
### Examples
 
###### Invalid Dependency:
 ```javascript
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
![Demo](assets/failure-terminal.png)
 
###### Valid Dependency:
 ```javascript
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
![Demo](assets/success-terminal.png)
