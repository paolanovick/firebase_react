/* eslint-disable no-unused-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// vite.config.js
export default {
  server: {
    proxy: {
      '/admin/xml': 'https://travel-tool.net',
    },
  },
};
