# Phaser ES6 Boilerplate



## Features

✔ Heavily commented, flexible Gulpfile (that means it uses [Gulp](http://gulpjs.com/)).

✔ [Browserify](https://github.com/substack/node-browserify) + [Babelify](https://github.com/babel/babelify) (Yes, it uses [Babel](https://babeljs.io/)).

✔ [Browsersync](http://www.browsersync.io/) = Livereload + Mobile debugging with [Weinre](http://people.apache.org/~pmuellr/weinre-docs/latest/).

✔ Example: Extending Phaser & modular development.

✔ Production ([UglifyJS](https://github.com/mishoo/UglifyJS2)) and Development ([Sourcemaps](https://developer.chrome.com/devtools/docs/javascript-debugging#source-maps)) builds.

✔ Did I say ES6? Well.. some ES7 too! ([See Experimental features](https://babeljs.io/docs/usage/experimental/)).

## Why?

ES6 [is the future](http://www.ecma-international.org/publications/standards/Ecma-262.htm)!

Anyways, I've been using ES6 for a while in other personal projects, and I currently prefer it over ES5 and Typescript. 
I found the new Class-based syntax to be a better fit for my developer needs. Unfortunately, the best way to access
all the features of the new standard is by using a transpiler. This boilerplate is an attempt to reduce the time spent 
configurating a project and installing dependencies by providing a template that can work as an scaffold for any Phaser game.

## Usage

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/belohlavek/phaser-es6-boilerplate.git`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.

### Modifying `gulpfile.js`

See [gulpfile.md](https://github.com/belohlavek/phaser-es6-boilerplate/blob/master/gulpfile.md)

## License

This project is released under the CC - Creative Commons License