import { Auth, Database } from 'indjs';

/**
 * POST /api/auth/login
 * Login user with email and password
 */
export async function post({ body }) {
    try {
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return {
                error: 'Email and password are required',
                status: 400
            };
        }

        // Find user in database
        const users = await Database.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        if (!users || users.length === 0) {
            return {
                error: 'Invalid credentials',
                status: 401
            };
        }

        const user = users[0];

        // Verify password
        const isValid = await Auth.verifyPassword(password, user.password_hash);

        if (!isValid) {
            return {
                error: 'Invalid credentials',
                status: 401
            };
        }

        // Generate JWT token
        const token = Auth.generateToken({
            userId: user.id,
            email: user.email,
            role: user.role || 'user'
        });

        // Update last login
        await Database.query(
            'UPDATE users SET last_login = NOW() WHERE id = ?',
            [user.id]
        );

        return {
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role || 'user'
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            error: 'Internal server error',
            status: 500
        };
    }
}
