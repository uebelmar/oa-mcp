# WinCC OA MCP Server - AI Integration for Industrial Automation

This Model Context Protocol (MCP) server provides a secure interface between AI assistants and WinCC OA SCADA systems, enabling intelligent automation and monitoring capabilities for industrial environments.

## Overview

The WinCC OA MCP Server bridges the gap between modern AI technologies and industrial control systems, allowing AI assistants to:

✅ **Interact with WinCC OA systems** through secure, controlled interfaces  
✅ **Leverage industry-specific configurations** tailored for Oil & Gas, Transportation, and other sectors  

### Practical Use Cases

**Ask your AI:**
- "Show me all temperature values in the plant"
- "Which pumps are currently running?"
- "Set the setpoint for pump P-101 to 50%"
- "Create a production report for today"

**The AI automatically respects:**
- Plant-specific restrictions

## Installation 

### Step 1: Install Server

```bash
# In your WinCC OA project directory
cd <OA_ProjPath>/javascript
mkdir mcpServer
cd mcpServer

# Install package (automatic extraction)
npm install @etm/winccoa-mcp-server
```

### Step 2: Install WinCCOA-Manager

Replace the path with your installation path
```
npm install file:C:/Siemens/Automation/WinCC_OA/3.20/javascript/winccoa-manager
```

### Step 3: Configure Settings

Edit the `.env` file:

```bash
nano .env
```

Required settings:
```env
# Generate security token with: openssl rand -hex 32
MCP_API_TOKEN=your-secure-token-here

# Server settings
MCP_HTTP_PORT=3000
MCP_HTTP_HOST=0.0.0.0

# Choose your industry
WINCCOA_FIELD=oil        # For Oil & Gas
# WINCCOA_FIELD=transport # For Transportation systems
# WINCCOA_FIELD=default   # For other industries
```

### Step 4: Configure WinCC OA Manager

Add a JavaScript Manager in WinCC OA:
- **Manager Type:** JavaScript Manager
- **Script Path:** `mcpServer/index_http.js`

## Connect AI Client

### Configure Claude Desktop

Open configuration file:
- **Windows:** `%APPDATA%/Claude/claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Add entry:
```json
{
  "mcpServers": {
    "winccoa": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:3000/mcp",
        "--header",
        "Authorization: Bearer ${MCP_API_TOKEN}"
      ],
      "env": {
        "MCP_API_TOKEN": "your-token-from-env-file"
      }
    }
  }
}
```


## Security for Your Plant


### Define Your Own Rules

Create plant-specific rules in a Markdown file:



Configure in `.env`:
```env
WINCCOA_PROJECT_INSTRUCTIONS=./config/my-plant-rules.md
```

## Industry Field Templates

The MCP Server comes with pre-configured templates for different industries. These templates contain ready-to-use safety rules, operational limits, and best practices specific to each industry.

### What are Field Templates?

Field templates are pre-built configurations that:
jj     ,,,,,,,,,,,,,,,,,,,,,- **Set operational limits** - Temperature ranges, pressure limits, flow rates
- **Include validation rules** - What needs double-checking before changes
- **Provide AI guidance** - Industry-specific knowledge for smarter assistance

### Available Templates

#### Oil & Gas (`oil`)
**Pre-configured for refineries and petrochemical plants:**
- Forbidden patterns: `*_SAFETY_*`, `*_ESD_*`, `*_PROD_*` (production systems)
- Operational limits: Flow 0-1000 m³/h, Pressure max 100 bar, Temperature -20°C to +80°C
- Recipe management rules for batch processes
- Special validation for pressure vessels and reactors
- AI guidance for production optimization

#### Transportation (`transport`)
**Pre-configured for traffic and railway systems:**
- Forbidden patterns: `*_EMSTOP_*`, `*_SIGNAL_*`, `*_TRACK_*` (critical infrastructure)
- Traffic light sequencing rules (no green-green conflicts)
- Railway interlocking logic
- Emergency brake system protection
- AI guidance for traffic flow optimization

#### Default (`default`)
**General template for other industries:**
- Basic safety patterns
- Standard WinCC OA protections
- Suitable for testing and development
- Can be customized for any industry

### Using a Template

Simply set the field in your `.env` file:
```env
# For Oil & Gas plants
WINCCOA_FIELD=oil

# For Transportation systems
WINCCOA_FIELD=transport

# For other industries (customize with your own rules)
WINCCOA_FIELD=default
```

### Template + Custom Rules

You can combine templates with your own rules:
1. Choose a base template (e.g., `oil`)
2. Add your plant-specific rules via `WINCCOA_PROJECT_INSTRUCTIONS`
3. Your rules override template rules where they conflict

Example:
```env
# Use Oil & Gas template as base
WINCCOA_FIELD=oil

# Add your specific rules on top
WINCCOA_PROJECT_INSTRUCTIONS=./config/my-refinery-rules.md
```
## Known restrictions

### Transport Layer Security

The current implementation does not support encrypted connections to remote MCP servers. For remote connections, the client must be configured with the `--allow-http` flag to explicitly acknowledge unencrypted communication.

**Remote Connection Configuration:**

```json
{
  "command": "npx",
  "args": [
    "mcp-remote",
    "http://192.168.0.41:3000/mcp",
    "--header",
    "Authorization: Bearer ${MCP_API_TOKEN}",
    "--allow-http"
  ],
  "env": {
    "MCP_API_TOKEN": "your-token-from-env-file"
  }
}
```

**Security Recommendation:** For production environments, consider implementing a reverse proxy with TLS termination or restricting connections to localhost only.

### Authorization

Currently, the JavaScript Manager operates with root privileges within the WinCC OA environment. Future releases will implement user-based authentication using API tokens to provide granular access control and enhanced security compliance.
## Support

- **Repository:** https://github.com/winccoa/winccoa-ae-js-mcpserver
- **Report issues:** GitHub Issues
- **WinCC OA Documentation:** https://www.winccoa.com/product-information/documentation.html

## License

ISC - See LICENSE.md for details.