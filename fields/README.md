# Field Configuration System

## Overview
This directory contains field-specific configurations for different industrial domains where WinCC OA is deployed. Each field has its own Markdown file with instructions, rules, and best practices.

## How It Works

1. **Field Selection**: Set the `WINCCOA_FIELD` environment variable to select a field:
   ```bash
   export WINCCOA_FIELD=oil      # For Oil & Gas systems
   export WINCCOA_FIELD=transport # For Transportation systems
   # If not set, defaults to 'default'
   ```

2. **Automatic Loading**: The MCP server automatically loads all `.md` files from this directory at startup.

3. **AI Integration**: The AI assistant can access field instructions through MCP resources:
   - `field://list` - List all available fields
   - `field://active` - Current active field
   - `field://active-instructions` - Instructions for active field
   - `field://instructions/{fieldname}` - Instructions for specific field

## Adding New Fields

To add a new field configuration:

1. Create a new `.md` file in this directory (e.g., `chemical.md`)
2. Follow the structure of existing files
3. Include these sections:
   - Overview
   - Safety Requirements
   - Datapoint Naming Conventions (important for automatic rule parsing)
   - Operational Rules
   - Best Practices

## Datapoint Pattern Rules

The system automatically parses datapoint patterns from the "Datapoint Naming Conventions" section:

- **Forbidden patterns**: Marked with "READ ONLY", "STRICTLY", etc.
- **Warning patterns**: Marked with "requires validation", "coordinate", etc.
- **Allowed patterns**: Marked with "AI manipulation allowed", "designated for AI", etc.

Example:
```markdown
## Datapoint Naming Conventions
- `*_SAFETY_*`: Safety systems - READ ONLY
- `*_PROD_*`: Production systems - requires validation
- `*_AI_Assistant`: Designated for AI manipulation
```

## Field Configurations

### Currently Available:
- **oil.md**: Oil & Gas industry configuration
- **transport.md**: Transportation systems configuration
- **default.md**: Default configuration (used when no field is selected)

### Planned:
- **chemical.md**: Chemical processing plants
- **water.md**: Water treatment facilities
- **power.md**: Power generation and distribution
- **building.md**: Building automation systems

## Testing

To test a field configuration:
1. Set the environment variable: `export WINCCOA_FIELD=oil`
2. Start the MCP server
3. Check console output for: `Active field: oil`
4. Use an MCP client to read `field://active-instructions`

## Best Practices

1. Keep instructions clear and concise
2. Use consistent pattern naming conventions
3. Always include safety warnings prominently
4. Provide specific examples where helpful
5. Update instructions based on field experience

## Maintenance

- Review field configurations quarterly
- Update based on incident reports
- Add new patterns as systems evolve
- Archive obsolete configurations