import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// we dont want the whole thing, just its positioning utilities
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, { ripple: true, inputStyle: "outline" });

app.mount("#app");
