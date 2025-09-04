<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full">
    <!-- Header -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300',
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent backdrop-blur-md',
      ]"
    >
      <!-- Logo -->
      <h1
        :class="[
          'text-2xl font-bold transition-colors duration-300',
          isScrolled ? 'text-blue-600' : 'text-blue',
        ]"
      >
        DreamHomes
      </h1>

      <!-- Nav -->
      <nav
        class="flex gap-6 font-medium transition-colors duration-300"
        :class="isScrolled ? 'text-gray-700' : 'text-blue'"
      >
        <button
          @click="scrollToSection('home')"
          class="hover:text-blue-600 transition"
        >
          Home
        </button>
        <button
          @click="scrollToSection('about')"
          class="hover:text-blue-600 transition"
        >
          About
        </button>
        <button
          @click="scrollToSection('services')"
          class="hover:text-blue-600 transition"
        >
          Nos Services
        </button>
        <button
          @click="scrollToSection('contact')"
          class="hover:text-blue-600 transition"
        >
          Contact
        </button>
      </nav>
    </header>

    <!-- Main wrapper with padding-top to avoid overlap -->
    <div class="pt-[80px] space-y-20">
      <!-- Hero Section -->
      <section
        id="home"
        class="relative flex flex-col items-center justify-center text-center text-white px-4"
      >
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Content -->
        <div class="relative z-10 space-y-6">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mx-auto"
          >
            <BuildingOfficeIcon class="h-8 w-8 text-blue-600" />
          </div>
          <h1 class="text-4xl sm:text-6xl font-bold">Find Your Dream Home</h1>
          <p class="max-w-2xl mx-auto text-lg sm:text-xl text-gray-100">
            Browse the latest properties and discover your perfect place to
            live.
          </p>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="text-center px-4 space-y-4">
        <About />
      </section>

      <!-- Services Section -->
      <section id="services" class="text-center px-4 space-y-4">
        <Services />
      </section>

      <!-- Properties Grid -->
      <section class="px-4 space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">
            Available Properties
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-lg">
            Browse the latest properties posted by our admins and find your
            perfect match.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto">
          <div class="relative">
            <MagnifyingGlassIcon
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, location, or type..."
              class="w-full pl-10 pr-4 py-3 rounded-xl shadow-lg bg-white text-gray-700 focus:ring-4 focus:ring-blue-500/20 focus:shadow-md transition"
            />
          </div>
        </div>

        <!-- Properties List -->
        <div
          v-if="filteredProperties.length"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <div
            v-for="property in filteredProperties"
            :key="property.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
          >
            <div class="relative overflow-hidden">
              <img
                :src="property.image"
                :alt="property.title"
                class="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span
                :class="getStatusBadgeClass(property.status)"
                class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm"
              >
                {{ property.status }}
              </span>
            </div>
            <div class="p-6 space-y-4">
              <h3
                class="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition"
              >
                {{ property.title }}
              </h3>
              <p class="flex items-center text-gray-500 text-sm">
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ property.location }}
              </p>
              <div class="flex justify-between items-center">
                <p class="text-blue-600 font-bold text-2xl">
                  ${{ formatPrice(property.price) }}
                </p>
                <button
                  @click="viewProperty(property)"
                  class="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md transform hover:scale-105 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 text-gray-500">
          No properties found.
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="text-center px-4 space-y-4">
        <Contact />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { db } from "@/plugins/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { onSnapshot } from "firebase/firestore";
import About from "./sections/About.vue";
import Services from "./sections/Services.vue";
import Contact from "./sections/Contact.vue";

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  description: string;
  createdAt: string;
}

const properties = ref<Property[]>([]);
const searchQuery = ref("");
const selectedProperty = ref<Property | null>(null);
const showModal = ref(false);
const isScrolled = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 50;
  });
});

const setupRealtimeProperties = () => {
  const propertiesCollection = collection(db, "properties");

  onSnapshot(propertiesCollection, (snapshot) => {
    properties.value = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "No title",
        type: data.type || "unknown",
        price: data.price || 0,
        location: data.location || "Unknown",
        status: (data.status || "inactive").toLowerCase(),
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        image: data.image || "https://via.placeholder.com/400x300",
        description: data.description || "",
        createdAt: data.createdAt || "",
      };
    });
  });
};

const filteredProperties = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return properties.value.filter(
    (property) =>
      property.title.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query)
  );
});

const formatPrice = (price: number) => new Intl.NumberFormat().format(price);

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    active: "bg-green-500/90 text-white border border-green-400",
    pending: "bg-yellow-500/90 text-white border border-yellow-400",
    sold: "bg-blue-500/90 text-white border border-blue-400",
    inactive: "bg-gray-500/90 text-white border border-gray-400",
  };
  return classes[status] || "bg-gray-500/90 text-white border border-gray-400";
};

const viewProperty = (property: Property) => {
  selectedProperty.value = property;
  showModal.value = true;
};

const closeModal = () => {
  selectedProperty.value = null;
  showModal.value = false;
};

// Scroll to section
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  setupRealtimeProperties();
});
</script>
<style scoped>
#home {
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  background-position: center;
  height: 600px;
}
</style>
<style scoped>
section {
  scroll-margin-top: 80px;
}
</style>
