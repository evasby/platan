var gulp = require('gulp'), 
    notify = require('gulp-notify'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    sass= require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    plumberNotifier = require('gulp-plumber-notifier'),
    plumber = require('gulp-plumber'),
    wait = require('gulp-wait'),
    imagemin = require('gulp-imagemin');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// html
gulp.task('html', function() {
  gulp.src('app/*.html')
  .pipe(connect.reload())
  .pipe(notify('HTML - Done!'));
})

// Error Notification
function errorAlert(error){
  notify.onError({title: "SCSS Error", message: error.toString(), sound: "Sosumi"})(error);
  console.log(error.toString());//Prints Error to Console
  this.emit("end");
};

// css
gulp.task('css', function () {
  return gulp.src('sass/all*.scss')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(wait(500))
    .pipe(sass({ includePaths : ['_/sass/'] })) 
    .pipe(autoprefixer({
      browsers: ['last 10 versions', '> 1%', 'IE 7', 'IE 8', 'IE 9'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('app/css'))
    //.pipe(gulp.dest('d:/OpenServer/domains/stroytrest/sites/all/themes/stroytrest/css'))
    .pipe(connect.reload())
    .pipe(notify('CSS - Done!'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
// CleanJS
gulp.task('cleanJS', function () {
    return gulp.src('dist/js', {read: false})
        .pipe(clean());
});
// imageMin
gulp.task('imageMin', function () {
    return gulp.src('app/images/**/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});
//JS
gulp.task('js', function () {
    return gulp.src('ignore/js/main.js')
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulp.dest('ignore/js/min'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**/*.*'])
      .pipe(gulp.dest('dist/fonts'));
});

// Build
gulp.task('build', function () {
    return gulp.src('app/index.html')
      .pipe(useref())
      //.pipe(gulpif('*.js', uglify()))
      //.pipe(gulpif('*.css', minifyCss({compatibility: 'ie7'})))
      .pipe(gulp.dest('dist'));
});

// Bower
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['css']);
  gulp.watch('bower.json', ['bower']);
  gulp.watch('app/*.html', ['html']);
});

// default
//gulp.task('default', ['connect', 'jade', 'html', 'css', 'watch']);
gulp.task('default', ['connect', 'html', 'css', 'watch']);