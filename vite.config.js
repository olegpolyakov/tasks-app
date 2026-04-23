import sharedConfig from '@olegpolyakov/frontend/config/vite.config.js';
import { defineConfig } from 'vite';

export default defineConfig(sharedConfig({
    basePath: import.meta.dirname
}));