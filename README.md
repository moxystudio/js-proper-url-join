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

`$ npm install proper-url-join`


## Motivation

There are a lot of packages that attempt to provide this functionality but they all have issues.   
This package exists with the hope to do it right:

- Consistent behavior
- Support adding/removing leading and trailing slashes
- Supports absolute URLs, e.g.: http//google.com
- Supports protocol relative URLs, e.g.: //google.com
- Supports query strings


## Usage

```js
import urlJoin from 'proper-url-join';

urlJoin('foo', 'bar'); // /foo/bar
urlJoin('/foo/', '/bar/'); // /foo/bar
urlJoin('foo', '', 'bar'); // /foo/bar
urlJoin('foo', undefined, 'bar'); // /foo/bar
urlJoin('foo', null, 'bar'); // /foo/bar

// With leading & trailing slash options
urlJoin('foo', 'bar', { leadingSlash: false }); // foo/bar
urlJoin('foo', 'bar', { trailingSlash: true }); // /foo/bar/
urlJoin('foo', 'bar', { leadingSlash: false, trailingSlash: true }); // foo/bar/

// Absolute URLs
urlJoin('http://google.com', 'foo'); // http://google.com/foo

// Protocol relative URLs
urlJoin('//google.com', 'foo', { protocolRelative: true }); // //google.com/foo

// With query string as an url part
urlJoin('foo', 'bar?queryString'); // /foo/bar?queryString
urlJoin('foo', 'bar?queryString', { trailingSlash: true }); // /foo/bar/?queryString

// With query string as an object
urlJoin('foo', { query: { biz: 'buz', foo: 'bar' } }); // /foo?biz=buz&foo=bar

// With both query string as an url part and an object
urlJoin('foo', 'bar?queryString', { query: { biz: 'buz', foo: 'bar' } }); // /foo/bar?biz=buz&foo=bar&queryString
```

#### options

###### leadingSlash

Type: `boolean`   
Default: `true`

Add a leading `/`

###### trailingSlash

Type: `boolean`   
Default: `false`

Add a trailing `/`

###### protocolRelative

Type: `boolean`   
Default: `false`

Enables support for protocol relative URLs

###### query

Type: `object`

Query string object that will be properly stringified and appended to the url. It will be merged with the query string in the url, if it exists.

###### queryOptions

Type: `object`

[Options](https://github.com/sindresorhus/query-string#stringifyobject-options) to be considered when stringifying the query



## Tests

`$ npm test`   
`$ npm test -- --watch` during development


## License

[MIT License](http://opensource.org/licenses/MIT)
