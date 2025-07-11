/**
 * Load all field configuration files from the fields directory
 * @returns {Promise<Object>} Object with field names as keys and content as values
 */
export function loadFieldConfigurations(): Promise<Object>;
/**
 * Get the active field from environment variable
 * @returns {string} The active field name, defaults to 'default'
 */
export function getActiveField(): string;
/**
 * Load project-specific configuration if available
 * @returns {Promise<Object|null>} Project configuration or null
 */
export function loadProjectConfiguration(): Promise<Object | null>;
/**
 * Merge project and field instructions
 * @param {string} fieldContent - Field instructions content
 * @param {string} projectContent - Project instructions content
 * @returns {string} Merged content with project taking precedence
 */
export function mergeInstructions(fieldContent: string, projectContent: string): string;
/**
 * Merge project and field rules
 * @param {Object} fieldRules - Parsed field rules
 * @param {Object} projectRules - Parsed project rules
 * @returns {Object} Merged rules with project taking precedence
 */
export function mergeRules(fieldRules: Object, projectRules: Object): Object;
/**
 * Parse field instructions to extract rules
 * @param {string} content - The markdown content
 * @returns {Object} Parsed rules and patterns
 */
export function parseFieldRules(content: string): Object;
//# sourceMappingURL=field_loader.d.ts.map