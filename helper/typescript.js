'use strict';
module.exports = function(gulp, plugins, config, name) { // eslint-disable-line func-names
    const theme = config.themes[name];

    return () => {

        if (!theme.localeOverwrites) {
            let dest = [];
            theme.locale.forEach(locale => {
                dest.push(config.projectPath + theme.dest + '/' + locale + '/web/js/');
            });

            return gulp.src(config.projectPath + theme.src + '/**/*.ts')
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.ts(config.typescript))
                .pipe(plugins.sourcemaps.write('./'))
                .pipe(plugins.multiDest(dest))
        }
        else {
            theme.locale.forEach(locale => {
                return gulp.src(config.projectPath + theme.src + '/**/*.ts')
                    .pipe(plugins.sourcemaps.init())
                    .pipe(plugins.ts(config.typescript))
                    .pipe(plugins.sourcemaps.write('./'))
                    .pipe(gulp.dest(config.projectPath + theme.dest + '/' + locale + '/web/js/'));
            });
        }
    }
};
