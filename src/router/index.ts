import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/user";

const routes: RouteRecordRaw[] = [
  { path: "/login", name: "Login", component: LoginView },
  {
    path: "/",
    name: "MainPage",
    component: () => import("@/views/user/MainPage.vue"),
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: () => import("@/views/admin/AdminDashboard.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "properties",
        name: "AdminProperties",
        component: () => import("@/views/admin/Properties.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: "appointments",
        name: "AdminAppointments",
        component: () => import("@/views/admin/Appointments.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to) => {
  const store = useUserStore();
  const user = store.user;

  // If route requires login and user is not logged in → redirect to login
  if (to.meta.requiresAuth && !user) {
    return { name: "Login" };
  }

  // If route requires admin and user is not admin → redirect to main page
  if (to.meta.requiresAdmin && user?.role !== "admin") {
    return { name: "MainPage" };
  }

  // Otherwise allow navigation
  return true;
});

export default router;
