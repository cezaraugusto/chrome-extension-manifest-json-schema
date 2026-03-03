/**
 * TypeScript type definitions for chrome-extension-manifest-json-schema
 */

export interface ChromeExtensionManifestSchema {
  /**
   * JSON Schema object for Chrome extension manifest V2
   */
  manifestV2Schema: object;
  
  /**
   * JSON Schema object for Chrome extension manifest V3
   */
  manifestV3Schema: object;
}

declare const schemas: ChromeExtensionManifestSchema;

export default schemas;
