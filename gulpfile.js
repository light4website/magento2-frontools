'use strict';
// Plugins / Functions / Modules
const plugins = require('gulp-load-plugins')({
        pattern: ['*', '!gulp', '!gulp-load-plugins'],
        rename : {
          'browser-sync'    : 'browserSync',
          'fs-extra'        : 'fs',
          'gulp-multi-dest' : 'multiDest',
          'js-yaml'         : 'yaml',
          'marked-terminal' : 'markedTerminal',
          'postcss-reporter': 'reporter',
          'run-sequence'    : 'runSequence',
          'gulp-typescript' : 'ts',
          'gulp.spritesmith': 'spritesmith',
          'gulp-replace-name':'replaceName',
          'gulp-responsive' : 'responsive',
          'gulp-gm'         : 'gm'
        }
    }),
    config = {
        'projectPath': plugins.fs.realpathSync('../../../') + '/'
    };

plugins.errorMessage = require('./helper/error-message')(plugins);
plugins.getThemes = require('./helper/get-themes')(plugins, config);
config.themes = require('./helper/config-loader')('themes.json', plugins, config, false);
config.typescript = require('./helper/config-loader')('tsconfig.json', plugins, config, false);

// Tasks loading
require('gulp-task-loader')({
    dir    : 'task',
    plugins: plugins,
    configs: config
});
