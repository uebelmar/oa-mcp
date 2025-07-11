/**
 * Dynamically load and register all tools from the tools directory
 * @param {McpServer} server - The MCP server instance
 * @param {Object} context - Shared context with winccoa, configs, etc.
 */
export function loadAllTools(server: McpServer, context: Object): Promise<void>;
/**
 * Load tools from a specific category (for testing)
 * @param {McpServer} server - The MCP server instance
 * @param {Object} context - Shared context
 * @param {string} category - Tool category to load
 */
export function loadToolCategory(server: McpServer, context: Object, category: string): Promise<void>;
//# sourceMappingURL=tool_loader.d.ts.map