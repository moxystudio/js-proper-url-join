# proper-url-join

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

[npm-url]:https://npmjs.org/package/proper-url-join
[npm-image]:http://img.shields.io/npm/v/proper-url-join.svg
[downloads-image]:http://img.shields.io/npm/dm/proper-url-join.svg
[travis-url]:https://travis-ci.org/moxystudio/js-proper-url-join
[travis-image]:http://img.shields.io/travis/moxystudio/js-proper-url-join/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/js-proper-url-join
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/js-proper-url-join/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/js-proper-url-join
[david-dm-image]:https://img.shields.io/david/moxystudio/js-proper-url-join.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/js-proper-url-join?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/js-proper-url-join.svg
[greenkeeper-image]:https://badges.greenkeeper.io/moxystudio/js-proper-url-join.svg
[greenkeeper-url]:https://greenkeeper.io

Like `path.join` but for a URL.


## Installation

`$ npm install proper-url-join --save-dev`


## Motivation

There are a lot of packages that attempt to provide this functionality but they all have issues.   
This package exists to properly offer the ability to join urls.

## Usage

```js
import urlJoin from 'url-join';

urlJoin('foo', 'bar');  // /foo/bar
urlJoin('/foo/', '/bar/');  // /foo/bar
urlJoin('foo', '', 'bar');  // /foo/bar
urlJoin('foo', undefined, 'bar');  // /foo/bar
urlJoin('foo', null, 'bar');  // /foo/bar

urlJoin('foo', 'bar', { leadingSlash: false });  // foo/bar
urlJoin('foo', 'bar', { trailingSlash: true });  // /foo/bar/
urlJoin('foo', 'bar', { leadingSlash: false, trailingSlash: true });  // foo/bar/
```

Available options:

- `leadingSlash`: Add a leading `/` (defaults to `true`)
- `trailingSlash`: Add a trailing `/` (defaults to `false`)


## Tests

`$ npm test`   
`$ npm test -- --watch` during development


## License

[MIT License](http://opensource.org/licenses/MIT)
