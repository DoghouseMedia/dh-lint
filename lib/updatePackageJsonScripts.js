/**
 * @fileoverview Config initialization wizard.
 * @author Carl Bradshaw
 */

 "use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require('fs');

//------------------------------------------------------------------------------
// Settings
//------------------------------------------------------------------------------

// Path to scripts to add to projects package.json.
const scriptsPath = '../config/scripts.json';

// Path to framework specific javascript paths for linting.
const lintPathsPath = '../config/eslint/lint-paths.json';

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------
module.exports = function updateScripts(framework) {

  // Load the scripts object and replace the linting paths with the framework
  // specific javacript maps.
  let dhLintScripts = require(scriptsPath);
  let frameworkLintPaths = require(lintPathsPath);
  dhLintScripts['lint:sass'] = dhLintScripts['lint:sass'].replace('%PATH%', frameworkLintPaths['scss'][framework])
  dhLintScripts['lint:sass-fix'] = dhLintScripts['lint:sass-fix'].replace('%PATH%', frameworkLintPaths['scss'][framework])
  dhLintScripts['lint:js'] = dhLintScripts['lint:js'].replace('%PATH%', frameworkLintPaths['js'][framework])
  dhLintScripts['lint:js-fix'] = dhLintScripts['lint:js-fix'].replace('%PATH%', frameworkLintPaths['js'][framework])
  dhLintScripts['lint:vue'] = dhLintScripts['lint:vue'].replace('%PATH%', frameworkLintPaths['js'][framework])
  dhLintScripts['lint:vue-fix'] = dhLintScripts['lint:vue-fix'].replace('%PATH%', frameworkLintPaths['js'][framework])


  // Load the projects package.json file.
  fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    // Merge linting scripts with current package.json scripts object.
    let appPackage = JSON.parse(data);
    appPackage.scripts = appPackage.scripts || {};
    Object.assign(appPackage.scripts, dhLintScripts);
    let newJson = JSON.stringify(appPackage, null, 2);

    // Write new scripts to package.json.
    fs.writeFile('./package.json', newJson, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("package.json file was saved!");
      console.log("Please check the lint:js paths are correct in your package.json file.");
    });

  });
}
