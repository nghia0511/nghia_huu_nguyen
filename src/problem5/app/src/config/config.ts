import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  MONGODB_URI: string,
  DATABASE_NAME: string,
  BUILD_MODE: string,
}

const config: Config = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  BUILD_MODE: process.env.BUILD_MODE || 'dev',
};

export default config;
