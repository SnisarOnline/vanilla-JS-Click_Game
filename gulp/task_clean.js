/**
 * User: igor
 * Date: 12.04.2017(Time:2:05)
 */
'use strict';
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp      = require('gulp'); // Сообственно Gulp JS;
//const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
//const debug     = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
//const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
//const cached    = require('gulp-cached'); // фильтер файлов сравнением содержимо го  https://www.npmjs.com/package/gulp-cached
//const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
////const watch     = require('gulp-watch');  //Следит за всеми указанными файлами или целыми директориями и в случае каких-либо изменений выполняет описанные в конфигурациях таски.
////const path      = require('path');    // Полные пути к файлам
////const connect   = require('gulp-connect');  // Gulp plugin to run a webserver (with LiveReload)

const del       = require('del'); // для удаления - Зачистки    Error: Cannot find module 'del'

//----------------------------------------------
//  + 0 Удаление - Зачистка
//      (задача через заглушку)
//-----
module.exports = function(options) {
  return function(callback) {

    return del( options.src_project ) + console.log(" Удаленно : " + options.src_project );

  };
};


/*
 //----------------------------------------------
 //  + 0 Удаление - Зачистка
 //     (задача без заглушки)
 //-----
gulp.task('clean', function() {
  return del(allPublic_mini)+console.log(" Удаленно : "+allPublic_mini );
});

*/