const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

let supabase;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey)
} else {
    console.warn("⚠️ Warning: Supabase Environment variables are missing")
    // Creating a dummy client strictly for preventing application crash without env config
    supabase = {
        from: () => ({
            select: () => ({ eq: () => ({ single: () => ({ data: null, error: 'Database not connected' }) }) }),
            insert: () => ({ select: () => ({ single: () => ({ data: null, error: 'Database not connected' }) }), error: 'Database not connected' }),
            update: () => ({ eq: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: 'Database not connected' }) }) }) }) })
        })
    };
}

module.exports = {
    supabase
}