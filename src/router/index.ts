import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
  },
  {
    path: "/tests",
    name: "test",
    component: () => import("@/pages/TestPage.vue"),
  },
  {
    path: "/tests/:id",
    name: "testSingle",
    component: () => import("@/pages/TestSingle.vue"),
  },
  {
    path:"/tester",
    name:"Tester",
    component:(()=> import("@/pages/TesterPage.vue"))
  }
];

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
