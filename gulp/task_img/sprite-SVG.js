/**
 * User: igor
 * Date: 12.04.2017(Time:2:00)
 */
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp      = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug     = require('gulp-debug');  // для отладки   https://www.npmjs.com/package/gulp-debug
const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify

// 3 SVG
const rename  = require("gulp-rename");   // add a suffix or prefix     https://www.npmjs.com/package/gulp-rename/
const cheerio = require('gulp-cheerio');  // - удаление лишних атрибутов из svg
const replace = require('gulp-replace');  // - фиксинг некоторых багов, об этом ниже
const svgmin = require('gulp-svgmin');    // - минификация SVG
 //  - создание спрайта


module.exports = function(options) {
  return function(callback) {

    return gulp.src(options.src_dev)
      .pipe(debug({title: "Нашли  svg : "})) // количество для отладки
      // удаление лишних атрибутов из svg
      .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))

      // фиксинг некоторых багов, cheerio plugin create unnecessary string '&gt;', so replace it.
      .pipe(replace('&gt;', '>'))

      // минификация SVG
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))

      // build svg sprite
      // плагин пока невыбрал ))
      .pipe(debug({title: "Записали svg: "}))
      .pipe(gulp.dest(options.src_project));

  };
};