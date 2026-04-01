import sharedConfig from '@olegpoliakov/shared/client/vite.config.js';
import { defineConfig } from 'vite';

export default defineConfig(sharedConfig({
    basePath: import.meta.dirname
}));