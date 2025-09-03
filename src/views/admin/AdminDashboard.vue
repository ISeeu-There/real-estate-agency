<template>
  <div class="flex h-screen bg-gray-50 text-gray-800">
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
          'bg-white shadow-md border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-20',
        ]"
      >
        <!-- Logo & Toggle -->
        <header
          class="flex items-center justify-between p-4 border-b border-gray-200"
        >
          <Transition name="fade">
            <h1 v-if="isSidebarOpen" class="font-bold text-lg tracking-wide">
              Admin Panel
            </h1>
          </Transition>
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-gray-100 transition"
            :title="isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
          >
            <XMarkIcon v-if="isSidebarOpen" class="h-5 w-5" />
            <Bars3Icon v-else class="h-5 w-5" />
          </button>
        </header>

        <!-- Navigation -->
        <nav class="flex-1 mt-2 px-2 space-y-1">
          <ul>
            <li v-for="item in menuItems" :key="item.name">
              <router-link
                :to="item.route"
                class="flex items-center p-3 rounded-lg group transition"
                :class="{
                  'bg-blue-100 text-blue-700 font-semibold shadow-sm':
                    isActiveRoute(item.route),
                  'hover:bg-gray-100 text-gray-700': !isActiveRoute(item.route),
                  'justify-center': !isSidebarOpen,
                }"
                :title="!isSidebarOpen ? item.name : ''"
              >
                <component :is="item.icon" class="h-5 w-5 flex-shrink-0" />
                <Transition name="slide-fade">
                  <span v-if="isSidebarOpen" class="ml-3">{{ item.name }}</span>
                </Transition>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- User Info & Logout -->
        <footer class="p-4 border-t border-gray-200">
          <div
            v-if="isSidebarOpen && store.user"
            class="mb-3 p-3 bg-gray-50 rounded-lg"
          >
            <p class="text-sm font-medium truncate">{{ store.user.email }}</p>
            <p class="text-xs text-gray-500">Administrator</p>
          </div>
          <button
            @click="handleLogout"
            class="flex items-center w-full p-3 rounded-lg group transition text-red-600 hover:bg-red-50"
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
        <header class="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-semibold">
                {{ getCurrentPageTitle() }}
              </h1>
              <p class="text-gray-500 text-sm mt-1">
                Welcome back, {{ store.user?.email?.split("@")[0] || "Admin" }}
              </p>
            </div>
            <p class="text-sm text-gray-500">{{ currentDateTime }}</p>
          </div>
        </header>

        <!-- Page Content -->
        <div class="flex-1 p-6 overflow-auto">
          <!-- Show child routes -->
          <router-view />

          <!-- Dashboard overview -->
          <div v-if="route.path === '/admin'">
            <!-- Stat Cards -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <div
                v-for="card in dashboardCards"
                :key="card.title"
                class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition hover:-translate-y-1"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">{{ card.title }}</p>
                    <p class="text-2xl font-bold mt-2">{{ card.value }}</p>
                    <p class="text-xs text-gray-400 mt-1">
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

            <!-- Recent Properties & Appointments -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Recent Properties -->
              <div
                class="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h2 class="text-lg font-semibold mb-4">Recent Properties</h2>
                <div class="space-y-3">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p class="font-medium">Property {{ i }}</p>
                      <p class="text-sm text-gray-500">Added 2 days ago</p>
                    </div>
                    <span
                      class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                      >Active</span
                    >
                  </div>
                </div>
                <router-link
                  to="/admin/properties"
                  class="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View all properties
                  <ChevronRightIcon class="h-4 w-4 ml-1" />
                </router-link>
              </div>

              <!-- Recent Appointments -->
              <div
                class="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h2 class="text-lg font-semibold mb-4">Recent Appointments</h2>
                <div class="space-y-3">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p class="font-medium">Meeting {{ i }}</p>
                      <p class="text-sm text-gray-500">Today at 2:00 PM</p>
                    </div>
                    <span
                      class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                      >Pending</span
                    >
                  </div>
                </div>
                <router-link
                  to="/admin/appointments"
                  class="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View all appointments
                  <ChevronRightIcon class="h-4 w-4 ml-1" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
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
  ChevronRightIcon,
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
];

// Counts
const totalProperties = ref(0);
const totalAppointments = ref(0);
const totalUsers = ref(0);

// Reactive dashboard cards
const dashboardCards = computed(() => [
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
  router.push({ name: "Login" });
};
const isActiveRoute = (path: string) =>
  route.path === path || route.path.startsWith(path + "/");
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
let unsubProperties: any, unsubAppointments: any, unsubUsers: any;

const setupRealtimeCounts = () => {
  unsubProperties = onSnapshot(
    collection(db, "properties"),
    (snap) => (totalProperties.value = snap.size)
  );
  unsubAppointments = onSnapshot(
    collection(db, "appointments"),
    (snap) => (totalAppointments.value = snap.size)
  );
  unsubUsers = onSnapshot(
    collection(db, "users"),
    (snap) => (totalUsers.value = snap.size)
  );
};

// Lifecycle
let interval: number;
const handleResize = () => {
  if (window.innerWidth < 768) isSidebarOpen.value = false;
};

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
  unsubProperties && unsubProperties();
  unsubAppointments && unsubAppointments();
  unsubUsers && unsubUsers();
});
</script>
