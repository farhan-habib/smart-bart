<template>
	<Dropdown :options="userPref.modes" v-model="userPref.mode" placeholder="Select theme" />
</template>

<script setup>
import { userThemeSettings } from "@/stores/theme.js";
let userPref = userThemeSettings();


</script>
