import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
// import Button from 'primevue/button';
// import Toast from 'primevue/toast';
// import ToastService from 'primevue/toastservice';


const app = createApp(App);
// app.use(PrimeVue)
app.use(PrimeVue);
// app.use(ToastService);

// app.component('InputText', InputText);
// app.component('Button', Button);
// app.component('Toast', Toast);


app.use(store)
.use(router)
.mount("#app");
