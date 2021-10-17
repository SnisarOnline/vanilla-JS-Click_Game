/**
 * Created by igor on 10.12.16.
 */
'use strict';
//----------------------------------------------
//                  Plugins
//----------------------------------------------
const gulp      = require('gulp'); // Сообственно Gulp JS;
const livereload = require('gulp-livereload'); // Livereload для Gulp работает через плагин в браузере
const browserSync = require('browser-sync').create(); //подключили в проект и вызвали


//----------------------------------------------
//                variables
//                  (new)
//----------------------------------------------
//  variables projects
let site_name = ".";
let assets = "dev";
let publication = "prod";
let version = "./";

// src_dev: Откуда Берем = Среда разработки
let dev_src           =  site_name +'/'+ assets ;
let html_dev          =  site_name +'/'+ assets +'/**.html';
let fonts_dev         =  site_name +'/'+ assets +'/scss/fonts/**/*.{eot,otf,ttf,woff,svg,css}';
let styl_dev          =  site_name +'/'+ assets +'/scss/**/styles.{css,styl,scss,sass}';
let styl_dev_Watch    =  site_name +'/'+ assets +'/scss/**/*.{css,styl,scss,sass}';
let js_dev            =  site_name +'/'+ assets +'/js/**/*.js';
let s_retina_dev_src  =  site_name +'/'+ assets +'/sprite/**/*.{png,jpeg,jpg}';
let s_retina_dev_styl =  site_name +'/'+ assets +'/scss/';
let s_retina_dev_img  =  site_name +'/'+ assets +'/img/';
let svg_dev           =  site_name +'/'+ assets +'/img/**/*.svg';
let img_dev           =  site_name +'/'+ assets +'/img/**/*.{icon,png,jpeg,jpg,gif}';
//src_project: Куда Записываем = Готовый Проект
let project               =  site_name +'/'+ publication +'/'+ version ;
let html_project          =  site_name +'/'+ publication +'/'+ version +'/';
let fonts_project         =  site_name +'/'+ publication +'/'+ version +'/css/fonts/';
let styl_project          =  site_name +'/'+ publication +'/'+ version +'/css/';
let js_project            =  site_name +'/'+ publication +'/'+ version +'/js/';
let s_retina_project_img  =  site_name +'/'+ publication +'/'+ version +'/img/';
let svg_project           =  site_name +'/'+ publication +'/'+ version +'/img/';
let img_project           =  site_name +'/'+ publication +'/'+ version +'/img/';

//----------------------------------------------
//                Tasks
//  Default options
//-----
gulp.task('default', function() {
  return (
    console.log( " =   =   =   ="),
    console.log( "+ Дерикт.Разработки  =>  /"+ site_name+' / '+assets),
    console.log( " - Dir_Разработки из =>  " + dev_src ),
    console.log( " - Шрифты из .  =>  " + fonts_dev ),
    console.log( " - Стили  из .  . =>  " + styl_dev ),
    console.log( " - Спрайты  из .  =>  " + s_retina_dev_src ),
    console.log( " - Картинки  из . =>  " + img_dev ),
    console.log( " - JavaScript из .  =>  " + js_dev ),
    console.log( " -  -  -  -  -  "),
    console.log( "+ дерикт. проектирования =>  /"+ site_name +' / '+ publication ),
    console.log( " - Dir_Публикации  в .  =>  " + project ),
    console.log( " - Шрифты и Стили  в  . =>  " + styl_project ),
    console.log( " - Картинки и Спрайты в =>  " + img_project ),
    console.log( " =   =   =   =")
   );
});
//----------------------------------------------
//  + 0 Заглушка
//-----
function lazyRequireTask(taskName, path, options) {
  options = options || {};     // необизательно
  options.taskName = taskName;   // необизательно
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

//----------------------------------------------
//  + 0 Удаление - Зачистка
//      (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('del_project', './gulp/task_clean', {
  //src_dev: html_dev,
  src_project: project
});
//----------------------------------------------
//  + 1 HTML
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('1_html', './gulp/task_html', {
  src_dev: html_dev,
  src_project: html_project
});
//----------------------------------------------
//  + 2 создаем retina и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('2_sprite_retina', './gulp/task_img/sprite-retina', {
  src_dev_src : s_retina_dev_src,
  src_dev_styl: s_retina_dev_styl,
  src_dev_img : s_retina_dev_img,
  src_project: s_retina_project_img
});
//----------------------------------------------
//  + 3 создаем SVG и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('3_SVG_mini', './gulp/task_img/sprite-SVG', {
  src_dev: svg_dev,
  src_project: svg_project
});
//----------------------------------------------
//  + 4 Копируем и минимизируем изображения
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('4_img_mini', './gulp/task_img/img', {
  src_dev: img_dev,
  src_project: img_project
});
//----------------------------------------------
//  + 5 Тупо Копируем Шрифты
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('5_fonts', './gulp/task_fonts', {
  src_dev: fonts_dev,
  src_project: fonts_project
});
//----------------------------------------------
//  + 6 Собираем Css из Stylus или SASS
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('6_styl_css', './gulp/task_styl', {
  src_dev: styl_dev,
  src_project: styl_project
});
//----------------------------------------------
//  + 7 Собираем JS
//     (задача через заглушку, без заглушки - в нутри файла )
//-----
lazyRequireTask('7_js', './gulp/task_js', {
  src_dev: js_dev,
  src_project: js_project
});

//----------------------------------------------
//  - 8 авто подмена путей к файлам (спрайтам, стилям, т.п. подключениям)
//-----
//----------------------------------------------
//  - 9
//-----

function reloader(callback) {
    browserSync.reload();
    callback();
}

//----------------------------------------------
//  + Наблюдение за изменениями в файлах
//       (задача без заглушки)
//--------------
gulp.task('watch', function() {

  browserSync.init({
      server: 'prod'
  });

  gulp.watch(html_dev, gulp.series('1_html', reloader));

  gulp.watch( img_dev, gulp.series('4_img_mini', reloader));

  gulp.watch( styl_dev_Watch, gulp.series('5_fonts', reloader));

  gulp.watch( styl_dev_Watch, gulp.series('6_styl_css', reloader));

  gulp.watch(js_dev, gulp.series('7_js', reloader));

});

gulp.task('prod', gulp.series('1_html','4_img_mini','5_fonts','6_styl_css', '7_js') );
