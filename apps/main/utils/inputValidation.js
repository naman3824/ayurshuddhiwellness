// Server-side input validation and sanitization utilities

// HTML sanitization - remove potentially dangerous HTML tags and attributes
export function sanitizeHTML(input) {
  if (typeof input !== 'string') return '';
  
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous HTML tags
  const dangerousTags = [
    'script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 
    'textarea', 'select', 'option', 'link', 'meta', 'style', 'base'
  ];
  
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });
  
  // Remove dangerous attributes
  const dangerousAttrs = [
    'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 
    'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect', 'onkeydown', 
    'onkeyup', 'onkeypress', 'javascript:', 'vbscript:', 'data:'
  ];
  
  dangerousAttrs.forEach(attr => {
    const regex = new RegExp(`\\s*${attr}\\s*=\\s*[^\\s>]*`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });
  
  return sanitized.trim();
}

// Text sanitization - escape HTML entities
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Validate and sanitize title
export function validateTitle(title) {
  if (!title || typeof title !== 'string') {
    return { success: false, error: 'Title is required and must be a string' };
  }
  
  const sanitized = sanitizeText(title);
  
  if (sanitized.length < 1) {
    return { success: false, error: 'Title cannot be empty' };
  }
  
  if (sanitized.length > 200) {
    return { success: false, error: 'Title must be less than 200 characters' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i, /javascript:/i, /vbscript:/i, /data:/i, /on\w+=/i
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(title))) {
    return { success: false, error: 'Title contains invalid content' };
  }
  
  return { success: true, sanitized };
}

// Validate and sanitize content
export function validateContent(content) {
  if (!content || typeof content !== 'string') {
    return { success: false, error: 'Content is required and must be a string' };
  }
  
  const sanitized = sanitizeHTML(content);
  
  if (sanitized.length < 1) {
    return { success: false, error: 'Content cannot be empty' };
  }
  
  if (sanitized.length > 50000) {
    return { success: false, error: 'Content must be less than 50,000 characters' };
  }
  
  return { success: true, sanitized };
}

// NOTE: Admin key validation removed — authentication is now handled by Firebase session cookies

// Validate message type
export function validateMessageType(type) {
  const validTypes = ['text', 'image'];
  
  if (!type || typeof type !== 'string') {
    return { success: false, error: 'Message type is required' };
  }
  
  if (!validTypes.includes(type)) {
    return { success: false, error: 'Invalid message type' };
  }
  
  return { success: true, sanitized: type };
}

// Validate URL/ID parameters
export function validateId(id) {
  if (!id || typeof id !== 'string') {
    return { success: false, error: 'ID is required' };
  }
  
  // Check if it's a valid UUID or numeric ID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const numericRegex = /^\d+$/;
  
  if (!uuidRegex.test(id) && !numericRegex.test(id)) {
    return { success: false, error: 'Invalid ID format' };
  }
  
  return { success: true, sanitized: id };
}

// Comprehensive validation for blog posts
export function validateBlogPost(data) {
  const { title, content } = data;
  
  const titleValidation = validateTitle(title);
  if (!titleValidation.success) {
    return titleValidation;
  }
  
  const contentValidation = validateContent(content);
  if (!contentValidation.success) {
    return contentValidation;
  }
  
  return {
    success: true,
    sanitized: {
      title: titleValidation.sanitized,
      content: contentValidation.sanitized,
    }
  };
}

// Comprehensive validation for admin messages
export function validateAdminMessage(data) {
  const { title, content, message_type } = data;
  
  const typeValidation = validateMessageType(message_type);
  if (!typeValidation.success) {
    return typeValidation;
  }
  
  // Title is optional for messages
  let sanitizedTitle = null;
  if (title) {
    const titleValidation = validateTitle(title);
    if (!titleValidation.success) {
      return titleValidation;
    }
    sanitizedTitle = titleValidation.sanitized;
  }
  
  // Content validation depends on message type
  let sanitizedContent = null;
  if (message_type === 'text') {
    if (!content) {
      return { success: false, error: 'Content is required for text messages' };
    }
    const contentValidation = validateContent(content);
    if (!contentValidation.success) {
      return contentValidation;
    }
    sanitizedContent = contentValidation.sanitized;
  }
  
  return {
    success: true,
    sanitized: {
      title: sanitizedTitle,
      content: sanitizedContent,
      message_type: typeValidation.sanitized,
    }
  };
}