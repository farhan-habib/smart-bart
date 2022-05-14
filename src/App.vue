<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useStyleTag } from "@vueuse/core";
import { userThemeSettings } from "@/stores/theme.js";



userThemeSettings();

// if (false) {
// 	import("@/styles/themes/md-dark-indigo/theme.css");
// } else {
// 	import("@/styles/themes/md-light-indigo/theme.css");
// }

// import DarkModeTheme from "@/styles/themes/md-dark-indigo/theme.css?raw";
// import LightModeTheme from "@/styles/themes/md-light-indigo/theme.css?raw";

// // import DarkModeTheme from "@/styles/darkThemeTest.css?raw";
// // import LightModeTheme from "@/styles/lightThemeTest.css?raw";

// const user = userThemeSettings();
// const userStyle = useStyleTag(user.isDarkMode ? DarkModeTheme : LightModeTheme);

// user.$subscribe((mutation, state) => {
// 	userStyle.css.value = state.isDarkMode ? DarkModeTheme : LightModeTheme;
// 	userStyle.load();
// 	console.log(userStyle.css.value);
// });

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
