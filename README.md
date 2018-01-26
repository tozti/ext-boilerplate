# tozti-boilerplate
*A common boilerplate for tozti extensions.*

This package provides a basic file structure to start coding your own tozti extension. It comes pre-configured with [Webpack](https://webpack.js.org/).

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

