// Admin authentication utilities
export const getAdminKey = () => {
  return process.env.ADMIN_KEY || 'fallback_key_change_in_production';
};

// For client-side usage where we need to pass the key via URL
export const getAdminKeyFromUrl = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('key');
  }
  return null;
};

// Generate admin URL with key
export const generateAdminUrl = (path, currentKey) => {
  if (!currentKey) {
    currentKey = getAdminKeyFromUrl();
  }
  return `${path}?key=${currentKey}`;
};

// Validate admin key
export const validateAdminKey = (providedKey) => {
  const validKey = getAdminKey();
  return providedKey === validKey;
};