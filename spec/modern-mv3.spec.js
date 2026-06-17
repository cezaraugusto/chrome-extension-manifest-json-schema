// Regression coverage for modern MV3 fields, validated with Ajv so the
// schema's if/then/else (manifest_version === 3) branch is actually
// exercised. The legacy jsonschema runner does not evaluate draft-07
// conditionals, so these would silently pass without real validation.
const Ajv = require('ajv')

const manifestV3Schema = require('../manifest/manifest.schema.v3.json')

const ajv = new Ajv({strict: false, allowUnionTypes: true})
const validate = ajv.compile(manifestV3Schema)
const isValid = (manifest) => validate(manifest)

const base = {manifest_version: 3, name: 'Test', version: '1.0.0'}

describe('Modern MV3 manifest fields', () => {
  it('accepts a complete modern MV3 manifest', () => {
    expect(
      isValid({
        ...base,
        action: {default_title: 'x', default_popup: 'popup.html'},
        background: {service_worker: 'sw.js', type: 'module'},
        host_permissions: ['https://*/*'],
        optional_host_permissions: ['*://example.com/*'],
        permissions: ['storage', 'scripting', 'userScripts', 'sidePanel'],
        content_scripts: [
          {
            matches: ['<all_urls>'],
            js: ['cs.js'],
            world: 'MAIN',
            match_origin_as_fallback: true
          }
        ],
        web_accessible_resources: [
          {resources: ['img/*'], matches: ['https://*/*'], use_dynamic_url: true}
        ],
        content_security_policy: {
          extension_pages: "script-src 'self'; object-src 'self'"
        },
        declarative_net_request: {
          rule_resources: [{id: 'ruleset_1', enabled: true, path: 'rules.json'}]
        },
        side_panel: {default_path: 'panel.html'},
        cross_origin_embedder_policy: {value: 'require-corp'},
        cross_origin_opener_policy: {value: 'same-origin'},
        export: {allowlist: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']}
      })
    ).toBeTrue()
  })

  it('accepts content_scripts with world ISOLATED/MAIN', () => {
    expect(
      isValid({...base, content_scripts: [{matches: ['<all_urls>'], world: 'ISOLATED'}]})
    ).toBeTrue()
    expect(
      isValid({...base, content_scripts: [{matches: ['<all_urls>'], world: 'MAIN'}]})
    ).toBeTrue()
  })

  it('accepts the userScripts permission', () => {
    expect(isValid({...base, permissions: ['userScripts']})).toBeTrue()
  })

  it('rejects an unknown content_scripts property', () => {
    expect(
      isValid({...base, content_scripts: [{matches: ['<all_urls>'], bogus: true}]})
    ).toBeFalse()
  })

  it('rejects a non-boolean match_origin_as_fallback', () => {
    expect(
      isValid({
        ...base,
        content_scripts: [{matches: ['<all_urls>'], match_origin_as_fallback: 'yes'}]
      })
    ).toBeFalse()
  })

  it('rejects a declarative_net_request ruleset missing path', () => {
    expect(
      isValid({...base, declarative_net_request: {rule_resources: [{id: 'a', enabled: true}]}})
    ).toBeFalse()
  })

  it('rejects an invalid world value', () => {
    expect(
      isValid({...base, content_scripts: [{matches: ['<all_urls>'], world: 'SANDBOX'}]})
    ).toBeFalse()
  })

  it('rejects a manifest missing required name', () => {
    expect(isValid({manifest_version: 3, version: '1.0.0'})).toBeFalse()
  })
})
