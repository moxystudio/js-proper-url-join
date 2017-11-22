export default function urlJoin(...parts) {
    const lastArg = parts[parts.length - 1];
    let options;

    // If last argument is an object, then it it's the options
    // Note that null is an object, so we verify if is truthy
    if (lastArg && typeof lastArg === 'object') {
        options = lastArg;
        parts = parts.slice(0, -1);
    }

    options = {
        leadingSlash: true,
        trailingSlash: false,
        ...options,
    };

    // Join the parts, removing any leading or trailing slashes
    let joined = parts
    // Remove falsy values
    .filter((part) => part && typeof part === 'string')
    // Join the parts
    .join('/')
    // Remove leading slashes
    .replace(/^\/+/, '')
    // Remove trailing slashes
    .replace(/\/+$/, '');

    // Add leading and trailing slashes according to the options
    if (options.leadingSlash) {
        joined = `/${joined}`;
    }
    if (options.trailingSlash) {
        joined = `${joined}/`;
    }

    // Finally normalize any duplicate // to just /
    joined = joined.replace(/\/+/g, '/');

    return joined;
}
