var gulp = require('gulp'),
    connect = require('connect'),
    concat = require('gulp-concat'),
    http = require('http'),
    opn = require('opn'),
    sass = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    rimraf = require('rimraf'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    cssbeautify = require('gulp-cssbeautify'),
    minifycss = require('gulp-minify-css'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    config = {
        app: 'app',
        dist: 'dist',
        port: 9002,
        scripts: function () {
            return this.app + '/scripts/**/*.js';
        },
        styles: function () {
            return this.app + '/scss';
        },
        html: function () {
            return this.app + '/*.html';
        }
    };
config.scripts.apply(config);
config.styles.apply(config);
config.html.apply(config);

gulp.task('clean', function(cb) {
    rimraf(config.app + '/.tmp', cb);
});
 
gulp.task('sass', function () {
    var dir = config.styles();
    return gulp.src(dir+'/app.scss')
        .pipe(sass({ style: 'expanded' }))
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/.tmp/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('app/.tmp/styles'))
        .pipe(notify({ message: 'Styles task complete for app scss' }));
});

gulp.task('sass-lib', function () {
    var dir = config.styles();
    return gulp.src(dir+'/bootstrap.scss')
        .pipe(sass({ style: 'expanded' }))
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/.tmp/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('app/.tmp/styles'))
        .pipe(notify({ message: 'Styles task complete for bootstrap' }));
});

gulp.task('scripts-core', function() {
    var dir = config.scripts();
        return gulp.src(dir)
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('core.js'))
        .pipe(gulp.dest('app/.tmp/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/.tmp/scripts'))
        .pipe(notify({ message: 'Scripts task complete for user js' }));
});

gulp.task('scripts-lib', function() {
    var dir = config.scripts();
        return gulp.src([
              'lib/jquery/dist/jquery.js',
              'lib/angularjs/angular.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
              'lib/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
                   ]
               )
        .pipe(concat('bower.js'))
        .pipe(gulp.dest('app/.tmp/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/.tmp/scripts'))
        .pipe(notify({ message: 'Scripts task complete for libraries' }));
});

gulp.task('connect', function() {
    var app = connect()
        .use(livereload({ port: 35729 }))
        .use(connect.static(config.app))
        .use(connect.directory(config.app));
 
    http.createServer(app)
        .listen(config.port)
        .on('listening', function() {
            console.log('Started connect web server on http://localhost:' + config.port + '.');
            opn('http://localhost:' + config.port + '/pages/home/index.html');
        });
});
 
gulp.task('server', ['build', 'sass', 'sass-lib','scripts-core', 'scripts-lib', 'connect', 'imagesmin'], function() {
    var jsPath = config.scripts(),
        cssPath = config.styles(),
        htmlPath = config.html(),
        server = livereload();
 
    gulp.watch(cssPath + '/**/*.scss', ['sass']);
 
    gulp.watch([cssPath + '/**/*.scss', jsPath, htmlPath]).on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task('imagesmin', function () {
    return gulp.src(config.app + '/**/*.{gif,jpeg,jpg,png}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.app + '/.tmp/img/'));
});
 
gulp.task('fonts', function(){
    var cssPath = config.styles();
 
    return gulp.src(cssPath + '/fonts/*')
        .pipe(gulp.dest(config.dist + '/styles/fonts'));
});
 
gulp.task('misc', function(){
    return gulp.src([
            config.app + '/*.{ico,png,svg,jpeg,jpg}',
            config.app + '/.htaccess'
        ])
        .pipe(gulp.dest(config.dist));
});
 
gulp.task('html', ['sass'], function(){
    var htmlPath = config.html();
 
    return gulp.src(htmlPath)
        .pipe(useref.assets())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(useref.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.dist));
});
 
gulp.task('build', ['clean'], function(){
    gulp.start('clean', 'imagesmin', 'fonts', 'misc', 'html');
});