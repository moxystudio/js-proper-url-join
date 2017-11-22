import urlJoin from '../src';

it('should join urls parts', () => {
    expect(urlJoin('', 'foo')).toBe('/foo');
    expect(urlJoin('', '/foo')).toBe('/foo');
    expect(urlJoin('/', '/foo')).toBe('/foo');
    expect(urlJoin('/', '//foo')).toBe('/foo');
    expect(urlJoin('/', '/foo//')).toBe('/foo');
    expect(urlJoin('/', '/foo/', '')).toBe('/foo');
    expect(urlJoin('/', '/foo/', '/')).toBe('/foo');
    expect(urlJoin('foo', 'bar')).toBe('/foo/bar');
    expect(urlJoin('/foo', 'bar')).toBe('/foo/bar');
    expect(urlJoin('/foo', '/bar')).toBe('/foo/bar');
    expect(urlJoin('/foo/', '/bar/')).toBe('/foo/bar');
});

it('should work with no arguments', () => {
    expect(urlJoin()).toBe('/');
});

it('should work falsy values', () => {
    expect(urlJoin(null)).toBe('/');
    expect(urlJoin('foo', 'bar', null)).toBe('/foo/bar');
    expect(urlJoin('foo', null, 'bar')).toBe('/foo/bar');
    expect(urlJoin('foo', false, 'bar')).toBe('/foo/bar');
});

describe('options', () => {
    it('should add a trailing slash if options.trailingSlash is true', () => {
        const options = { trailingSlash: true };

        expect(urlJoin('/foo', '', options)).toBe('/foo/');
        expect(urlJoin('/foo', '/bar', options)).toBe('/foo/bar/');
        expect(urlJoin('/foo', '/bar/', options)).toBe('/foo/bar/');
        expect(urlJoin('/foo', 'bar//', options)).toBe('/foo/bar/');
    });

    it('should remove leading slash if options.leadingSlash is false', () => {
        const options = { leadingSlash: false };

        expect(urlJoin('', '', options)).toBe('');
        expect(urlJoin('/', '', options)).toBe('');
        expect(urlJoin('/', '/', options)).toBe('');
        expect(urlJoin('//', '/', options)).toBe('');
        expect(urlJoin('foo', '', options)).toBe('foo');
        expect(urlJoin('/foo', '', options)).toBe('foo');
        expect(urlJoin('/', '/foo', options)).toBe('foo');
        expect(urlJoin('foo', 'bar', options)).toBe('foo/bar');
        expect(urlJoin('/foo', '/bar', options)).toBe('foo/bar');
    });
});
