/**
 * Standalone Supabase Test Utility
 * 
 * This utility can be used to test Supabase connection and basic operations
 * without affecting the UI. Perfect for debugging and verification.
 */

// Use dynamic import for ES modules in Node.js
let supabase, testConnection, getAllUsers

async function loadSupabaseClient() {
  try {
    const supabaseModule = await import('./supabaseClient.js')
    supabase = supabaseModule.supabase
    testConnection = supabaseModule.testConnection
    getAllUsers = supabaseModule.getAllUsers
    return true
  } catch (error) {
    console.error('Failed to load Supabase client:', error.message)
    return false
  }
}

/**
 * Run a comprehensive test of Supabase integration
 * @returns {Promise<Object>} Test results object
 */
async function runSupabaseTests() {
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0
    }
  }

  const addTest = (name, passed, message, data = null) => {
    results.tests.push({
      name,
      passed,
      message,
      data,
      timestamp: new Date().toISOString()
    })
    results.summary.total++
    if (passed) {
      results.summary.passed++
    } else {
      results.summary.failed++
    }
  }

  console.log('🧪 Starting Supabase Integration Tests...')
  console.log('=' .repeat(50))

  // Load Supabase client first
  const clientLoaded = await loadSupabaseClient()
  if (!clientLoaded) {
    addTest('Client Loading', false, '❌ Failed to load Supabase client')
    return results
  }
  addTest('Client Loading', true, '✅ Supabase client loaded successfully')

  try {
    // Test 1: Environment Variables
    console.log('1️⃣ Testing environment variables...')
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (hasUrl && hasKey) {
      addTest('Environment Variables', true, '✅ All required environment variables are set')
      console.log('   ✅ Environment variables configured correctly')
    } else {
      addTest('Environment Variables', false, '❌ Missing required environment variables')
      console.log('   ❌ Missing environment variables')
      console.log(`   - SUPABASE_URL: ${hasUrl ? '✅' : '❌'}`)
      console.log(`   - SUPABASE_ANON_KEY: ${hasKey ? '✅' : '❌'}`)
    }

    // Test 2: Connection Test
    console.log('\n2️⃣ Testing Supabase connection...')
    const isConnected = await testConnection()
    
    if (isConnected) {
      addTest('Connection', true, '✅ Successfully connected to Supabase')
      console.log('   ✅ Connection successful')
    } else {
      addTest('Connection', false, '❌ Failed to connect to Supabase')
      console.log('   ❌ Connection failed')
      return results
    }

    // Test 3: Database Query
    console.log('\n3️⃣ Testing database queries...')
    try {
      const users = await getAllUsers()
      addTest('Database Query', true, `✅ Successfully queried users table (${users.length} records)`, { userCount: users.length })
      console.log(`   ✅ Query successful - Found ${users.length} users`)
      
      if (users.length > 0) {
        console.log('   📋 Sample users:')
        users.slice(0, 3).forEach((user, index) => {
          console.log(`      ${index + 1}. ${user.name} (${user.email})`)
        })
      }
    } catch (error) {
      addTest('Database Query', false, `❌ Database query failed: ${error.message}`)
      console.log(`   ❌ Query failed: ${error.message}`)
    }

    // Test 4: Table Structure Verification
    console.log('\n4️⃣ Verifying table structures...')
    try {
      // Check if all required tables exist
      const { data: tables, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .in('table_name', ['users', 'payments', 'posts'])

      if (error) {
        addTest('Table Structure', false, `❌ Failed to verify tables: ${error.message}`)
        console.log(`   ❌ Table verification failed: ${error.message}`)
      } else {
        const tableNames = tables.map(t => t.table_name)
        const requiredTables = ['users', 'payments', 'posts']
        const missingTables = requiredTables.filter(table => !tableNames.includes(table))
        
        if (missingTables.length === 0) {
          addTest('Table Structure', true, '✅ All required tables exist', { tables: tableNames })
          console.log('   ✅ All required tables found:', tableNames.join(', '))
        } else {
          addTest('Table Structure', false, `❌ Missing tables: ${missingTables.join(', ')}`, { missing: missingTables })
          console.log(`   ❌ Missing tables: ${missingTables.join(', ')}`)
        }
      }
    } catch (error) {
      addTest('Table Structure', false, `❌ Table verification error: ${error.message}`)
      console.log(`   ❌ Table verification error: ${error.message}`)
    }

    // Test 5: Row Level Security Check
    console.log('\n5️⃣ Checking Row Level Security...')
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true })

      if (error) {
        if (error.message.includes('RLS')) {
          addTest('Row Level Security', false, '❌ RLS is blocking access - policies may need adjustment')
          console.log('   ⚠️ RLS is active but blocking access - check your policies')
        } else {
          addTest('Row Level Security', false, `❌ RLS check failed: ${error.message}`)
          console.log(`   ❌ RLS check failed: ${error.message}`)
        }
      } else {
        addTest('Row Level Security', true, '✅ RLS is properly configured')
        console.log('   ✅ RLS is working correctly')
      }
    } catch (error) {
      addTest('Row Level Security', false, `❌ RLS check error: ${error.message}`)
      console.log(`   ❌ RLS check error: ${error.message}`)
    }

  } catch (error) {
    addTest('General Error', false, `❌ Unexpected error: ${error.message}`)
    console.log(`\n❌ Unexpected error: ${error.message}`)
  }

  // Print Summary
  console.log('\n' + '=' .repeat(50))
  console.log('📊 TEST SUMMARY')
  console.log('=' .repeat(50))
  console.log(`Total Tests: ${results.summary.total}`)
  console.log(`Passed: ${results.summary.passed} ✅`)
  console.log(`Failed: ${results.summary.failed} ❌`)
  console.log(`Success Rate: ${((results.summary.passed / results.summary.total) * 100).toFixed(1)}%`)
  
  if (results.summary.failed === 0) {
    console.log('\n🎉 All tests passed! Supabase integration is working correctly.')
  } else {
    console.log('\n⚠️ Some tests failed. Please check the errors above.')
  }

  return results
}

/**
 * Quick connection test - returns boolean
 * @returns {Promise<boolean>} True if connected successfully
 */
async function quickConnectionTest() {
  try {
    const clientLoaded = await loadSupabaseClient()
    if (!clientLoaded) return false
    
    const isConnected = await testConnection()
    console.log(isConnected ? '✅ Supabase: Connected' : '❌ Supabase: Connection failed')
    return isConnected
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message)
    return false
  }
}

/**
 * Log current environment configuration (without exposing sensitive data)
 */
function logEnvironmentConfig() {
  console.log('🔧 Supabase Environment Configuration:')
  console.log(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}`)
  console.log(`   Anon Key: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`)
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log(`   Project: ${url.hostname.split('.')[0]}`)
  }
}

// CommonJS exports for Node.js
module.exports = {
  runSupabaseTests,
  quickConnectionTest,
  logEnvironmentConfig
}