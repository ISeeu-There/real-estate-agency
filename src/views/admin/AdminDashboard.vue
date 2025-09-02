<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    </div>

    <!-- Main Layout -->
    <div v-else class="flex w-full h-full">
      <!-- Sidebar -->
      <aside
        :class="[
          'bg-white shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200 flex flex-col relative z-40',
          isSidebarOpen ? 'w-64' : 'w-16',
        ]"
      >
        <!-- Logo & Toggle -->
        <header
          class="flex items-center justify-between p-4 border-b border-gray-200 min-h-[65px]"
        >
          <Transition name="fade">
            <h1 v-if="isSidebarOpen" class="font-bold text-xl text-gray-800">
              Admin Panel
            </h1>
          </Transition>
          <button
            @click="toggleSidebar"
            class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            :title="isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
          >
            <XMarkIcon v-if="isSidebarOpen" class="h-5 w-5" />
            <Bars3Icon v-else class="h-5 w-5" />
          </button>
        </header>

        <!-- Navigation Links -->
        <nav class="flex-1 mt-2 px-2">
          <ul class="space-y-1">
            <li v-for="item in menuItems" :key="item.name">
              <router-link
                :to="item.route"
                class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
                :class="{
                  'bg-blue-50 text-blue-700 border-r-2 border-blue-500':
                    isActiveRoute(item.route),
                  'justify-center': !isSidebarOpen,
                }"
                :title="!isSidebarOpen ? item.name : ''"
              >
                <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
                <Transition name="slide-fade">
                  <span v-if="isSidebarOpen" class="ml-3 font-medium">{{
                    item.name
                  }}</span>
                </Transition>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- User Info & Logout -->
        <footer class="p-4 border-t border-gray-200">
          <div
            v-if="isSidebarOpen && store.user"
            class="mb-3 p-2 bg-gray-50 rounded-lg"
          >
            <p class="text-sm text-gray-600 truncate">{{ store.user.email }}</p>
            <p class="text-xs text-gray-500">Administrator</p>
          </div>
          <button
            @click="handleLogout"
            class="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            :class="{ 'justify-center': !isSidebarOpen }"
            :title="!isSidebarOpen ? 'Logout' : ''"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5" />
            <Transition name="slide-fade">
              <span v-if="isSidebarOpen" class="ml-3 font-medium">Logout</span>
            </Transition>
          </button>
        </footer>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Bar -->
        <header class="bg-white border-b border-gray-200 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                {{ getCurrentPageTitle() }}
              </h1>
              <p class="text-gray-600 text-sm mt-1">
                Welcome back, {{ store.user?.email?.split("@")[0] || "Admin" }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">{{ currentDateTime }}</p>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <div class="flex-1 p-6 overflow-auto">
          <router-view v-if="route.path !== '/admin'" />

          <!-- Dashboard Overview -->
          <div v-if="route.path === '/admin'">
            <div
              class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8"
            >
              <div
                v-for="card in dashboardCards"
                :key="card.title"
                class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-600 text-sm font-medium">
                      {{ card.title }}
                    </p>
                    <p class="text-2xl font-bold text-gray-900 mt-2">
                      {{ card.value }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ card.subtitle }}
                    </p>
                  </div>
                  <div :class="['p-3 rounded-lg', card.iconBg]">
                    <component
                      :is="card.icon"
                      :class="['h-6 w-6', card.iconColor]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartPieIcon,
} from "@heroicons/vue/24/outline";
import { db } from "@/plugins/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useLoading } from "@/components/useLoading";

// Store and router
const store = useUserStore();
const router = useRouter();
const route = useRoute();
const { loading, startLoading, stopLoading } = useLoading("admin-dashboard");

// State
const isSidebarOpen = ref(true);
const currentDateTime = ref("");

// Menu
const menuItems = [
  { name: "Dashboard", route: "/admin", icon: HomeIcon },
  { name: "Properties", route: "/admin/properties", icon: ShoppingBagIcon },
  { name: "Appointments", route: "/admin/appointments", icon: ChartBarIcon },
  { name: "Users", route: "/admin/users", icon: UsersIcon },
];

// Dashboard cards
const totalProperties = ref(0);
const totalAppointments = ref(0);
const totalUsers = ref(0);

const dashboardCards = ref([
  {
    title: "Total Properties",
    value: totalProperties.value,
    subtitle: "+12% from last month",
    icon: BuildingOfficeIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Appointments",
    value: totalAppointments.value,
    subtitle: "This week",
    icon: CalendarDaysIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Active Users",
    value: totalUsers.value,
    subtitle: "+5% from last week",
    icon: UserGroupIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Revenue",
    value: 0,
    subtitle: "+18% from last month",
    icon: ChartPieIcon,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
]);

// Functions
const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);
const handleLogout = async () => {
  await store.logout();
  router.push("/login");
};
const isActiveRoute = (path: string) =>
  path === "/admin" ? route.path === "/admin" : route.path.startsWith(path);
const getCurrentPageTitle = () =>
  menuItems.find((item) => isActiveRoute(item.route))?.name || "Dashboard";
const updateDateTime = () => {
  currentDateTime.value = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Firestore snapshots
const setupRealtimeCounts = () => {
  // Properties
  onSnapshot(collection(db, "properties"), (snapshot) => {
    totalProperties.value = snapshot.size;
    const card = dashboardCards.value.find(
      (c) => c.title === "Total Properties"
    );
    if (card) card.value = totalProperties.value;
  });

  // Appointments
  onSnapshot(collection(db, "appointments"), (snapshot) => {
    totalAppointments.value = snapshot.size;
    const card = dashboardCards.value.find((c) => c.title === "Appointments");
    if (card) card.value = totalAppointments.value;
  });

  // Users
  onSnapshot(collection(db, "users"), (snapshot) => {
    totalUsers.value = snapshot.size;
    const card = dashboardCards.value.find((c) => c.title === "Active Users");
    if (card) card.value = totalUsers.value;
  });
};

// Lifecycle
let interval: number;
onMounted(() => {
  startLoading();
  setTimeout(() => {
    updateDateTime();
    interval = setInterval(updateDateTime, 60000);
    setupRealtimeCounts();
    stopLoading();
  }, 800);

  window.addEventListener("resize", handleResize);
  handleResize();
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  window.removeEventListener("resize", handleResize);
});

// Responsive
const handleResize = () => {
  if (window.innerWidth < 768) isSidebarOpen.value = false;
};
</script>
