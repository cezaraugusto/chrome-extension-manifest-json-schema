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

* [V3](manifest/manifest.schema.v3.json) - includes the current Chrome implementation with specific backward compatibility according to the Chrome team.
* [V2](manifest/manifest.schema.v2.json) - includes the legacy Manifest V2 Chrome implementation possibly expired or with an expiring date soon.

Source code on [schemastore](https://json.schemastore.org/chrome-manifest).

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

Public domain
