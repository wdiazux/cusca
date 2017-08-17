// Include gulp
const gulp = require('gulp');

// Plugins
const del          = require('del');
const eslint       = require('gulp-eslint');
const uglify       = require('gulp-uglify');
const rename       = require("gulp-rename");
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const changed      = require('gulp-changed');;
const path         = require('path');
const cssnano      = require('gulp-cssnano');
const imagemin     = require('gulp-imagemin');
const gulpSequence = require('gulp-sequence');
const svgstore     = require('gulp-svgstore');
//const gutil        = require('gulp-util');
const watch        = require('gulp-watch');
const bs           = require('browser-sync').create();
const handleErrors = require('./src/lib/handleErrors');
const config       = require('./src/config');



const paths = {
    static: {
        src: [
            path.join(config.root.src, config.tasks.static.src, '/**'),
            path.join('!' + config.root.src, config.tasks.static.src)
        ],
        dest: path.join(config.root.dest, config.tasks.static.dest)
    },
    js: {
        src: [
            path.join(config.root.src, config.tasks.js.src, '/**/*.{' + config.tasks.js.extensions + '}')
        ],
        dest: path.join(config.root.dest, config.tasks.js.dest)
    },
    vendors: {
        src: [
            path.join(config.node.src, 'jquery/dist/jquery.js'),
            path.join(config.node.src, 'foundation-sites/dist/js/foundation.min.js'),
            path.join(config.node.src, 'motion-ui/dist/motion-ui.js'),
            path.join(config.root.src, 'lib/ghostbot.js'),
            path.join(config.node.src, 'imagesloaded/imagesloaded.pkgd.js'),
            path.join(config.node.src, 'isotope-layout/dist/isotope.pkgd.js'),
            path.join(config.node.src, 'wowjs/dist/wow.js'),
            path.join(config.node.src, '@fancyapps/fancybox/dist/jquery.fancybox.js'),
            path.join(config.node.src, 'fluidvids.js/dist/fluidvids.js')
        ],
        css: [
            path.join(config.node.src, '@fancyapps/fancybox/dist/jquery.fancybox.css')
        ]
    },
    prism: {
        js: [
            path.join(config.node.src, 'prismjs/components/prism-core.js'),
            path.join(config.node.src, 'prismjs/components/prism-markup.js'),
            path.join(config.node.src, 'prismjs/components/prism-css.js'),
            path.join(config.node.src, 'prismjs/components/prism-clike.js'),
            path.join(config.node.src, 'prismjs/components/prism-javascript.js'),
            path.join(config.node.src, 'prismjs/components/prism-bash.js'),
            path.join(config.node.src, 'prismjs/components/prism-scss.js'),
            path.join(config.node.src, 'prismjs/components/prism-diff.js'),
            path.join(config.node.src, 'prismjs/components/prism-handlebars.js'),
            path.join(config.node.src, 'prismjs/components/prism-json.js'),
            path.join(config.node.src, 'prismjs/components/prism-typescript.js'),
            path.join(config.node.src, 'prismjs/plugins/file-highlight/prism-file-highlight.js')
        ]
    },
    css: {
        src: path.join(config.root.src, config.tasks.css.src, '/**/*.scss'),
        dest: path.join(config.root.dest, config.tasks.css.dest)
    },
    font: {
        src: [
            path.join( config.root.src, config.tasks.fonts.src, '/**/*.{' + config.tasks.fonts.extensions + '}'),
            path.join( config.node.src, 'font-awesome/fonts', '/**/*.{' + config.tasks.fonts.extensions + '}')
        ],
        dest: path.join(config.root.dest, config.tasks.fonts.dest)
    },
    images: {
        src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
        dest: path.join(config.root.dest, config.tasks.images.dest)
    },
    svg: {
        src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
        dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
    }
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.js.src)
        .pipe(eslint(config.tasks.lint.eslint))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Concatenate & Minify JS
gulp.task('js', function() {
    return gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('vendors', function() {
    return gulp.src(paths.vendors.src)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('prism-js', function() {
    return gulp.src(paths.prism.js)
        .pipe(concat('prism.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('vendors-css', function() {
    return gulp.src(paths.vendors.css)
        .pipe(autoprefixer(config.tasks.css.autoprefixer))
        .pipe(rename({basename: 'vendors'}))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(cssnano({autoprefixer: false}))
        .pipe(rename({basename: 'vendors', suffix: '.min'}))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(bs.stream());
});

gulp.task('css', function() {
    return gulp.src(paths.css.src)
        .pipe(sass(config.tasks.css.sass))
        .on('error', handleErrors)
        .pipe(autoprefixer(config.tasks.css.autoprefixer))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(cssnano({autoprefixer: false, zindex: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(bs.stream());
});

gulp.task('fonts', function() {
    return gulp.src(paths.font.src)
        .pipe(changed(paths.font.dest))
        .pipe(gulp.dest(paths.font.dest))
});

gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(changed(paths.images.dest))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))

});

gulp.task('static', function() {
    return gulp.src(paths.static.src)
        .pipe(changed(paths.static.dest))
        .pipe(gulp.dest(paths.static.dest))
});


gulp.task('svgSprite', function() {
    return gulp.src(paths.svg.src)
        .pipe(imagemin())
        .pipe(svgstore())
        .pipe(gulp.dest(paths.svg.dest))
});

gulp.task('watch', ['default', 'browser-sync'], function() {
    var watchableTasks = [['lint'], ['js'], ['fonts'], ['images'], ['svgSprite'], ['css']];

    watchableTasks.forEach(function(taskName) {
        var task = config.tasks[taskName];
        if(task) {
            var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
            gulp.watch(glob, taskName);
        }
    })
});


gulp.task('browser-sync', function () {
    bs.init({
        files: [
            paths.js.dest,
            paths.css.dest,
            './**/*.hbs'
        ],
        proxy: 'localhost:2368',
        port: 8080,
        injectChanges: true
    });
});

gulp.task('browser-sync:reload', function (callback) {
    bs.reload();
    callback();
});

// Clean
gulp.task('clean', function(cb) {
    del([path.join(config.root.dest, '/**'), path.join('!', config.root.dest)]).then(function (paths) {
        cb();
    });
});

// Default Task
gulp.task('default', function(cb) {
    gulpSequence('clean', 'lint', 'vendors', 'js', 'static', 'fonts', 'images', 'svgSprite', 'css', 'prism-js', 'vendors-css', cb);
});
