# tozti-boilerplate
*A common boilerplate for tozti extensions.*

This package provides a basic file structure to start coding your own tozti extension. It comes pre-configured with [Webpack](https://webpack.js.org/), and supports 

## Getting started.

To use this file structure for your extension, simply download this repository:
```bash
wget https://github.com/tozti/tozti-boilerplate/archive/master.zip
unzip master.zip
rm master.zip
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
- `npm run package` will run `npm run release`, and then package all of the compiled files into a .tar.gz archive.
