// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows any hostname
                pathname: '/**', // Allows any path
            },
        ],
    },
};
