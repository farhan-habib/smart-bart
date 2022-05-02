import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
// import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css';
// import 'primevue/resources/themes/lara-dark-blue/theme.css';
// import 'primevue/resources/themes/md-dark-deeppurple/theme.css';
// import 'primevue/resources/themes/md-light-deeppurple/theme.css';
import 'primevue/resources/themes/md-dark-deeppurple/theme.css';

import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue, {ripple: true});
app.use(store)
app.use(router)
app.mount("#app");
