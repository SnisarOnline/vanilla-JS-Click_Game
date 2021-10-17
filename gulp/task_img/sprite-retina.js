/**
 * User: igor
 * Date: 12.04.2017(Time:1:58)
 */
'use strict';
//----------------------------------------------
//                  Plagins
//----------------------------------------------

const gulp = require('gulp'); // Сообственно Gulp JS;
// const multipipe = require('multipipe');   //для удобного отлова ошибок последовательностью https://www.npmjs.com/package/multipipe
const debug = require('gulp-debug'); // для отладки   https://www.npmjs.com/package/gulp-debug
// const notify    = require('gulp-notify'); // просто красивый вывод событий  https://www.npmjs.com/package/gulp-notify
// 4 img
const imagemin = require('gulp-imagemin'); // Сжатие изображений    https://github.com/sindresorhus/gulp-imagemin
const spritesmith = require('gulp.spritesmith'); //  Спрайты из PNG,JPG,JPEG    https://www.npmjs.com/package/gulp.spritesmith
const imageResize = require('gulp-image-resize');  // Делаем Retina Изображение зависимость от (apt-get install graphicsmagick)  https://github.com/scalableminds/gulp-image-resize
// const newer     = require('gulp-newer');        // фильтер для картинок   - https://www.npmjs.com/package/gulp-newer
// const rename      = require("gulp-rename");     // add a suffix or prefix     https://www.npmjs.com/package/gulp-rename/

//----------------------------------------------
//  + 2 создаем retina и спрайты и минимизируем все ето
//     (задача через заглушку, без заглушки - внизу )
//-----
module.exports = function (options) {
    return function (callback) {

        var spriteData = gulp.src(options.src_dev_src)
            .pipe(imageResize({
                upscale: false,   //будут ли масштабироваться изображения. (Default: false)
                //width : 100,
                //height : 100,
                //format:'png',   // формат файла на выходе
                quality: 1, // Определяет качество изображения. 0 ~ 0.2 ~ 1 (Default:1)
                percentage: 100  // процентное увеличение 100 = база
            }))
/*
            .pipe(rename({
              prefix: "ico_", // перед именем файла
              suffix: "@2x"  // после имени но перед форматом
            }))
*/
            // получаем Сразу Готовый Ретина-Спрайт
            .pipe(debug({title: " Готовые Ретина : "}))
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(spritesmith({
                imgName: 'sprite_retina.png',
                cssName: 'sprite.styl',
                cssFormat: 'stylus',
                imgPath: '../img/sprite_retina.png',
                padding: 30,
                algorithm: 'binary-tree',
                cssTemplate: '/var/www/node_modules/gulp.spritesmith/stylus.template.mustache' //тут настройки css спрайта но тогда затирает миксины спрайта.
            }));


        spriteData.css.pipe(gulp.dest(options.src_dev_styl)); // путь,сохраняем стили
        console.log(" Записали Stylus : " + options.src_dev_styl);  // путь,сохраняем стили
        spriteData.img.pipe(gulp.dest(options.src_dev_img)); // путь,сохраняем картинку
        console.log(" Записали Спрайт-Ретина )) : " + options.src_dev_img);  // путь,сохраняем картинку

        //return spriteData.pipe(gulp.dest( options.src )); // путь,сохраняем Все вместе

        return spriteData;

    };
};


/*

 //----------------------------------------------
 //  + 2 создаем retina и спрайты и минимизируем все ето
 //     (задача без заглушки)
 //-----
gulp.task('sprite', function (callbeck) {

  var spriteData = gulp.src(Sprite_Dir)
    .pipe(imageResize({
      upscale : false,   //будут ли масштабироваться изображения. (Default: false)
      //width : 100,
      //height : 100,
      //format:'png',   // формат файла на выходе
      quality:1, // Определяет качество изображения. 0 ~ 0.2 ~ 1 (Default:1)
      percentage: 100  // процентное увеличение 100 = база
    }))
//    .pipe(rename({
    //prefix: "ico_", // перед именем файла
//      suffix: "@2x"  // после имени но перед форматом
//    }))
    // попытались И незря )) получаем Сразу Готовый Ретина-Спрайт
    .pipe(debug({title:" Готовые Ретина : "}))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(spritesmith({
      imgName: 'sprite_retina.png',
      cssName: 'sprite.styl',
      cssFormat: 'stylus',
      imgPath: '../img/sprite_retina.png',
      padding: 30,
      algorithm: 'binary-tree',
      cssTemplate: '/var/www/node_modules/gulp.spritesmith/stylus.template.mustache' //тут настройки css спрайта но тогда затирает миксины спрайта.
    }));
  spriteData.css.pipe(gulp.dest(Sprite_Styl)); // путь,сохраняем стили
  console.log(" Записали Stylus : "+Sprite_Styl );
  spriteData.img.pipe(gulp.dest(imgDirMini)); // путь,сохраняем картинку
  console.log(" Записали Спрайт-Ретина )) : "+imgDirMini );
  //return spriteData.pipe(gulp.dest(Sprite_Styl)); // путь,сохраняем Все вместе
  return callbeck();
});

*/

/*

//sprite_retina только смысла нету... Нечем не отличается от обычного спрайта
//+ ретина картинки должны быть в 200% больше обычных

gulp.task('sprite_retina', function () {
  var spriteData = gulp.src( path+'dev/sprite/*.png' )
    .pipe(debug({title:"png_retina: "}))
    .pipe(spritesmith({
      retinaSrcFilter: path+'dev/sprite/*@2x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      cssName: 'sprite_retina.styl'
    }));
  return spriteData.pipe(gulp.dest(path+'dev/css/'));
});

  */