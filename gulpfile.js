var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    postcss      = require('gulp-postcss'),
    maps         = require('gulp-sourcemaps'),
    path         = require('path');


var distDir = path.resolve(__dirname, '../../');// 目标路径以后需要修改这个
var projectName = process.argv.slice(3)[0];// 项目名字

var processors = [
        autoprefixer({browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]})
    ],
    sourceDir  = path.resolve(__dirname, projectName),
    format = '.scss';// 格式,目前sass,可以考虑加入less


gulp.task('css', function () {
    // console.log(distDir);
    // console.log(sourceDir + '/' + projectName + format);

    return gulp.src(sourceDir + '/' + projectName + format)
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(maps.write())
        .pipe(gulp.dest(distDir));

});

gulp.task('watch', function () {
    gulp.watch('**/*.scss', ['css']);
});

gulp.task('default', ['watch', 'css']);