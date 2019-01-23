// Type definitions for proper-url-join v1.2.0
// Project: proper-url-join
// Definitions by: Jules Samuel Randolph <https://github.com/jsamr>

declare namespace urlJoin {

    interface StringifyOptions {
        /**
         * Strictly encode URI components with [strict-uri-encode](https://github.com/kevva/strict-uri-encode).
         * It uses [`encodeURIComponent`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) if set to `false`.
         * You probably don't care about this option.
         *
         * [Read the full doc here](https://github.com/sindresorhus/query-string#strict).
         */
        strict?: boolean
        /**
         * [URL encode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the keys and values.
         *
         * [Read the full doc here](https://github.com/sindresorhus/query-string#encode).
         */
        encode?: boolean
        /**
         * **Default**: `'none'`
         *
         * [Read the full doc here](https://github.com/sindresorhus/query-string#arrayformat-1).
         */
        arrayFormat?: 'none' | 'bracket' | 'index'
    }

    interface Options {
        /**
         * Add a leading slash.
         *
         * **Default**: `true`
         */
        leadingSlash?: boolean
        /**
         * Add a trailing slash.
         *
         * **Default**: `false`
         */
        trailingSlash?: boolean
        /**
         * Protocol relative URLs.
         *
         * **Default**: `false`
         */
        protocolRelative?: boolean
        /**
         * Query string object that will be properly stringified and appended to the url.
         * It will be merged with the query string in the url, if it exists.
         */
        query?: {
            [k: string]: string|number|Array<string|number>
        }
        /**
         * [query-string](https://github.com/sindresorhus/query-string#stringifyobject-options) singify method options to be considered when stringifying the query.
         */
        queryOptions?: urlJoin.StringifyOptions
    }

    type PathArg = string|null|undefined|number|urlJoin.Options
}

type urlJoin = (p1: urlJoin.PathArg, ...args: (urlJoin.PathArg|urlJoin.Options)[]) => string

declare const urlJoin: urlJoin

export = urlJoin
