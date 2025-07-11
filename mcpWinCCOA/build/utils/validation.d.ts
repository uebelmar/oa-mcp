/**
 * Validate datapoint access against field and project rules
 * @param {string} dpeName - Datapoint element name
 * @param {Object} context - Server context with field configs and project config
 * @returns {Object} Validation result with allowed, warning, and error information
 */
export function validateDatapointAccess(dpeName: string, context: Object): Object;
/**
 * Validate datapoint against specific rules
 * @param {string} dpeName - Datapoint element name
 * @param {Object} rules - Validation rules object
 * @param {string} fieldName - Field name for error messages
 * @returns {Object} Validation result
 */
export function validateAgainstRules(dpeName: string, rules: Object, fieldName: string): Object;
/**
 * Check if a datapoint name matches a pattern (supports wildcards)
 * @param {string} dpeName - Datapoint element name
 * @param {string} pattern - Pattern to match (supports * wildcards)
 * @returns {boolean} True if matches
 */
export function matchesPattern(dpeName: string, pattern: string): boolean;
/**
 * Get validation summary for display
 * @param {Object} validation - Validation result
 * @returns {string} Human-readable validation summary
 */
export function getValidationSummary(validation: Object): string;
/**
 * Check if a datapoint operation should be logged based on project configuration
 * @param {string} dpeName - Datapoint element name
 * @param {Object} context - Server context
 * @returns {boolean} True if should be logged
 */
export function shouldLogOperation(dpeName: string, context: Object): boolean;
//# sourceMappingURL=validation.d.ts.map