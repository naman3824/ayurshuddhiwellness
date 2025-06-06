/**
 * Converts a string to a URL-safe slug
 * @param {string} text - The text to convert to a slug
 * @returns {string} The URL-safe slug
 */
export function toUrlSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove whitespace from both ends
}