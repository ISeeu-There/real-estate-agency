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
  {
    path: "/:catchAll(.*)",
    redirect: "/",
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

  if (to.meta.requiresAuth && !user) return { name: "Login" };
  if (to.meta.requiresAdmin && user?.role !== "admin")
    return { name: "MainPage" };

  return true;
});

export default router;
