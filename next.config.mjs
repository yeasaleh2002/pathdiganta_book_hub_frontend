import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      'next-intl/config': './src/i18n/request.ts'
    }
  },
  webpack: (config) => {
    const __dirname = new URL('.', import.meta.url).pathname.substring(1);
    config.resolve.alias['next-intl/config'] = path.resolve(__dirname, './src/i18n/request.ts');
    return config;
  }
};

export default nextConfig;
