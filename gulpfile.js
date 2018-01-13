'use strict'

let gulp = require('gulp')
let del = require('del')
let gulpif = require('gulp-if')
let uglify = require('gulp-uglify')
let imagemin = require('gulp-imagemin')
let cssmin = require('gulp-clean-css')
let sass = require('gulp-sass')

let buffer = require('vinyl-buffer')
let source = require('vinyl-source-stream')
let sourcemaps = require('gulp-sourcemaps')

let watchify = require('watchify')
let browserify = require('browserify')

// The path in which to look for assets.
const paths = {
    scripts: ['src/index.js'],
    fonts: ['assets/fonts'],
    images: ['assets/img'], 
    styles: ['assets/sass/style.scss'],
}

let production = (process.env.NODE_ENV == 'production')

function compile(watch) {
    function rebundle(b) {
        return b.bundle()
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
            .pipe(gulpif(production, uglify()))
            .pipe(gulpif(!production, sourcemaps.write('.')))
            .pipe(gulp.dest('dist'))
    }

    let bundler = browserify({
        entries: paths.scripts,
        debug: !production
    })
    .transform('vueify')
    // .plugin('vueify/plugins/extract-css', {
    //     out: 'dist/build.css'
    // })
    .transform('babelify')

    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', _ => rebundle(bundler))
    }

    rebundle(bundler);    
}

// Empty the build folder.
gulp.task('clean', function() {
    return del(['dist/*'])
})

// Compile the Javascript source files.
gulp.task('scripts', ['clean'], function () {
    return compile(false)
})

// Copy the fonts to the dist folder.
gulp.task('fonts', ['clean'], function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'))
})

// Optimize the images to reduce their size.
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
       .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
        }))
       .pipe(gulp.dest('dist/img'))
})

// Transform the SASS files into regular CSS files and minify them.
gulp.task('sass', function () {
    return gulp.src(paths.styles)
       .pipe(sass().on('error', sass.logError))
       .pipe(gulpif(production, cssmin()))
       .pipe(gulp.dest('dist/css'))
})

// Compile the Javascript sources and the assets, and watch
// for changes to the files.
gulp.task('watch', function () {
    compile(true)

    gulp.watch(paths.fonts, ['fonts'])
    gulp.watch(paths.images, ['images'])
    gulp.watch(paths.styles, ['sass'])
})

// Compile the Javascript sources and the assets.
gulp.task('build', ['scripts', 'images', 'sass', 'fonts'])

// The default action when launching gulp.
gulp.task('default', ['build'])