export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "@mdi/font/css/materialdesignicons.min.css"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NODE_ENV === "production" ? "https://artemprokudanov.com/api" : "http://localhost:5000",
    },
  },
});
