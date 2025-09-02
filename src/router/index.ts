import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/user";
import RegisterView from "@/views/RegisterView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: () => import("@/views/admin/AdminDashboard.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: () => import("@/views/admin/DashboardHome.vue"),
      },
      {
        path: "properties",
        name: "AdminProperties",
        component: () => import("@/views/admin/Properties.vue"),
      },
      {
        path: "appointments",
        name: "AdminAppointments",
        component: () => import("@/views/admin/Appointments.vue"),
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/admin/Users.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/user/UserDashboard.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const store = useUserStore();
  const user = store.user;

  // Require login
  if (to.meta.requiresAuth && !user) {
    return { name: "Login" };
  }

  // Require admin
  if (to.meta.requiresAdmin && user?.role !== "admin") {
    return { name: "Dashboard" };
  }
});

export default router;
