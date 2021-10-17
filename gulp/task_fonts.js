/**
 * User: igor
 * Date: 12.04.2017(Time:2:03)
 */
'use strict';
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp      = require('gulp'); // Сообственно Gulp JS;
const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug     = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
const cached    = require('gulp-cached'); // фильтер файлов сравнением содержимого  https://www.npmjs.com/package/gulp-cached
const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
//const watch     = require('gulp-watch');  //Следит за всеми указанными файлами или целыми директориями и в случае каких-либо изменений выполняет описанные в конфигурациях таски.
//const path      = require('path');    // Полные пути к файлам
//const connect   = require('gulp-connect');  // Gulp plugin to run a webserver (with LiveReload)
const path      = require('path');    // Полные пути к файлам

//----------------------------------------------
//  + 5 Тупо Копируем Шрифты
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function(options) {
  return function(callback) {

    return multipipe(
      gulp.src(options.src_dev),        // Указываем где искать
      debug({title: "Нашли : "}),      // количество для отладки
      gulp.dest(options.src_project),   // Куда записываем
      debug({title: "Записали : "}),  // количество для отладки
      livereload()      // Работает через плагин или 1 строчку в наблюдении и без РНР
    ).on('error', notify.onError(function (err) {
        return {
          title  : 'styles / Css',
          message: err.message,
          sound  : true
        };
      }));

  };
};



/*

//----------------------------------------------
//  + 5 Тупо Копируем Шрифты
//       (задача без заглушки)
//-----
gulp.task('font', function() {

  return multipipe(
    gulp.src(fontDir),           // Указываем где искать
    debug({title:"Нашли : "}),   // количество для отладки
    gulp.dest(fontDirMini),    // Куда записываем
    debug({title:"Записали : "}), // количество для отладки
    livereload()      // Работает через плагин или 1 строчку в наблюдении и без РНР
  ).on('error', notify.onError(function(err){
      return  {
        title:'styles / Css',
        message:err.message,
        sound: true
      };
    }))
});

*/