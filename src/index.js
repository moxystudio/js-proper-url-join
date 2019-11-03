import queryString from 'query-string';

const defaultUrlRegExp = /^(\w+:\/\/[^/?]+)?(.*?)(\?.+)?$/;
const protocolRelativeUrlRegExp = /^(\/\/[^/?]+)(.*?)(\?.+)?$/;

const parseParts = (parts, options) => {
    const { protocolRelative } = options;

    const partsStr = parts.join('/');
    const urlRegExp = protocolRelative ? protocolRelativeUrlRegExp : defaultUrlRegExp;
    const [, prefix = '', pathname = '', suffix = ''] = partsStr.match(urlRegExp) || [];

    return {
        prefix,
        pathname: {
            parts: pathname.split('/').filter((part) => part !== ''),
            hasLeading: /^\/+/.test(pathname),
            hasTrailing: suffix ? /[^/]\/\/+$/.test(pathname) : /[^/]\/+$/.test(pathname),
        },
        suffix,
    };
};

const buildUrl = (parsedParts, options) => {
    const { prefix, pathname, suffix } = parsedParts;
    const { parts: pathnameParts, hasLeading, hasTrailing } = pathname;
    const { leadingSlash, trailingSlash } = options;

    const addLeading = leadingSlash === true || (leadingSlash === 'keep' && hasLeading);
    const addTrailing = trailingSlash === true || (trailingSlash === 'keep' && hasTrailing);

    // Start with prefix if not empty (http://google.com)
    let url = prefix;

    // Add the parts
    if (pathnameParts.length > 0) {
        url += url || addLeading ? '/' : '';
        url += pathnameParts.join('/');
    }

    // Add trailing to the end
    if (addTrailing) {
        url += '/';
    }

    // Add leading if URL is still empty
    if (!url && addLeading) {
        url += '/';
    }

    // Build a query object based on the url query string and options query object
    const query = { ...queryString.parse(suffix, options.queryOptions), ...options.query };
    const queryStr = queryString.stringify(query, options.queryOptions);

    if (queryStr) {
        url += `?${queryStr}`;
    }

    return url;
};

const urlJoin = (...parts) => {
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

    // Normalize parts, filtering non-string or non-numeric values
    parts = parts.filter((part) => typeof part === 'string' || typeof part === 'number');

    // Split the parts into prefix, pathname, and suffix
    // (scheme://host)(/pathnameParts.join('/'))(?queryString)
    const parsedParts = parseParts(parts, options);

    // Finaly build the url based on the parsedParts
    return buildUrl(parsedParts, options);
};

export default urlJoin;
