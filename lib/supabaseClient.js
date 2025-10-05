import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions for common database operations

/**
 * Test the Supabase connection
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase connection test failed:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful')
    return true
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message)
    return false
  }
}

/**
 * Get all users from the database
 * @returns {Promise<Array>} Array of users or empty array if error
 */
export async function getAllUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching users:', error.message)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getAllUsers:', error.message)
    return []
  }
}

/**
 * Create a new user
 * @param {Object} userData - User data object
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email
 * @param {string} userData.phone - User's phone number
 * @returns {Promise<Object|null>} Created user object or null if error
 */
export async function createUser(userData) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user:', error.message)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in createUser:', error.message)
    return null
  }
}

/**
 * Create a new payment record
 * @param {Object} paymentData - Payment data object
 * @param {string} paymentData.user_id - User ID
 * @param {number} paymentData.amount - Payment amount
 * @param {string} paymentData.receipt_url - Receipt URL
 * @returns {Promise<Object|null>} Created payment object or null if error
 */
export async function createPayment(paymentData) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([{
        user_id: paymentData.user_id,
        amount: paymentData.amount,
        receipt_url: paymentData.receipt_url,
        payment_date: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating payment:', error.message)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in createPayment:', error.message)
    return null
  }
}

/**
 * Create a new post
 * @param {Object} postData - Post data object
 * @param {string} postData.title - Post title
 * @param {string} postData.content - Post content
 * @param {string} postData.image_url - Post image URL
 * @returns {Promise<Object|null>} Created post object or null if error
 */
export async function createPost(postData) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title: postData.title,
        content: postData.content,
        image_url: postData.image_url,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating post:', error.message)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in createPost:', error.message)
    return null
  }
}

/**
 * Get all posts from the database
 * @returns {Promise<Array>} Array of posts or empty array if error
 */
export async function getAllPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching posts:', error.message)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getAllPosts:', error.message)
    return []
  }
}

/**
 * Create a new contact message in the database
 * @param {Object} messageData - Contact message data
 * @param {string} messageData.name - Sender's name
 * @param {string} messageData.email - Sender's email
 * @param {string} messageData.message - Message content
 * @returns {Promise<Object|null>} Created contact message object or null if error
 */
export async function createContactMessage(messageData) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: messageData.name,
        email: messageData.email,
        message: messageData.message,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating contact message:', error.message)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in createContactMessage:', error.message)
    return null
  }
}

/**
 * Get all contact messages from the database
 * @returns {Promise<Array>} Array of contact messages or empty array if error
 */
export async function getAllContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching contact messages:', error.message)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getAllContactMessages:', error.message)
    return []
  }
}

export default supabase