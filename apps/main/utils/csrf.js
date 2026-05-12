import crypto from 'crypto';

// Generate a CSRF token
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Validate CSRF token
export function validateCSRFToken(token, sessionToken) {
  if (!token || !sessionToken) {
    return false;
  }
  
  // Use crypto.timingSafeEqual to prevent timing attacks
  const tokenBuffer = Buffer.from(token, 'hex');
  const sessionBuffer = Buffer.from(sessionToken, 'hex');
  
  if (tokenBuffer.length !== sessionBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(tokenBuffer, sessionBuffer);
}

// Client-side CSRF token management
export const CSRFManager = {
  // Store CSRF token in sessionStorage
  setToken(token) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('csrf_token', token);
    }
  },
  
  // Get CSRF token from sessionStorage
  getToken() {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('csrf_token');
    }
    return null;
  },
  
  // Clear CSRF token
  clearToken() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('csrf_token');
    }
  },
  
  // Generate and store a new token
  generateAndStore() {
    const token = generateCSRFToken();
    this.setToken(token);
    return token;
  }
};