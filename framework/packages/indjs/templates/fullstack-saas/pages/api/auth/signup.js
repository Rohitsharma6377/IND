import { Auth, Database } from 'indjs';

/**
 * POST /api/auth/signup
 * Register a new user
 */
export async function post({ body }) {
    try {
        const { email, password, name } = body;

        // Validate input
        if (!email || !password || !name) {
            return {
                error: 'Email, password, and name are required',
                status: 400
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                error: 'Invalid email format',
                status: 400
            };
        }

        // Validate password strength
        if (password.length < 8) {
            return {
                error: 'Password must be at least 8 characters long',
                status: 400
            };
        }

        // Check if user already exists
        const existing = await Database.query(
            'SELECT id FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        if (existing && existing.length > 0) {
            return {
                error: 'User with this email already exists',
                status: 409
            };
        }

        // Hash password
        const passwordHash = await Auth.hashPassword(password);

        // Create user
        const result = await Database.query(
            'INSERT INTO users (email, password_hash, name, role, created_at) VALUES (?, ?, ?, ?, NOW())',
            [email, passwordHash, name, 'user']
        );

        const userId = result.insertId || result[0]?.id;

        // Generate JWT token
        const token = Auth.generateToken({
            userId,
            email,
            role: 'user'
        });

        return {
            success: true,
            token,
            user: {
                id: userId,
                email,
                name,
                role: 'user'
            }
        };
    } catch (error) {
        console.error('Signup error:', error);
        return {
            error: 'Internal server error',
            status: 500
        };
    }
}
