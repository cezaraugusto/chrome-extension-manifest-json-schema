[action-image]: https://github.com/cezaraugusto/chrome-extension-manifest-schemas/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/chrome-extension-manifest-schemas/actions
[npm-image]: https://img.shields.io/npm/v/chrome-extension-manifest-schemas.svg
[npm-url]: https://npmjs.org/package/chrome-extension-manifest-schemas

# chrome-extension-manifest-schemas [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> Chrome extension manifest JSON schemas (V2 and V3)

Json schemas for Chrome extension manifest files. Information about json schemas can be found at
[json-schema.org](http://json-schema.org/).

## What's included?

* [V3](manifest/manifest.schema.v3.json) includes the current Chrome implementation with specific backwards-compatibility according to the Chrome team.
* [V2](manifest/manifest.schema.v2.json) includes the legacy Manifest V2 Chrome implementation possibly expired or with an expiring date soon.

Source code on schemastore: https://json.schemastore.org/chrome-manifest

## Usage

You can either point to [V3](manifest/manifest.schema.v3.json) or [V2](manifest/manifest.schema.v2.json) schemas, or get it by the Node.js interface.

```js
const {manifestV2Schema, manifestV3Schema} = require('chrome-extension-manifest-schemas')

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
    "name": {
      "type": "string",
      "description": "The name of the extension",
      "maxLength": 45
    },
    "version": {
      "description": "One to four dot-separated integers identifying the version of this extension.",
      "$ref": "#/definitions/version_string"
    },
    "default_locale": {
      "type": "string",
      "description": "Specifies the subdirectory of _locales that contains the default strings for this extension.",
      "default": "en"
    },
    "description": {
      "type": "string",
      "description": "A plain text description of the extension",
      "maxLength": 132
    },
    "icons": {
      "type": "object",
      "description": "One or more icons that represent the extension, app, or theme. Recommended format: PNG; also BMP, GIF, ICO, JPEG.",
      "minProperties": 1,
      "properties": {
        "16": {
          "$ref": "#/definitions/icon",
          "description": "Used as the favicon for an extension's pages and infobar."
        },
        "48": {
          "$ref": "#/definitions/icon",
          "description": "Used on the extension management page (chrome://extensions)."
        },
        "128": {
          "$ref": "#/definitions/icon",
          "description": "Used during installation and in the Chrome Web Store."
        },
        "256": {
          "$ref": "#/definitions/icon",
          "description": "Used during installation and in the Chrome Web Store."
        }
      }
    },
    "chrome_url_overrides": {
      "type": "object",
      "description": "Override pages are a way to substitute an HTML file from your extension for a page that Google Chrome normally provides.",
      "additionalProperties": false,
      "maxProperties": 1,
      "properties": {
        "bookmarks": {
          "$ref": "#/definitions/page",
          "description": "The page that appears when the user chooses the Bookmark Manager menu item from the Chrome menu or, on Mac, the Bookmark Manager item from the Bookmarks menu. You can also get to this page by entering the URL chrome://bookmarks.",
          "default": "bookmarks.html"
        },
        "history": {
          "$ref": "#/definitions/page",
          "description": "The page that appears when the user chooses the History menu item from the Chrome menu or, on Mac, the Show Full History item from the History menu. You can also get to this page by entering the URL chrome://history.",
          "default": "history.html"
        },
        "newtab": {
          "$ref": "#/definitions/page",
          "description": "The page that appears when the user creates a new tab or window. You can also get to this page by entering the URL chrome://newtab.",
          "default": "newtab.html"
        }
      }
    },
    "commands": {
      "type": "object",
      "description": "Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.",
      "patternProperties": {
        ".*": { "$ref": "#/definitions/command" },
        "^_execute_browser_action$": { "$ref": "#/definitions/command" },
        "^_execute_page_action$": { "$ref": "#/definitions/command" }
      }
    },
    "content_scripts": {
      "type": "array",
      "description": "Content scripts are JavaScript files that run in the context of web pages.",
      "minItems": 1,
      "uniqueItems": true,
      "items": {
        "type": "object",
        "required": [ "matches" ],
        "additionalProperties": false,
        "properties": {
          "matches": {
            "type": "array",
            "description": "Specifies which pages this content script will be injected into.",
            "minItems": 1,
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/match_pattern" }
          },
          "exclude_matches": {
            "type": "array",
            "description": "Excludes pages that this content script would otherwise be injected into.",
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/match_pattern" }
          },
          "css": {
            "type": "array",
            "description": "The list of CSS files to be injected into matching pages. These are injected in the order they appear in this array, before any DOM is constructed or displayed for the page.",
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/uri" }
          },
          "js": {
            "$ref": "#/definitions/scripts",
            "description": "The list of JavaScript files to be injected into matching pages. These are injected in the order they appear in this array."
          },
          "run_at": {
            "type": "string",
            "description": "Controls when the files in js are injected.",
            "enum": [ "document_start", "document_end", "document_idle" ],
            "default": "document_idle"
          },
          "all_frames": {
            "type": "boolean",
            "description": "Controls whether the content script runs in all frames of the matching page, or only the top frame.",
            "default": false
          },
          "include_globs": {
            "type": "array",
            "description": "Applied after matches to include only those URLs that also match this glob. Intended to emulate the @include Greasemonkey keyword.",
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/glob_pattern" }
          },
          "exclude_globs": {
            "type": "array",
            "description": "Applied after matches to exclude URLs that match this glob. Intended to emulate the @exclude Greasemonkey keyword.",
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/glob_pattern" }
          },
          "match_about_blank": {
            "type": "boolean",
            "description": "Whether to insert the content script on about:blank and about:srcdoc.",
            "default": false
          }
        }
      }
    },
    "devtools_page": {
      "$ref": "#/definitions/page",
      "description": "A DevTools extension adds functionality to the Chrome DevTools. It can add new UI panels and sidebars, interact with the inspected page, get information about network requests, and more."
    },
    "externally_connectable": {
      "description": "Declares which extensions, apps, and web pages can connect to your extension via runtime.connect and runtime.sendMessage.",
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "ids": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "The IDs of extensions or apps that are allowed to connect. If left empty or unspecified, no extensions or apps can connect."
          }
        },
        "matches": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "The URL patterns for web pages that are allowed to connect. This does not affect content scripts. If left empty or unspecified, no web pages can connect."
          }
        },
        "accepts_tls_channel_id": {
          "type": "boolean",
          "default": false,
          "description": "Indicates that the extension would like to make use of the TLS channel ID of the web page connecting to it. The web page must also opt to send the TLS channel ID to the extension via setting includeTlsChannelId to true in runtime.connect's connectInfo or runtime.sendMessage's options."
        }
      }
    },
    "file_browser_handlers": {
      "type": "array",
      "description": "You can use this API to enable users to upload files to your website.",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": [ "id", "default_title", "file_filters" ],
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "string",
            "description": "Used by event handling code to differentiate between multiple file handlers"
          },
          "default_title": {
            "type": "string",
            "description": "What the button will display."
          },
          "file_filters": {
            "type": "array",
            "description": "Filetypes to match.",
            "minItems": 1,
            "items": {
              "type": "string"
            }
          }
        }
      }
    },
    "homepage_url": {
      "$ref": "#/definitions/uri",
      "description": "The URL of the homepage for this extension."
    },
    "incognito": {
      "type": "string",
      "description": "Specify how this extension will behave if allowed to run in incognito mode.",
      "enum": [ "spanning", "split", "not_allowed" ],
      "default": "spanning"
    },

    "input_components": {
      "type": "array",
      "description": "Allows your extension to handle keystrokes, set the composition, and manage the candidate window.",
      "items": {
        "type": "object",
        "required": [ "name", "type", "id", "description", "language", "layouts" ],
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "language": {
            "type": "string"
          },
          "layouts": {
            "type": "array"
          }
        }
      }
    },
    "key": {
      "type": "string",
      "description": "This value can be used to control the unique ID of an extension, app, or theme when it is loaded during development."
    },
    "minimum_chrome_version": {
      "$ref": "#/definitions/version_string",
      "description": "The version of Chrome that your extension, app, or theme requires, if any."
    },
    "nacl_modules": {
      "type": "array",
      "description": "One or more mappings from MIME types to the Native Client module that handles each type.",
      "minItems": 1,
      "uniqueItems": true,
      "items": {
        "type": "object",
        "required": [ "path", "mime_type" ],
        "additionalProperties": false,
        "properties": {
          "path": {
            "$ref": "#/definitions/uri",
            "description": "The location of a Native Client manifest (a .nmf file) within the extension directory."
          },
          "mime_type": {
            "$ref": "#/definitions/mime_type",
            "description": "The MIME type for which the Native Client module will be registered as content handler."
          }
        }
      }
    },
    "oauth2": {
      "type": "object",
      "description": "Use the Chrome Identity API to authenticate users: the getAuthToken for users logged into their Google Account and the launchWebAuthFlow for users logged into a non-Google account.",
      "required": [ "client_id", "scopes" ],
      "additionalProperties": false,
      "properties": {
        "client_id": {
          "type": "string",
          "description": "You need to register your app in the Google APIs Console to get the client ID."
        },
        "scopes": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        }
      }
    },
    "offline_enabled": {
      "type": "boolean",
      "description": "Whether the app or extension is expected to work offline. When Chrome detects that it is offline, apps with this field set to true will be highlighted on the New Tab page."
    },
    "omnibox": {
      "type": "object",
      "description": "The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox.",
      "required": [ "keyword" ],
      "additionalProperties": false,
      "properties": {
        "keyword": {
          "type": "string",
          "description": "The keyword that will trigger your extension."
        }
      }
    },
    "optional_permissions": {
      "$ref": "#/definitions/permissions",
      "description": "Use the chrome.permissions API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary."
    },
    "options_page": {
      "$ref": "#/definitions/page",
      "description": "To allow users to customize the behavior of your extension, you may wish to provide an options page. If you do, a link to it will be provided from the extensions management page at chrome://extensions. Clicking the Options link opens a new tab pointing at your options page.",
      "default": "options.html"
    },
    "options_ui": {
      "type": "object",
      "description": "To allow users to customize the behavior of your extension, you may wish to provide an options page. If you do, an Options link will be shown on the extensions management page at chrome://extensions which opens a dialogue containing your options page.",
      "required": [ "page" ],
      "properties": {
        "page": {
          "type": "string",
          "description": "The path to your options page, relative to your extension's root."
        },
        "chrome_style": {
          "type": "boolean",
          "default": true,
          "description": "If true, a Chrome user agent stylesheet will be applied to your options page. The default value is false, but we recommend you enable it for a consistent UI with Chrome."
        },
        "open_in_tab": {
          "type": "boolean",
          "default": false,
          "description": "If true, your extension's options page will be opened in a new tab rather than embedded in chrome://extensions. The default is false, and we recommend that you don't change it. This is only useful to delay the inevitable deprecation of the old options UI! It will be removed soon, so try not to use it. It will break."
        }
      }
    },
    "permissions": {
      "$ref": "#/definitions/permissions",
      "description": "Permissions help to limit damage if your extension or app is compromised by malware. Some permissions are also displayed to users before installation, as detailed in Permission Warnings."
    },
    "requirements": {
      "type": "object",
      "description": "Technologies required by the app or extension. Hosting sites such as the Chrome Web Store may use this list to dissuade users from installing apps or extensions that will not work on their computer.",
      "additionalProperties": false,
      "properties": {
        "3D": {
          "type": "object",
          "description": "The '3D' requirement denotes GPU hardware acceleration.",
          "required": [ "features" ],
          "additionalProperties": false,
          "properties": {
            "features": {
              "type": "array",
              "description": "List of the 3D-related features your app requires.",
              "minItems": 1,
              "uniqueItems": true,
              "items": {
                "type": "string",
                "enum": [ "webgl" ]
              }
            }
          }
        },
        "plugins": {
          "type": "object",
          "description": "Indicates if an app or extension requires NPAPI to run. This requirement is enabled by default when the manifest includes the 'plugins' field.",
          "required": [ "npapi" ],
          "additionalProperties": false,
          "properties": {
            "npapi": {
              "type": "boolean",
              "default": true
            }
          }
        }
      }
    },
    "sandbox": {
      "type": "object",
      "description": "Defines an collection of app or extension pages that are to be served in a sandboxed unique origin, and optionally a Content Security Policy to use with them.",
      "required": [ "pages" ],
      "additionalProperties": false,
      "properties": {
        "pages": {
          "type": "array",
          "minItems": 1,
          "uniqueItems": true,
          "items": { "$ref": "#/definitions/page" }
        },
        "content_security_policy": {
          "$ref": "#/definitions/content_security_policy",
          "default": "sandbox allow-scripts allow-forms"
        }
      }
    },
    "short_name": {
      "type": "string",
      "description": "The short name is typically used where there is insufficient space to display the full name.",
      "maxLength": 12
    },
    "update_url": {
      "$ref": "#/definitions/uri",
      "description": "If you publish using the Chrome Developer Dashboard, ignore this field. If you host your own extension or app: URL to an update manifest XML file."
    },
    "tts_engine": {
      "type": "object",
      "description": "Register itself as a speech engine.",
      "required": [ "voices" ],
      "additionalProperties": false,
      "properties": {
        "voices": {
          "type": "array",
          "description": "Voices the extension can synthesize.",
          "minItems": 1,
          "uniqueItems": true,
          "items": {
            "type": "object",
            "required": [ "voice_name", "event_types" ],
            "additionalProperties": false,
            "properties": {
              "voice_name": {
                "type": "string",
                "description": "Identifies the name of the voice and the engine used."
              },
              "lang": {
                "type": "string",
                "description": "Almost always, a voice can synthesize speech in just a single language. When an engine supports more than one language, it can easily register a separate voice for each language."
              },
              "gender": {
                "type": "string",
                "description": "If your voice corresponds to a male or female voice, you can use this parameter to help clients choose the most appropriate voice for their application."
              },
              "event_types": {
                "type": "array",
                "description": "Events sent to update the client on the progress of speech synthesis.",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "description": "",
                  "enum": [ "start", "word", "sentence", "marker", "end", "error" ]
                }
              }
            }
          }
        }
      }
    },
    "version_name": {
      "type": "string",
      "description": "In addition to the version field, which is used for update purposes, version_name can be set to a descriptive version string and will be used for display purposes if present."
    },
    "chrome_settings_overrides": {},
    "content_pack": {},
    "current_locale": {},
    "import": {},
    "platforms": {},
    "signature": {},
    "spellcheck": {},
    "storage": {},
    "system_indicator": {}
  },
  "if": {
    "properties": {"manifest_version": {"const": 3}}
  },
  "then": {
    "properties": {
      "background": {
        "type": "object",
        "description": "The background page is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active.",
        "properties": {
          "service_worker": {
            "type": "string",
            "description": "The service worker js file."
          },
          "type": {
            "type": "string",
            "enum": ["module"]
          }
        },
        "dependencies": {
          "page": { "not": { "required": [ "scripts" ] } },
          "scripts": { "not": { "required": [ "page" ] } }
        }
      },
      "host_permissions": {
        "$ref": "#/definitions/permissions"
      },
      "action": {
        "description": "Used to control the toolbar button for your extension in Chrome's UI.",
        "$ref": "#/definitions/action_v3"
      },
      "content_security_policy": {
        "type": "object",
        "properties": {
          "extension_pages": {
            "description": "This policy covers pages in your extension, including html files and service workers.",
            "$ref": "#/definitions/content_security_policy"
          },
          "sandbox": {
            "description": "This policy covers any sandboxed extension pages that your extension uses.",
            "$ref": "#/definitions/content_security_policy"
          }
        }
      },
      "web_accessible_resources": {
        "type": "array",
        "description": "An array of objects that declare resource access rules. Each object maps an array of extension resources to an array of URLs and/or extension IDs that can access those resources.",
        "minItems": 1,
        "uniqueItems": true,
        "items": {
          "$ref": "#/definitions/web_resource"
        }
      }
    },
    "$comment": "browser_action and page_action are no longer present in v3",
    "dependencies": {
      "browser_action": { "not": { "required": [ "browser_action" ] } },
      "page_action": { "not": { "required": [ "page_action" ] } }
    }
  },
  "else": {
    "properties": {
      "background": {
        "type": "object",
        "description": "The background page is an HTML page that runs in the extension process. It exists for the lifetime of your extension, and only one instance of it at a time is active.",
        "properties": {
          "persistent": {
            "type": "boolean",
            "description": "When false, makes the background page an event page (loaded only when needed).",
            "default": true
          },
          "page": {
            "$ref": "#/definitions/page",
            "description": "Specify the HTML of the background page.",
            "default": "background.html"
          },
          "scripts": {
            "$ref": "#/definitions/scripts",
            "description": "A background page will be generated by the extension system that includes each of the files listed in the scripts property.",
            "default": [ "background.js" ]
          }
        },
        "dependencies": {
          "page": { "not": { "required": [ "scripts" ] } },
          "scripts": { "not": { "required": [ "page" ] } }
        }
      },
      "browser_action": {
        "$ref": "#/definitions/action_v2",
        "description": "Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup."
      },
      "page_action": {
        "$ref": "#/definitions/action_v2",
        "description": "Use the chrome.pageAction API to put icons inside the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages."
      },
      "content_security_policy": {
        "$ref": "#/definitions/content_security_policy"
      },
      "web_accessible_resources": {
        "type": "array",
        "description": "An array of strings specifying the paths (relative to the package root) of packaged resources that are expected to be usable in the context of a web page.",
        "minItems": 1,
        "uniqueItems": true,
        "items": {
          "$ref": "#/definitions/uri"
        }
      }
    },
    "dependencies": {
      "page_action": { "not": { "required": [ "browser_action" ] } },
      "browser_action": { "not": { "required": [ "page_action" ] } }
    }
  },
  "dependencies": {
    "content_scripts": { "not": { "required": [ "script_badge" ] } },
    "script_badge": { "not": { "required": [ "content_scripts" ] } }
  },
  "definitions": {
    "action_v2": {
      "type": "object",
      "properties": {
        "default_title": {
          "type": "string",
          "description": "Tooltip for the main toolbar icon."
        },
        "default_popup": {
          "$ref": "#/definitions/uri",
          "description": "The popup appears when the user clicks the icon."
        },
        "default_icon": {
          "anyOf": [
            {
              "type": "string",
              "description": "FIXME: String form is deprecated."
            },
            {
              "type": "object",
              "description": "Icon for the main toolbar.",
              "properties": {
                "19": { "$ref": "#/definitions/icon" },
                "38": { "$ref": "#/definitions/icon" }
              }
            }
          ]
        }
      },
      "dependencies": {
        "name": { "not": { "required": [ "name" ] } },
        "icons": { "not": { "required": [ "icons" ] } },
        "popup": { "not": { "required": [ "popup" ] } }
      }
    },
    "action_v3": {
      "type": "object",
      "properties": {
        "default_title": {
          "type": "string",
          "description": "Tooltip for the main toolbar icon."
        },
        "default_popup": {
          "$ref": "#/definitions/uri",
          "description": "The popup appears when the user clicks the icon."
        },
        "default_icon": {
          "type": "object",
          "properties": {
            "16": { "$ref": "#/definitions/icon" },
            "24": { "$ref": "#/definitions/icon" },
            "32": { "$ref": "#/definitions/icon" }
          }
        }
      },
      "dependencies": {
        "name": { "not": { "required": [ "name" ] } },
        "icons": { "not": { "required": [ "icons" ] } },
        "popup": { "not": { "required": [ "popup" ] } }
      }
    },
    "command": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "description": {
          "type": "string"
        },
        "suggested_key": {
          "type": "object",
          "additionalProperties": false,
          "patternProperties": {
            "^(default|mac|windows|linux|chromeos)$": {
              "type": "string",
              "pattern": "^(Ctrl|Command|MacCtrl|Alt|Option)\\+(Shift\\+)?[A-Z]"
            }
          }
        }
      }
    },

    "content_security_policy": {
      "type": "string",
      "description": "This introduces some fairly strict policies that will make extensions more secure by default, and provides you with the ability to create and enforce rules governing the types of content that can be loaded and executed by your extensions and applications.",
      "format": "content-security-policy",
      "default": "script-src 'self'; object-src 'self'"
    },
    "glob_pattern": {
      "type": "string",
      "format": "glob-pattern"
    },
    "icon": {
      "$ref": "#/definitions/uri"
    },
    "match_pattern": {
      "type": "string",
      "format": "match-pattern",
      "pattern": "^((\\*|http|https|file|ftp|chrome-extension):\\/\\/(\\*|\\*\\.[^\\/\\*]+|[^\\/\\*]+)?(\\/.*))|<all_urls>$"
    },
    "mime_type": {
      "type": "string",
      "format": "mime-type",
      "pattern": "^(?:application|audio|image|message|model|multipart|text|video)\\/[-+.\\w]+$"
    },
    "page": {
      "$ref": "#/definitions/uri"
    },
    "permissions": {
      "type": "array",
      "uniqueItems": true,
      "items": {
        "type": "string",
        "format": "permission"
      }
    },
    "scripts": {
      "type": "array",
      "minItems": 1,
      "uniqueItems": true,
      "items": {
        "$ref": "#/definitions/uri"
      }
    },
    "uri": {
      "type": "string"
    },
    "version_string": {
      "type": "string",
      "pattern": "^(?:\\d{1,5}\\.){0,3}\\d{1,5}$"
    },
    "web_resource": {
      "type": "object",
      "required": ["resources"],
      "properties": {
        "resources": {
          "type": "array",
          "description": "An array of resources to be exposed. Resources are specified as strings and may contain * for wildcard matches. For example, \"/images/*\" exposes everything in the extension's /images directory recursively while \"*.png\" exposes all PNG files.",
          "items": {
            "$ref": "#/definitions/glob_pattern"
          }
        },
        "matches": {
          "type": "array",
          "description": "A list of URL match patterns specifying which pages can access the resources. Only the origin is used to match URLs; subdomains patterns (*.google.com) and paths are ignored.",
          "items": {
            "$ref": "#/definitions/match_pattern"
          }
        },
        "extension_ids": {
          "type": "array",
          "description": "A list of extension IDs, specifying which extensions can access the resources.",
          "items": {
            "type": "string"
          }
        },
        "use_dynamic_url": {
          "type": "boolean",
          "description": "If true, only allow resources to be accessible through dynamic ID. The dynamic ID is generated per session. It's regenerated on browser restart or extension reload."
        }
      }
    }
  }
}
```

## License

Public domain
