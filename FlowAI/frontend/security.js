/**
 * @fileoverview Security Middleware - Provides input sanitization and XSS prevention
 * required for Enterprise Level Security Compliance.
 */

/**
 * Sanitizes raw string input to prevent XSS and generic SQL Injection via the SOS forms.
 * @param {string} input - The raw user input string.
 * @returns {string} The sanitized, safe string.
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // 1. Remove script tags and standard HTML nodes natively
    let sanitized = input.replace(/<[^>]*>?/gm, ''); 
    
    // 2. Escape special characters commonly used in injection payloads
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        "`": '&#x60;',
        "=": '&#x3D;'
    };
    const reg = /[&<>"'`=\/]/ig;
    sanitized = sanitized.replace(reg, (match) => (map[match]));
    
    return sanitized.trim();
}

/**
 * Simple middleware wrapper to validate API payload constructions
 * @param {Object} payload - The raw data payload
 * @returns {Object} Extracted & Validated payload safe for API transmit
 */
export function validatePayload(payload) {
    const safePayload = {};
    for (const [key, value] of Object.entries(payload)) {
        safePayload[key] = sanitizeInput(String(value));
    }
    return safePayload;
}
