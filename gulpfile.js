const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function reload(done){
    browserSync.reload();
    done();
}

gulp.task('processCss', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: false
        }))
        .pipe(minifyCss({
            level: 2
        }))
        .pipe(gulp.dest('dist/css/'))
});
gulp.task('processJs', () => {
    return gulp.src('./src/js/index.js')
        .pipe(concat('script.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('./dist/js/'))
});
gulp.task('imagemin', () => {
    return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            interlaced: true,
            progressive: true
        }))
        .pipe(gulp.dest('./dist/img/'))
})
gulp.task('clean', () => {
    return gulp.src('./dist/*', {
        allowEmpty: true
    })
        .pipe(clean({
            force: true
        }));
});
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false,
    });
    gulp.watch('./src/img/**/*', gulp.parallel('imagemin'));
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('processCss'));
    gulp.watch('./src/js/*.js', gulp.parallel('processJs'));
    gulp.watch('./index.html', reload);
    gulp.watch(['./dist/js/*.js', './dist/css/*.css', './dist/img/**/*'], reload);
});
gulp.task('build', gulp.series('clean', gulp.parallel('processCss', 'processJs', 'imagemin')));
gulp.task('dev', gulp.series('build', 'watch'));












