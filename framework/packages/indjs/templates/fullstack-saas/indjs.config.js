export default {
    // Experimental features
    experimental: {
        devBundler: 'vite',      // Use Vite for faster HMR
        streaming: true,          // Enable streaming SSR
    },

    // Authentication
    auth: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        providers: ['google', 'github'],
        session: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }
    },

    // Database
    database: {
        type: 'postgresql', // or 'mongodb', 'mysql', 'sqlite'
        url: process.env.DATABASE_URL,
        migrations: './migrations',
        seeds: './seeds'
    },

    // Caching
    caching: {
        type: process.env.REDIS_URL ? 'redis' : 'lru',
        url: process.env.REDIS_URL,
        ttl: 3600, // 1 hour
        secret: process.env.REVALIDATE_SECRET
    },

    // Security
    security: {
        helmet: true,
        cors: {
            origin: process.env.APP_URL || 'http://localhost:3000',
            credentials: true
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }
    },

    // Observability
    observability: {
        enabled: true,
        metrics: true,
        tracing: false
    }
};
