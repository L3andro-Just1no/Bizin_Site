// Simple admin authentication
// In production, use proper authentication with hashed passwords!

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // In production, this should be hashed!
};

export function checkAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function generateAdminToken(): string {
  // Simple token - in production use JWT or proper sessions
  return Buffer.from(`${ADMIN_CREDENTIALS.username}:${Date.now()}`).toString('base64');
}

export function isValidAdminToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded.startsWith(ADMIN_CREDENTIALS.username);
  } catch {
    return false;
  }
}

