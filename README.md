[action-image]: https://github.com/cezaraugusto/chrome-extension-manifest-json-schema/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/chrome-extension-manifest-json-schema/actions
[npm-version-image]: https://img.shields.io/npm/v/chrome-extension-manifest-json-schema.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/chrome-extension-manifest-json-schema
[npm-downloads-image]: https://img.shields.io/npm/dm/chrome-extension-manifest-json-schema.svg?color=0971fe
[npm-downloads-url]: https://www.npmjs.com/package/chrome-extension-manifest-json-schema

[![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

# chrome-extension-manifest-json-schema

> JSON schemas for Chrome extension manifest files (V2 and V3) with support for Node.js

JSON schemas for Chrome extension manifest files. For info about JSON schemas, see [json-schema.org](http://json-schema.org/).

## What's included?

* [V3](manifest/manifest.schema.v3.json) - the current target. Tracks the modern Manifest V3 surface, including `action`, `background.service_worker`, `host_permissions`/`optional_host_permissions`, the object form of `web_accessible_resources` and `content_security_policy`, `declarative_net_request`, `side_panel`, `cross_origin_embedder_policy`/`cross_origin_opener_policy`, and the `world` / `match_origin_as_fallback` content-script keys.
* [V2](manifest/manifest.schema.v2.json) - Manifest V2, kept for archival validation only. Chrome removed Manifest V2 support entirely in Chrome 139 (mid-2025); new extensions must use V3.

This is an independently maintained schema that follows the official [Chrome manifest reference](https://developer.chrome.com/docs/extensions/reference/manifest). The community [SchemaStore](https://json.schemastore.org/chrome-manifest) schema is a related project; this package aims to stay current with newer Chrome fields and is consumable directly from Node.js.

## Usage

You can either point to [V3](manifest/manifest.schema.v3.json) or [V2](manifest/manifest.schema.v2.json) schemas or get it by the Node.js interface.

```js
const {manifestV2Schema, manifestV3Schema} = require('chrome-extension-manifest-json-schema')

console.log(manifestV3Schema)
```

## Outputs:

```json
{
  "title": "JSON schema for Google Chrome extension manifest files",
  "$schema": "http://json-schema.org/draft-07/schema#",

  "type": "object",
  "additionalProperties": true,
  "required": [ "manifest_version", "name", "version" ],

  "properties": {
    "manifest_version": {
      "type": "number",
      "description": "One integer specifying the version of the manifest file format your package requires.",
      "enum": [ 2, 3 ]
    },
    // ...other stuff
  }
}
```

## License

MIT (c) Cezar Augusto
