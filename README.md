# Optimizer

Optimizer is a simple utility for minification css and javascript depend on environment mode.

# References
- [CleanCSS](https://github.com/jakubpawlowicz/clean-css)
- [UglifyJS](https://github.com/mishoo/UglifyJS2)

## Usage

### CSS optimization

Default usage:

```javascript
const optimizer = required('@askalione/optimizer');

var original = 'body { color: #000; }';

var minified = optimizer.optimizeCss(original); // return minified css
```

Production/Development usage:

```javascript
const optimizer = required('@askalione/optimizer');
const PRODUCTION = process.env.NODE_ENV === 'production' || false;

var original = 'body { color: #000; }';

var minified = optimizer.optimizeCss(original, PRODUCTION); // return minified css if production mode otherwise not
```
Options usage:

```javascript
const optimizer = required('@askalione/optimizer');
const PRODUCTION = process.env.NODE_ENV === 'production' || false;

var original = 'body { color: #000; }';

var minified = optimizer.optimizeCss(original, PRODUCTION, 
{ 
	cleanCss:  {
	... // CleanCSS options
	}
}); // return minified css if production mode otherwise not
```

Path options:

```javascript
const optimizer = required('@askalione/optimizer');
const PRODUCTION = process.env.NODE_ENV === 'production' || false;

var original = 'body { color: #000; }';

var minified = optimizer.optimizeCss(original, PRODUCTION, 
{ 
	path: 'css/site.css'
}); // return object { path, css } where path has minification suffix if css was minified. Css minified if production mode otherwise not. E.g path = 'css/site.min.css' if minified otherwise 'css/site.css'.
```

Options:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| path | string | `undefined` | File path. If undefined optimizaeCss return string = css. |
| suffix | string | `min` | Optimized file suffix. |
| callback | function | `minified => minified.styles` | Callback for CleanCSS minify method. |
| cleanCss | object | `level: { 1: { specialComments: false } }`| [CleanCSS options](https://github.com/jakubpawlowicz/clean-css)  |

### JS optimization

Default usage:

```javascript
const optimizer = required('@askalione/optimizer');

var original = 'var a = function() {};';

var minified = optimizer.optimizeJs(original); // return minified js
```

Production/Development usage:

```javascript
const optimizer = required('@askalione/optimizer');
const PRODUCTION = process.env.NODE_ENV === 'production' || false;

var original = 'var a = function() {};';

var minified = optimizer.optimizeJs(original, PRODUCTION); // return minified js if production mode otherwise not
```
Options usage:

```javascript
const optimizer = required('@askalione/optimizer');
const PRODUCTION = process.env.NODE_ENV === 'production' || false;

var original = 'var a = function() {};';

var minified = optimizer.optimizeJs(original, PRODUCTION, 
{ 
	uglifyJs:  {
	... // UglifyJS options
	}
}); // return minified js if production mode otherwise not
```

Path options:

```javascript
const optimizer = required('@askalione/optimizer');
const PRODUCTION = process.env.NODE_ENV === 'production' || false;

var original = 'var a = function() {};';

var minified = optimizer.optimizeJs(original, PRODUCTION, 
{ 
	path: 'js/site.js'
}); // return object { path, js } where path has minification suffix if js was minified. Js minified if production mode otherwise not. E.g path = 'js/site.min.js' if minified otherwise 'js/site.js'.
````````````
Options:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| path | string | `undefined` | File path. If undefined optimizaeJs return string = js. |
| suffix | string | `min` | Optimized file suffix. |
| callback | function | `minified => minified.code` | Callback for UglifyJS minify method. |
| uglifyJs | object | `{}`| [UglifyJS options](https://github.com/mishoo/UglifyJS2)  |

## License
Optimizer is open source, licensed under the [MIT License](https://github.com/askalione/npm-optimizer/blob/master/LICENSE).