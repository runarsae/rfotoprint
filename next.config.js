module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/hjem',
                permanent: true
            }
        ];
    }
};
