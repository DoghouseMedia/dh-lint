/**
 * @fileoverview Config initialization wizard.
 * @author Carl Bradshaw
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require('fs');
const eslintrcFileName = './.eslintrc.yml';
const YAML = require('json2yaml');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function generateConfigObject(framework) {
  let defaultConfig = {
    root: true,
    extends: `./node_modules/@doghouse/dh-lint/config/eslint/${framework}.yml`
  };
  return defaultConfig;
}

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

module.exports = function generateConfigFile(framework){
  let defaultConfig = generateConfigObject(framework);
  let configData = YAML.stringify(defaultConfig, null, 2);
  fs.writeFile(eslintrcFileName, configData, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The .eslintrc.yml file was saved!");
  });
}

