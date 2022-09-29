const SUPABASE_URL = 'https://vskovpzojfjdkywumkvp.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZza292cHpvamZqZGt5d3Vta3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTQ3ODIsImV4cCI6MTk3OTg3MDc4Mn0.euIamkEcpDRax278j2hv-LHL5UpS57qJYvVW1zeQ_GI';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
