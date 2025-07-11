import { readFileSync } from 'fs';
import { join } from 'path';

// Server deployment configuration
export const serverConfig = {
  // Server mode configuration
  mode: process.env.MCP_MODE || 'http', // 'http' or 'stdio'
  
  // HTTP server configuration
  http: {
    port: parseInt(process.env.MCP_HTTP_PORT || '3000'),
    host: process.env.MCP_HTTP_HOST || '0.0.0.0', // Listen on all interfaces for server deployment
    
    // Authentication configuration
    auth: {
      enabled: true, // Always enabled for security
      type: process.env.MCP_AUTH_TYPE || 'bearer', // 'bearer' or 'api-key'
      token: process.env.MCP_API_TOKEN, // Required - no default
      
      // Additional auth options for future expansion
      jwt: {
        enabled: process.env.MCP_JWT_ENABLED === 'true',
        secret: process.env.MCP_JWT_SECRET,
        expiresIn: process.env.MCP_JWT_EXPIRES_IN || '24h'
      }
    },
    
    // CORS configuration for browser-based clients
    cors: {
      enabled: process.env.MCP_CORS_ENABLED === 'true',
      origins: process.env.MCP_CORS_ORIGINS ? process.env.MCP_CORS_ORIGINS.split(',') : ['*'],
      credentials: process.env.MCP_CORS_CREDENTIALS === 'true'
    },
    
    // SSL/TLS configuration
    ssl: {
      enabled: process.env.MCP_SSL_ENABLED === 'true',
      cert: process.env.MCP_SSL_CERT_PATH,
      key: process.env.MCP_SSL_KEY_PATH,
      ca: process.env.MCP_SSL_CA_PATH
    }
  },
  
  // WinCC OA specific configuration
  winccoa: {
    // Manager configuration
    manager: {
      num: parseInt(process.env.WINCCOA_MANAGER_NUM || '1'),
      name: process.env.WINCCOA_MANAGER_NAME || 'mcp_server',
      startOptions: process.env.WINCCOA_START_OPTIONS || ''
    },
    
    // Connection configuration
    connection: {
      timeout: parseInt(process.env.WINCCOA_CONNECT_TIMEOUT || '30000'), // 30 seconds
      retryAttempts: parseInt(process.env.WINCCOA_RETRY_ATTEMPTS || '3'),
      retryDelay: parseInt(process.env.WINCCOA_RETRY_DELAY || '5000') // 5 seconds
    }
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info', // 'debug', 'info', 'warn', 'error'
    file: process.env.LOG_FILE_PATH,
    maxSize: process.env.LOG_MAX_SIZE || '10m',
    maxFiles: parseInt(process.env.LOG_MAX_FILES || '5')
  },
  
  // Security configuration
  security: {
    // Rate limiting
    rateLimit: {
      enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
      max: parseInt(process.env.RATE_LIMIT_MAX || '100') // requests per window
    },
    
    // IP whitelist/blacklist
    ipFilter: {
      enabled: process.env.IP_FILTER_ENABLED === 'true',
      whitelist: process.env.IP_WHITELIST ? process.env.IP_WHITELIST.split(',') : [],
      blacklist: process.env.IP_BLACKLIST ? process.env.IP_BLACKLIST.split(',') : []
    }
  },
  
  // Performance configuration
  performance: {
    // Request timeout
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '300000'), // 5 minutes
    
    // Connection pooling
    connectionPool: {
      min: parseInt(process.env.POOL_MIN || '2'),
      max: parseInt(process.env.POOL_MAX || '10')
    }
  }
};


// Helper function to load SSL certificates
export function loadSSLConfig() {
  const config = serverConfig.http.ssl;
  if (!config.enabled) return null;
  
  try {
    return {
      cert: readFileSync(config.cert),
      key: readFileSync(config.key),
      ca: config.ca ? readFileSync(config.ca) : undefined
    };
  } catch (error) {
    console.error('Failed to load SSL certificates:', error);
    return null;
  }
}

// Validate configuration
export function validateConfig() {
  console.log('🔍 Starting configuration validation...');
  console.log('🔍 process.env.MCP_API_TOKEN:', process.env.MCP_API_TOKEN ? 'SET' : 'NOT SET');
  console.log('🔍 serverConfig.http.auth.token:', serverConfig.http.auth.token ? 'SET' : 'NOT SET');
  
  const errors = [];
  
  // Always require API token
  if (!serverConfig.http.auth.token) {
    console.log('❌ MCP_API_TOKEN validation failed');
    errors.push('MCP_API_TOKEN must be set in environment variables or .env file');
  } else {
    console.log('✅ MCP_API_TOKEN validation passed');
  }
  
  console.log('🔍 Validation completed with', errors.length, 'errors');
  return errors;
}