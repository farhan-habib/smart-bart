import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import devViewTwo from "../views/devViewTwo.vue";
const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
	{
		path: "/dev",
		name: "Dev Page",
		component: () =>
				import(/* webpackChunkName: "dev" */ "../views/DevView.vue"),
	},
	{
		path: "/dev2",
		name: "Dev Page 2",
		component: () =>
				import(/* webpackChunkName: "dev" */ "../views/devViewTwo.vue"),
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
