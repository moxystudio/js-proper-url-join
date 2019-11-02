import queryString from 'query-string';

const defaultUrlRegExp = /^(\w+:\/\/[^/?]+)?(.*?)(\?.+)?$/;
const protocolRelativeUrlRegExp = /^(\/\/[^/?]+)(.*?)(\?.+)?$/;

function parseUrl(partsStr, { protocolRelative }) {
    const match = (protocolRelative && partsStr.match(protocolRelativeUrlRegExp)) ||
                   partsStr.match(defaultUrlRegExp) ||
                  [];

    const prefix = match[1] || '';

    const getParts = (prePathname) =>
        prePathname.split('/').filter((part) => part !== '');

    const hasLeadingSlash = (prePathname) =>
        prePathname.match(/^\/+/) !== null;

    const hasTrailingSlash = (prePathname) =>
        prePathname.match(/\/+$/) !== null;

    const prePathname = match[2] || '';

    const pathname = {
        parts: getParts(prePathname),
        hasLeading: hasLeadingSlash(prePathname),
        hasTrailing: hasTrailingSlash(prePathname),
    };

    const suffix = (match[3] || '');

    return { prefix, pathname, suffix };
}

export default function urlJoin(...parts) {
    const lastArg = parts[parts.length - 1];
    let options;

    // If last argument is an object, then it's the options
    // Note that null is an object, so we verify if is truthy
    if (lastArg && typeof lastArg === 'object') {
        options = lastArg;
        parts = parts.slice(0, -1);
    }

    // Parse options
    options = {
        leadingSlash: true,
        trailingSlash: false,
        protocolRelative: false,
        ...options,
    };

    // Join parts
    const partsStr = parts
    .filter((part) => typeof part === 'string' || typeof part === 'number')
    .join('/');

    // Split the parts into prefix, pathname, and suffix
    // (scheme://host)(/pathname)(?queryString)
    const { prefix, pathname, suffix } = parseUrl(partsStr, options);

    let url = '';

    // Start with prefix if not empty (http://google.com)
    if (prefix) {
        url += prefix + (pathname ? '/' : '');
    // Otherwise start with the leading slash
    } else if (options.leadingSlash) {
        url += '/';
    }

    // Add pathname (foo/bar)
    url += pathname;

    // Add trailing slash
    if (options.trailingSlash && !url.endsWith('/')) {
        url += '/';
    }

    // Build a query object based on the url query string and options query object
    const query = { ...queryString.parse(suffix, options.queryOptions), ...options.query };
    const queryStr = queryString.stringify(query, options.queryOptions);

    if (queryStr) {
        url += `?${queryStr}`;
    }

    return url;
}
