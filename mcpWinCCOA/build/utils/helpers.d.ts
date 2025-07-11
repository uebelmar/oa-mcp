/**
 * Create content array for MCP responses, filtering internal types if needed
 * @param {Array} arr - Array of type names
 * @param {boolean} withInternals - Whether to include internal types (starting with _)
 * @returns {Array} Content array for MCP response
 */
export function mkTypesContent(arr: any[], withInternals: boolean): any[];
/**
 * Recursively add full path and unit information to datapoint children
 * @param {Array} children - Array of child datapoint elements
 * @param {string} parentPath - Parent datapoint path
 * @param {Object} winccoa - WinCC OA manager instance
 */
export function addFullPathAndUnitToChildren(children: any[], parentPath: string, winccoa: Object): void;
/**
 * Create standardized error response for MCP tools
 * @param {string} message - Error message
 * @param {string} code - Error code (optional)
 * @returns {Object} MCP error response
 */
export function createErrorResponse(message: string, code?: string): Object;
/**
 * Create standardized success response for MCP tools
 * @param {any} result - Result data
 * @param {string} message - Optional success message
 * @returns {Object} MCP success response
 */
export function createSuccessResponse(result: any, message?: string): Object;
/**
 * Validate datapoint name format
 * @param {string} dpName - Datapoint name to validate
 * @returns {boolean} True if valid
 */
export function isValidDatapointName(dpName: string): boolean;
/**
 * Sanitize datapoint name for safe usage
 * @param {string} dpName - Datapoint name to sanitize
 * @returns {string} Sanitized datapoint name
 */
export function sanitizeDatapointName(dpName: string): string;
//# sourceMappingURL=helpers.d.ts.map