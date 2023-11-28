#!/usr/bin/env node

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');
const generateEslintRc = require("../lib/generateEslintConfig");
const generateStylelintRc = require("../lib/generateStylelintConfig");
const generateBabelConfigRc = require("../lib/generateBabelConfig");
const updatePackageJsonScripts = require("../lib/updatePackageJsonScripts");
const appRoot = path.resolve('./');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Determine if a .eslintrc.yml file exists in the project.
 */
function eslintrcFileExists() {
  return fs.existsSync(appRoot + '/.eslintrc.yml');
}

/**
 * Determine if a .stylelintrc.yml file exists in the project.
 */
function stylelintFileExists() {
  return fs.existsSync(appRoot + '/.stylelintrc.yml');
}

/**
 * Determine if a babel.config.js file exists in the project.
 */
function babelConfigFileExists() {
  return fs.existsSync(appRoot + '/babel.config.js');
}
//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

/**
 * Ask the user questions to setup linting.
 */
inquirer.prompt([
  {
    type: 'list',
    name: 'framework',
    message: 'What framework is this project using?',
    choices: ['Drupal', 'Laravel', 'Magento'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: "confirm",
    name: "genEslintRc",
    message: "Would you like to generate an .eslintrc.yaml config file?",
    default: true
  },
  {
    type: "confirm",
    name: 'replaceEslintrc',
    default: true,
    message: 'An .eslintrc.yml already exists, would you like to replace it?',
    when: function(answers) {
      return answers.genEslintRc && eslintrcFileExists();
    }
  },
  {
    type: "confirm",
    name: "genStylelint",
    message: "Would you like to generate an stylelintrc.yaml config file?",
    default: true
  },
  {
    type: "confirm",
    name: 'replaceStylelint',
    default: true,
    message: 'A .stylelintrc.yml already exists, would you like to replace it?',
    when: function(answers) {
      return answers.genStylelint && stylelintFileExists();
    }
  },
  {
    type: "confirm",
    name: "genBabelConfig",
    message: "Would you like to generate a babel config file?",
    default: true
  },
  {
    type: "confirm",
    name: 'replaceBabelConfig',
    default: true,
    message: 'A babel.config.js already exists, would you like to replace it?',
    when: function(answers) {
      return answers.genBabelConfig && babelConfigFileExists();
    }
  },
  {
    type: "confirm",
    name: "updateNpmScripts",
    message: "Would you like to update your package.json file with linting scripts?",
    default: true
  }
]).then( ({framework, genEslintRc, replaceEslintrc, genStylelint, replaceStylelint, genBabelConfig, replaceBabelConfig, updateNpmScripts}) => {
  if (typeof replaceEslintrc === 'undefined') {
    replaceEslintrc = true;
  }

  if (typeof replaceStylelint === 'undefined') {
    replaceStylelint = true;
  }

  if (typeof replaceBabelConfig === 'undefined') {
    replaceBabelConfig = true;
  }

  if (genEslintRc && replaceEslintrc) {
    generateEslintRc(framework);
  }

  if (genStylelint && replaceStylelint) {
    generateStylelintRc(framework);
  }

  if (genBabelConfig && replaceBabelConfig) {
    generateBabelConfigRc();
  }

  if (updateNpmScripts) {
    updatePackageJsonScripts(framework);
  }

});
