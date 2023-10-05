# DH Lint

DH Lint is a tool for generating project specific javascript and sass linting configuration files.

---

## Install
```
npm install @doghouse/dh-lint --save-dev
```

---

## Configure

DH Lint can be configured via the command line by running the following command in your project root:

```bash
npm exec dh-lint-install
```
you will then be prompted to answer a series of questions in order to set up the config files for your project:

1. What framework is this project using?
2. Would you like to generate an .eslintrc.yaml config file?
3. Would you like to generate an sass-lint.yml config file?
4. Would you like to generate a babel.config.js file?
4. Would you like to update your package.json file with linting scripts?

The config files generated in your projects root directory both extend framework specific config files defined in this package. The generated files can be extended and overridden further by defining your own settings within them. For documentation on how to add your own rules or settings, click on the links listed under the **Dependencies** section of this README file.

The base eslint config file in this package extends from the [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

**Sass-lint.yml configuration**

Dh-lint scans your stylesheets based on the chosen framework. 
You have the flexibility to modify or append scan paths by making adjustments in the sass-lint.yml file. 
For instance,
```yaml
---
  options:
    config-file: "./node_modules/@doghouse/dh-lint/config/sasslint/laravel.yml"
  files:
      include:
        - 'resources/assets/sass/**/*.s+(a|c)ss'
        - 'resources/sass/**/*.s+(a|c)ss'
        - 'my-custom-path/sass/**/*.s+(a|c)ss'
```

---
## Usage

If you opted to update your package.json file with linting scripts, then you may use the following commands to lint your project.

1. `npm run lint:js` Will scan your javascript files and log any errors or warnings associated with your code.
2. `npm run lint:js-fix` Will attempt to fix any errors that eslint has found with your code.
3. `npm run lint:sass` Will scan your styles directory and log any errors or warnings associated with your stylesheets.
4. `npm run lint:sass-fix` Will attempt to fix any errors that sass-lint has found within your stylesheets.
5. `npm run lint:vue` Will scan your directory containing vue elements and log any errors or warnings associated with your vue components.
6. `npm run lint:vue-fix` Will attempt to fix any errors that eslint has found within your vue components.
7. `npm run lint` Will scan your directory containing sass, js and vue elements and log any errors or warnings associated with your assets.
8. `npm run lint-fix` Will attempt to fix any errors that eslint has found within your stylesheets, js and vue components.

**Note**: If you choose to have your errors automatically fixed, **you are still responsible for this code**, So please review the changes made before you commit them.

---

## Dependencies

This project depends on [eslint](https://github.com/eslint/eslint) for javascript linting and [sass-lint](https://github.com/sasstools/sass-lint) for sass linting.

---

## Support

Currently supported frameworks are:

1. Drupal 8|9|10
2. Magento 2
3. Laravel

If you wish to add support for other framework, please email [Doghouse Agency](mailto:hello@doghouse.agency). Otherwise feel free to create a pull request.
