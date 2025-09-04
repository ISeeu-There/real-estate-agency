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
        <header
          class="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between"
        >
          <div class="flex items-center gap-4">
            <h1 class="text-2xl font-semibold">{{ getCurrentPageTitle() }}</h1>
            <p class="text-gray-500 text-sm mt-1">
              Welcome back, {{ store.user?.email?.split("@")[0] || "Admin" }}
            </p>
          </div>
          <div class="flex items-center gap-4">
            <p class="text-sm text-gray-500">{{ currentDateTime }}</p>

            <!-- Notification Bell -->
            <div class="relative">
              <button
                @click="showNotificationsDropdown = !showNotificationsDropdown"
                class="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <BellIcon class="h-6 w-6 text-gray-600" />
                <span
                  v-if="unreadMessages > 0"
                  class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold badge-pulse"
                >
                  {{ unreadMessages }}
                </span>
              </button>

              <!-- Dropdown -->
              <transition name="slide-fade">
                <div
                  v-if="showNotificationsDropdown"
                  class="absolute right-0 mt-2 w-96 max-h-80 overflow-auto bg-white shadow-lg rounded-xl border border-gray-200 z-50"
                >
                  <p
                    v-if="notifications.length === 0"
                    class="text-gray-500 text-sm p-4"
                  >
                    No messages
                  </p>
                  <div v-else>
                    <div
                      v-for="note in notifications"
                      :key="note.id"
                      class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <p class="font-semibold text-gray-900">
                        {{ note.name }}- {{ note.phone }}
                      </p>
                      <p>{{ note.email }}</p>
                      <p class="text-gray-600 text-sm truncate">
                        {{ note.message }}
                      </p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </header>

        <!-- Notifications -->

        <div class="fixed top-4 right-4 space-y-2 z-50">
          <!-- Modal -->
          <div
            v-if="selectedNotification"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <div class="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h2 class="text-lg font-semibold">
                {{ selectedNotification.name }}
              </h2>
              <p class="mt-2">{{ selectedNotification.message }}</p>
              <button
                @click="selectedNotification = null"
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <!-- Page Content -->
        <div class="flex-1 p-6 overflow-auto">
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
  ChartBarIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartPieIcon,
  ChevronRightIcon,
  BellIcon,
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

// Dashboard cards
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

// Notification type
interface Notification {
  id: string;
  name: string;
  message: string;
  phone: number;
  email: string;
}

// Notifications
const notifications = ref<Notification[]>([]);
const unreadMessages = ref(0);
let unsubContactMessages: any;

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

// Firestore listeners
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

// Realtime notifications
// Add this ref for dropdown visibility
const showNotificationsDropdown = ref(false);

// Optional: close dropdown when clicked outside
const closeDropdown = (event: MouseEvent) => {
  const dropdown = document.querySelector("#notifications-dropdown");
  if (dropdown && !dropdown.contains(event.target as Node)) {
    showNotificationsDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

const selectedNotification = ref<Notification | null>(null);
const goToNotification = (note: Notification) => {
  selectedNotification.value = note;
};

const setupRealtimeNotifications = () => {
  const contactCollection = collection(db, "contactMessages");

  unsubContactMessages = onSnapshot(contactCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();
        const newNotification: Notification = {
          id: change.doc.id,
          name: data.name,
          message: data.message,
          phone: data.phone,
          email: data.email,
        };

        // Add to notifications array (do NOT remove after 5s)
        notifications.value.push(newNotification);

        // Update unread count
        unreadMessages.value++;
      }
    });
  });
};

// Handle sidebar for small screens
const handleResize = () => {
  if (window.innerWidth < 768) isSidebarOpen.value = false;
};

let interval: number;

// Lifecycle
onMounted(() => {
  startLoading();
  setupRealtimeCounts();
  setupRealtimeNotifications();
  updateDateTime();
  interval = setInterval(updateDateTime, 60000);

  window.addEventListener("resize", handleResize);
  handleResize();

  setTimeout(stopLoading, 800);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  window.removeEventListener("resize", handleResize);

  unsubProperties && unsubProperties();
  unsubAppointments && unsubAppointments();
  unsubUsers && unsubUsers();
  unsubContactMessages && unsubContactMessages();
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Bell badge pulse animation */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
.badge-pulse {
  animation: pulse 0.5s ease;
}
</style>
