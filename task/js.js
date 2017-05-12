'use strict';
module.exports = function() { // eslint-disable-line func-names

    // Global variables
    const gulp  = this.gulp,
        plugins = this.opts.plugins,
        config   = this.opts.configs,
        themes  = plugins.getThemes();

    // Loop through themes to compile typescript depending on your config.json
    themes.forEach(name => {
        require('../helper/typescript')(gulp, plugins, config, name)();
    });
};
