"use strict";

const optimizer = require('../index');

const cssContent = '.body { color: #fff; }';
const jsContent = 'var a = function() {};';

console.log('cssOptimized => ', optimizer.optimizeCss(cssContent));
console.log('cssNotOptimized => ', optimizer.optimizeCss(cssContent, false));
console.log('cssOptimized [path] => ', optimizer.optimizeCss(cssContent, { path: 'css/fonts.css', suffix: 'min' }));
console.log('cssNotOptimized [path] => ', optimizer.optimizeCss(cssContent, false, { path: 'css/fonts.css' }));

console.log('==============================');

console.log('jsOptimized => ', optimizer.optimizeJs(jsContent));
console.log('jsNotOptimized => ', optimizer.optimizeJs(jsContent, false));
console.log('jsOptimized [path] => ', optimizer.optimizeJs(jsContent, { path: 'js/utils.js', suffix: 'min' }));
console.log('jsNotOptimized [path] => ', optimizer.optimizeJs(jsContent, false, { path: 'js/utils.js' }));