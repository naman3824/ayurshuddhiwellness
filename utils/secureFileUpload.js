// Secure file upload utilities
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/gif'
];

const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILENAME_LENGTH = 255;

// Magic number signatures for file type validation
const FILE_SIGNATURES = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/gif': [0x47, 0x49, 0x46],
  'image/webp': [0x52, 0x49, 0x46, 0x46] // RIFF header for WebP
};

/**
 * Validate file on client-side
 * @param {File} file - The file to validate
 * @returns {Object} - Validation result with success boolean and error message
 */
export const validateFileClient = (file) => {
  if (!file) {
    return { success: false, error: 'No file selected' };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB` };
  }

  // Check filename length
  if (file.name.length > MAX_FILENAME_LENGTH) {
    return { success: false, error: 'Filename is too long' };
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { success: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed' };
  }

  // Check file extension
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { success: false, error: 'Invalid file extension' };
  }

  // Check for suspicious filenames
  const suspiciousPatterns = [
    /\.php$/i,
    /\.asp$/i,
    /\.jsp$/i,
    /\.js$/i,
    /\.html$/i,
    /\.htm$/i,
    /\.exe$/i,
    /\.bat$/i,
    /\.cmd$/i,
    /\.scr$/i,
    /\.com$/i,
    /\.pif$/i,
    /\.vbs$/i,
    /\.jar$/i
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(file.name)) {
      return { success: false, error: 'Suspicious file extension detected' };
    }
  }

  return { success: true };
};

/**
 * Validate file signature (magic numbers) on client-side
 * @param {File} file - The file to validate
 * @returns {Promise<Object>} - Validation result with success boolean and error message
 */
export const validateFileSignature = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Check file signature based on MIME type
      const expectedSignature = FILE_SIGNATURES[file.type];
      if (!expectedSignature) {
        resolve({ success: false, error: 'Unsupported file type' });
        return;
      }

      // Compare first few bytes with expected signature
      for (let i = 0; i < expectedSignature.length; i++) {
        if (uint8Array[i] !== expectedSignature[i]) {
          resolve({ success: false, error: 'File signature does not match declared type' });
          return;
        }
      }

      resolve({ success: true });
    };

    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' });
    };

    // Read only the first 8 bytes for signature validation
    reader.readAsArrayBuffer(file.slice(0, 8));
  });
};

/**
 * Sanitize filename
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
export const sanitizeFilename = (filename) => {
  // Remove path separators and dangerous characters
  let sanitized = filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '');
  
  // Remove leading/trailing dots and spaces
  sanitized = sanitized.replace(/^[.\s]+|[.\s]+$/g, '');
  
  // Limit length
  if (sanitized.length > MAX_FILENAME_LENGTH) {
    const extension = sanitized.substring(sanitized.lastIndexOf('.'));
    const nameWithoutExt = sanitized.substring(0, sanitized.lastIndexOf('.'));
    sanitized = nameWithoutExt.substring(0, MAX_FILENAME_LENGTH - extension.length) + extension;
  }
  
  return sanitized || 'unnamed_file';
};

/**
 * Convert file to base64 with validation
 * @param {File} file - The file to convert
 * @returns {Promise<Object>} - Result with success boolean, data, and error message
 */
export const secureFileToBase64 = async (file) => {
  // Client-side validation
  const clientValidation = validateFileClient(file);
  if (!clientValidation.success) {
    return clientValidation;
  }

  // File signature validation
  const signatureValidation = await validateFileSignature(file);
  if (!signatureValidation.success) {
    return signatureValidation;
  }

  // Convert to base64
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve({ 
        success: true, 
        data: reader.result,
        filename: sanitizeFilename(file.name),
        size: file.size,
        type: file.type
      });
    };
    
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' });
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Server-side file validation (for API routes)
 * @param {string} base64Data - Base64 encoded file data
 * @param {string} filename - Original filename
 * @param {string} mimeType - Declared MIME type
 * @returns {Object} - Validation result
 */
export const validateFileServer = (base64Data, filename, mimeType) => {
  if (!base64Data || !filename || !mimeType) {
    return { success: false, error: 'Missing file data' };
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
    return { success: false, error: 'Invalid file type' };
  }

  // Check file extension
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return { success: false, error: 'Invalid file extension' };
  }

  // Decode base64 and check size
  try {
    const base64WithoutPrefix = base64Data.split(',')[1] || base64Data;
    const binaryString = atob(base64WithoutPrefix);
    const fileSize = binaryString.length;
    
    if (fileSize > MAX_FILE_SIZE) {
      return { success: false, error: 'File too large' };
    }

    // Basic signature validation for common formats
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const expectedSignature = FILE_SIGNATURES[mimeType];
    if (expectedSignature) {
      for (let i = 0; i < expectedSignature.length && i < bytes.length; i++) {
        if (bytes[i] !== expectedSignature[i]) {
          return { success: false, error: 'File signature mismatch' };
        }
      }
    }

    return { success: true, size: fileSize };
  } catch (error) {
    return { success: false, error: 'Invalid base64 data' };
  }
};