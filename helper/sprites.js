'use strict';
module.exports = function(gulp, plugins, config, name) { // eslint-disable-line func-names
    const theme = config.themes[name];

    return () => {

        gulp.task('evener', function () {
            var evener = plugins.gm(function (gmfile, done) {
                gmfile.size(function(error, size) {
                    done(null,
                        gmfile.background('transparent')
                            .extent(size.width+(size.width%2), size.height+(size.height%2))
                    );
                });
            });
            return gulp.src(config.projectPath + theme.src + '/web/img/sprite/*.png')
                .pipe(evener)
                .pipe(gulp.dest(config.projectPath + theme.src + '/web/img/sprite/temp/'));
        });


        gulp.task('resize', ['evener'], function () {
            return gulp.src(config.projectPath + theme.src + '/web/img/sprite/temp/*.png')

                .pipe(plugins.responsive({
                    '*': [{
                        rename: { suffix: '@2x' }
                    }, {
                        width: '50%',
                        format: 'png'
                    }]
                }))
                .pipe(gulp.dest(config.projectPath + theme.src + '/web/img/sprite/temp/'))
        });

        gulp.task('spritesmith', ['resize'], function() {
            var sprite = gulp.src([config.projectPath + theme.src + '/web/img/sprite/temp/*.png']).pipe(plugins.spritesmith({
                retinaSrcFilter: config.projectPath + theme.src + '/web/img/sprite/temp/*@2x.png',
                imgName: 'sprite.png',
                retinaImgName: 'sprite@2x.png',
                imgPath: '../../img/sprite.png',
                retinaImgPath: '../img/sprite@2x.png',
                cssName: '_sprite.scss',
                cssTemplate: 'sprite.css.handlebars',
                padding: 30
            }));

            return sprite.img.pipe(gulp.dest(config.projectPath + theme.src + '/web/img/')) && sprite.css.pipe(gulp.dest(config.projectPath + theme.src + '/web/css/helpers/'));
        });

        gulp.task('clean', function() {
            return plugins.del(
                [config.projectPath + theme.src + '/web/img/sprite/temp/**'], {force: true}
            );
        });

        gulp.task('overwrite', ['clean'], function () {
            return gulp.src('/web/img/sprite@2x.png')
                .pipe(plugins.replaceName(/@2x.png/g, '.png'))
                .pipe(plugins.gm(function (gmfile, done) {

                    gmfile.size(function (err, size) {

                        done(null, gmfile
                            .background('transparent')
                            .quality(100)
                            .resize(size.width / 2, size.height / 2));

                    });

                }))
                .pipe(gulp.dest(config.projectPath + theme.src + '/web/img/'));
        });

        plugins.runSequence('spritesmith', 'overwrite')
    }
};









