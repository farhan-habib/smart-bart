<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useStyleTag } from "@vueuse/core";
import { userThemeSettings } from "@/stores/theme.js";
import { GlobalBartClient } from "./stores/bartStore";


//initializing some global properties with pinia
GlobalBartClient();
userThemeSettings();


// import darkMode from "@/styles/"
let navBarItems = ref([
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  {
    label: "About",
    icon: "pi pi-fw pi-info-circle",
    to: "/about",
  },
  {
    label: "Settings",
    icon: "pi pi-fw pi-cog",
    to: "/settings",
  },
  {
	label: "Find Route",
	icon: "pi pi-fw pi-map",
	to: "/findRoute",
  },
  {
    seperator: true,
  },
  {
    label: "Dev",
    icon: "pi pi-fw pi-code",
    to: "/dev",
  },
  {
    label: "DevTwo",
    icon: "pi pi-fw pi-code",
    to: "/dev2",
  },
]);
</script>

<template>
  <header>
    <TabMenu v-model:model="navBarItems" />
  </header>
  <RouterView />
</template>

<style lang="scss">
@import "@/styles/base.scss";
</style>
