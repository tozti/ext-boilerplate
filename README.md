# tozti-boilerplate
*A common boilerplate for tozti extensions.*

This package provides a basic file structure to start coding your own tozti extension. It comes pre-configured with [Gulp](https://gulpjs.com/), [Browserify](http://browserify.org/), [Babel](https://babeljs.io) and [SASS](http://sass-lang.com/).

## Getting started.

To use this file structure for your extension, simply download this repository:
```bash
wget https://github.com/tozti/tozti-boilerplate/archive/master.zip
mv tozti-boilerplate-master tozti-awesome
```

Then, customize the fields in `package.json` to match your extension:
```json
  "name": "tozti-awesome",
  "version": "1.0.0",
  "description": "An awesome tozti extension.",
```

Finally, run `npm install` to install the dependencies.

## Usage.

Once the dependencies are installed, you can use the following `npm` scripts.

- `npm run build` will compile all the .js, .vue, .sass files and all the assets of your extension for development.
- `npm run watch` will do the same as `npm run build`, but will automatically re-trigger when one of the files changes.
- `npm run release` will compile all the files of your extension for production use. 
   In particular, this means that all the files will be minified, and that source maps will be deleted.

## About disk usage.

As the dependencies for this boilerplate are quite heavy, you might want to avoid installing them for each tozti extension you are working on. One way to do so is to install the heaviest dependency, `tozti/tozti-gulp`, globally. Then, you will link that global instance in each of the extensions you are working on.

In practice, it means that you musn't run `npm install`. Instead, you run the following commands:
```bash
npm install -g tozti/tozti-gulp
npm install gulp
npm link 
```