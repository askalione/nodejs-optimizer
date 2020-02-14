"use strict";

const extend = require('extend');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

var defaults = {
    css: {
        path: undefined,
        suffix: 'min',
        callback: minified => minified.styles,
        cleanCss: {
            level: {
                1: {
                    specialComments: false
                }
            }
        }
    },
    js: {
        path: undefined,
        suffix: 'min',
        callback: minified => minified.code,
        uglifyJs: {}
    }
};

function optimize(path, content, callback, func, suffix) {
    var minify = typeof callback !== 'undefined';

    var resultContent = minify ? callback(func(content)) : content;

    if (typeof path === 'string') {
        var resultPath = path;
        if (minify) {
            var splittedPath = path.split('.');
            var ext = splittedPath.pop();
            splittedPath.push(suffix || 'min');
            splittedPath.push(ext);
            resultPath = splittedPath.join('.');
        }

        var result = {};
        result[resultPath] = resultContent;
        return result;
    } else {
        return resultContent;
    }
}

module.exports = {
    // Usage: 
    // optimizeCss(content); // minify=true
    // optimizeCss(content, false); // minify=false
    // optimizeCss(content, true, {}); // minify=true
    // optimizeCss(content, minified => minified.styles, {}); // minify=true
    // optimizeCss(content, {}); // minify=true
    optimizeCss: function (content) {
        var optDefaults = defaults.css;
        var callback = optDefaults.callback;
        if (arguments.length > 1 && arguments[1] === "function") {
            callback = arguments[1];
        } else if (arguments.length > 1 && arguments[1] === false) {
            callback = undefined;
        }
        var options = arguments.length > 1 && typeof arguments[1] === "object"
            ? arguments[1]
            : (arguments.length > 2 && typeof arguments[2] === "object" ? arguments[2] : {});
        options = extend(true, optDefaults, options || {});
        var minifyOptions = options.cleanCss;

        return optimize(
            options.path,
            content,
            callback,
            c => new CleanCSS(minifyOptions).minify(c),
            options.suffix
        );
    },
    // Usage: 
    // optimizeJs(content); // minify=true
    // optimizeJs(content, false); // minify=false
    // optimizeJs(content, true, {}); // minify=true
    // optimizeJs(content, minified => minified.code, {}); // minify=true
    // optimizeJs(content, {}); // minify=true
    optimizeJs: function (content) {
        var optDefaults = defaults.js;
        var callback = optDefaults.callback;
        if (arguments.length > 1 && arguments[1] === "function") {
            callback = arguments[1];
        } else if (arguments.length > 1 && arguments[1] === false) {
            callback = undefined;
        }
        var options = arguments.length > 1 && typeof arguments[1] === "object"
            ? arguments[1]
            : (arguments.length > 2 && typeof arguments[2] === "object" ? arguments[2] : {});
        options = extend(true, optDefaults, options || {});
        var minifyOptions = options.uglifyJs;

        return optimize(
            options.path,
            content,
            callback,
            c => UglifyJS.minify(c, minifyOptions),
            options.suffix
        );
    }
}