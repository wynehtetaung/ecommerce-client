import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 4000,
  //   open: false,
  //   host: true,
  //   // proxy: {
  //   //   "/api": {
  //   //     target: "http://localhost:3000",
  //   //     secure: false,
  //   //   },
  //   // },
  // },
});
