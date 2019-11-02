import queryString from 'query-string';

const defaultUrlRegExp = /^(\w+:\/\/[^/?]+)?(.*?)(\?.+)?$/;
const protocolRelativeUrlRegExp = /^(\/\/[^/?]+)(.*?)(\?.+)?$/;

const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

function splitUrl(partsStr, { protocolRelative, trailingSlash, leadingSlash }) {
    const match = (protocolRelative && partsStr.match(protocolRelativeUrlRegExp)) ||
                   partsStr.match(defaultUrlRegExp) ||
                  [];

    const beforePathname = match[1] || '';

    const shouldKeep = (opt) => opt === 'keep';

    const removeLeadingSlashes = (s) => s.replace(/^\/+/, '');

    const removeTrailingSlashes = (s) => s.replace(/\/+$/, '');

    const normalizeConsecutiveSlashesToJustOne = (s) =>
        s.replace(/\/+/g, '/');

    const actions = [
        !shouldKeep(leadingSlash) && removeLeadingSlashes,
        !shouldKeep(trailingSlash) && removeTrailingSlashes,
        normalizeConsecutiveSlashesToJustOne,
    ].filter(Boolean);

    const pathname = pipe(...actions)(match[2] || '');

    const afterPathname = (match[3] || '');

    return { beforePathname, pathname, afterPathname };
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

    // Split the parts into beforePathname, pathname, and afterPathname
    // (scheme://host)(/pathname)(?queryString)
    const { beforePathname, pathname, afterPathname } = splitUrl(partsStr, options);

    let url = '';

    // Start with beforePathname if not empty (http://google.com)
    if (beforePathname) {
        url += beforePathname + (pathname ? '/' : '');
    // Otherwise start with the leading slash
    } else if (options.leadingSlash === true) {
        url += '/';
    }

    // Add pathname (foo/bar)
    url += pathname;

    // Add trailing slash
    if (options.trailingSlash === true && !url.endsWith('/')) {
        url += '/';
    }

    // Build a query object based on the url query string and options query object
    const query = { ...queryString.parse(afterPathname, options.queryOptions), ...options.query };
    const queryStr = queryString.stringify(query, options.queryOptions);

    if (queryStr) {
        url += `?${queryStr}`;
    }

    return url;
}
