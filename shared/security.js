export class SecurityManager {
    constructor() {
        this.STORAGE_KEY = 'denwin_secure_store_v1';
        this.PIN_RATE_LIMIT_KEY = 'denwin_pin_attempts';
        this.USED_PINS_KEY = 'denwin_used_pins';
        this.SALT = 'dnw_slt_992_';
    }

    static setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict; Secure";
    }

    static getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    setItem(key, value) {
        try {
            const stringValue = JSON.stringify(value);
            const encoded = btoa(this.SALT + stringValue);
            localStorage.setItem(this.STORAGE_KEY + "_" + key, encoded);
        } catch (e) {
            console.error("Storage failed", e);
        }
    }

    getItem(key) {
        try {
            const encoded = localStorage.getItem(this.STORAGE_KEY + "_" + key);
            if (!encoded) return null;
            
            const decoded = atob(encoded);
            const original = decoded.replace(this.SALT, '');
            return JSON.parse(original);
        } catch (e) {
            return null;
        }
    }

    async hashPin(pin) {
        const msgBuffer = new TextEncoder().encode(pin);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    checkRateLimit() {
        const now = Date.now();
        const data = this.getItem(this.PIN_RATE_LIMIT_KEY) || { attempts: 0, lastAttempt: 0, lockUntil: 0 };
        
        if (now < data.lockUntil) {
            return { allowed: false, waitTime: Math.ceil((data.lockUntil - now) / 1000) };
        }

        if (now - data.lastAttempt > 15 * 60 * 1000) {
            data.attempts = 0;
            data.lockUntil = 0;
        }

        if (data.attempts >= 5) {
            data.lockUntil = now + 10 * 60 * 1000;
            this.setItem(this.PIN_RATE_LIMIT_KEY, data);
            return { allowed: false, waitTime: 600 };
        }

        return { allowed: true };
    }

    recordAttempt() {
        const data = this.getItem(this.PIN_RATE_LIMIT_KEY) || { attempts: 0, lastAttempt: 0, lockUntil: 0 };
        data.attempts++;
        data.lastAttempt = Date.now();
        this.setItem(this.PIN_RATE_LIMIT_KEY, data);
    }

    async verifyPin(inputPin, validHashes) {
        const limit = this.checkRateLimit();
        if (!limit.allowed) {
            return { success: false, error: `Too many attempts. Wait ${limit.waitTime}s.` };
        }

        this.recordAttempt();

        const hashed = await this.hashPin(inputPin);

        if (!validHashes.includes(hashed)) {
            return { success: false, error: "Invalid PIN." };
        }

        const usedConfig = this.getItem(this.USED_PINS_KEY) || [];
        if (usedConfig.includes(hashed)) {
            return { success: false, error: "This PIN has already been used." };
        }
        
        usedConfig.push(hashed);
        this.setItem(this.USED_PINS_KEY, usedConfig);

        return { success: true };
    }
}
