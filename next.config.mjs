/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    sassOptions: {
        includePaths: ['./src'],
    },
};

export default nextConfig;
