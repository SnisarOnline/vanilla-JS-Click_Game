/**
 * User: igor
 * Date: 12.04.2017(Time:2:04)
 */
'use strict';
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp = require('gulp');
const multipipe = require('multipipe');
const debug = require('gulp-debug');
const notify = require('gulp-notify');
const cached = require('gulp-cached');
// const livereload = require('gulp-livereload');
//const watch     = require('gulp-watch');
//const path      = require('path');
//const connect   = require('gulp-connect');
// 3 js
// const concat = require('gulp-concat');
const fixmyjs = require("gulp-fixmyjs");
// const minifyJS = require('gulp-minify'); // https://www.npmjs.com/package/gulp-minify
// const uglify = require('gulp-uglify'); // https://www.npmjs.com/package/gulp-uglify
const uglifyES= require('gulp-uglify-es').default; // https://www.npmjs.com/package/gulp-uglify-es


//----------------------------------------------
//  + 6 Собираем JS
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function (options) {
    /**
     * options
     * @Info https://github.com/mishoo/UglifyJS2#minify-options
     */
    const uglifyOptions = {
        parse: {
            // parse options // https://github.com/mishoo/UglifyJS2#parse-options
        },
        compress: {
            // compress options // https://github.com/mishoo/UglifyJS2#compress-options
        },
        mangle: {
            // mangle options // https://github.com/mishoo/UglifyJS2#mangle-options

            properties: {
                // mangle property options // https://github.com/mishoo/UglifyJS2#mangle-properties-options
            }
        },
        output: {
            // output options / https://github.com/mishoo/UglifyJS2#output-options
        },
        sourceMap: {
            // source map options // https://github.com/mishoo/UglifyJS2#source-map-options
        },
        nameCache: null, // or specify a name cache object
        toplevel: false,
        ie8: false,
        warnings: false,
    };

    return function (callback) {
        return multipipe(
            gulp.src([options.src_dev, '!./assets/js/vendor/**/*.js']),   // Где ищим исключая vendor
            debug({title: "Нашли : "}),
            cached(options.src_dev),      // фильтер файлов сравнением содержимого работает через "watch"
            fixmyjs(),             // исправляет простые ошибки
            // concat('all.js'),  // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
            // minifyJS(),
            // uglify(), // vanilla js
            uglifyES(uglifyOptions), // ES
            gulp.dest(options.src_project),  // Куда записываем
            debug({title: "Записали : "}),
            // livereload()      // Работает через плагин и 1 строчку в наблюдении и без РНР
        ).on('error', notify.onError(function (err) {
            console.log( err);
            return {
                title: 'JavaScript',
                message: err.message,
                sound: true
            };
        }));

    };
};

/*

//----------------------------------------------
//  + 6 Собираем JS
//  (задача без заглушки)
//-----
gulp.task('js', function() {

  return multipipe(
    gulp.src([jsDir, '!./assets/js/vendor/** /*.js']),   // Где ищим исключая vendor
    debug({title:"Нашли : "}),
    cached(jsDir),      // фильтер файлов сравнением содержимого работает через "watch"
    fixmyjs(),             // исправляет простые ошибки
    //concat('all.js'),  // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
    uglify(),              // Минификация JS
    gulp.dest(jsDirMini),  // Куда записываем
    debug({title:"Записали : "}),
    //connect.reload()    // Хотел РНР подхватить и без плагина работать, но не неполучается
    livereload()      // Работает через плагин и 1 строчку в наблюдении и без РНР
  ).on('error', notify.onError(function(err){
      return  {
        title:'JavaScript',
        message:err.message,
        sound: true
      };
    }))
});

*/
