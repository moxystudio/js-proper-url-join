const defaultUrlRegExp = /^(\w+:\/\/[^/?]+)?(.*?)(\?.+)?$/;
const protocolRelativeUrlRegExp = /^(\/\/[^/?]+)(.*?)(\?.+)?$/;

function splitUrl(partsStr, { protocolRelative }) {
    const match = (protocolRelative && partsStr.match(protocolRelativeUrlRegExp)) ||
                   partsStr.match(defaultUrlRegExp) ||
                  [];

    const beforePathname = match[1] || '';
    const pathname = (match[2] || '')
    // Remove leading slashes
    .replace(/^\/+/, '')
    // Remove trailing slashes
    .replace(/\/+$/, '')
    // Normalize consecutive slashes to just one
    .replace(/\/+/g, '/');
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
    .filter((part) => typeof part === 'string')
    .join('/');

    // Split the parts into beforePathname, pathname, and afterPathname
    // (scheme://host)(/pathname)(?queryString)
    const { beforePathname, pathname, afterPathname } = splitUrl(partsStr, options);

    let url = '';

    // Start with beforePathname if not empty (http://google.com)
    if (beforePathname) {
        url += beforePathname + (pathname ? '/' : '');
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

    // Finally add afterPathname (?queryString)
    url += afterPathname;

    return url;
}
