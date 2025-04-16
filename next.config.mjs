/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'development' ? undefined : 'export',
    sassOptions: {
        includePaths: ['./src'],
    },
};

export default nextConfig;
