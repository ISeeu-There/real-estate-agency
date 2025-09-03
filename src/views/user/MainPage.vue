<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8"
  >
    <!-- Header / Navbar -->
    <header
      class="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 shadow-sm rounded-xl max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
    >
      <h1 class="text-2xl font-semibold text-blue-600">DreamHomes</h1>
      <nav
        class="flex flex-wrap gap-4 sm:gap-6 text-gray-700 font-medium justify-center sm:justify-end"
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

    <div class="relative max-w-7xl mx-auto space-y-12 mt-6">
      <!-- Hero Section -->
      <section id="home" class="text-center space-y-4 px-2 sm:px-0">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 mx-auto"
        >
          <BuildingOfficeIcon class="h-8 w-8 text-blue-600" />
        </div>
        <h1 class="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Find Your Dream Home
        </h1>
        <p class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Browse the latest properties and discover your perfect place to live.
        </p>
      </section>

      <!-- About Section -->
      <section
        id="about"
        class="text-center py-12 sm:py-16 space-y-4 px-2 sm:px-0"
      >
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">About Us</h2>
        <p class="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
          DreamHomes helps you find the perfect home with the latest listings
          and personalized service.
        </p>
      </section>

      <!-- Services Section -->
      <section
        id="services"
        class="text-center py-12 sm:py-16 space-y-4 px-2 sm:px-0"
      >
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Nos Services
        </h2>
        <p class="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
          We provide property buying, selling, and rental services with
          top-notch support for all clients.
        </p>
      </section>

      <!-- Properties Grid -->
      <section class="space-y-8 sm:space-y-12 px-2 sm:px-0">
        <div class="text-center space-y-2">
          <h2 class="text-2xl sm:text-4xl font-bold text-gray-900">
            Available Properties
          </h2>
          <p class="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">
            Browse the latest properties posted by our admins and find your
            perfect match.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto">
          <div class="relative group">
            <MagnifyingGlassIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, location, or type..."
              class="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-xl shadow-lg border-0 bg-white focus:ring-4 focus:ring-blue-500/20 focus:shadow-md outline-none transition-all duration-300 placeholder:text-gray-400"
            />
          </div>
        </div>

        <!-- Properties Grid -->
        <div
          v-if="filteredProperties.length"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          <div
            v-for="property in filteredProperties"
            :key="property.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
          >
            <div class="relative overflow-hidden">
              <img
                :src="property.image"
                :alt="property.title"
                class="h-48 sm:h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span
                :class="getStatusBadgeClass(property.status)"
                class="absolute top-3 left-3 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full shadow-md backdrop-blur-sm"
              >
                {{ property.status }}
              </span>
            </div>
            <div class="p-4 sm:p-6 space-y-2 sm:space-y-4">
              <h3
                class="font-bold text-lg sm:text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors"
              >
                {{ property.title }}
              </h3>
              <div class="flex items-center text-gray-500 text-xs sm:text-sm">
                <svg
                  class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
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
              </div>
              <div class="flex items-center justify-between">
                <p class="text-blue-600 font-bold text-lg sm:text-2xl">
                  ${{ formatPrice(property.price) }}
                </p>
                <button
                  @click="viewProperty(property)"
                  class="px-4 sm:px-6 py-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-blue-700 hover:shadow-md transform hover:scale-105 transition-all duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No properties -->
        <div
          v-else
          class="text-center py-12 text-gray-500 text-sm sm:text-base"
        >
          No properties found.
        </div>
      </section>

      <!-- Contact Section -->
      <section
        id="contact"
        class="text-center py-12 sm:py-16 space-y-2 sm:space-y-4 px-2 sm:px-0"
      >
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Contact Us</h2>
        <p class="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Reach out via email at contact@dreamhomes.com or call us at +123 456
          7890.
        </p>
      </section>
    </div>

    <!-- Property Modal -->
    <div
      v-if="showModal && selectedProperty"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-2xl mx-auto overflow-auto max-h-[90vh] transform transition-all"
      >
        <div
          class="flex justify-between items-center px-4 sm:px-6 py-3 border-b"
        >
          <h2 class="text-lg sm:text-xl font-semibold text-gray-800">
            {{ selectedProperty.title }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <img
          :src="selectedProperty.image"
          :alt="selectedProperty.title"
          class="w-full h-48 sm:h-64 object-cover"
        />
        <div class="p-4 sm:p-6 space-y-2 sm:space-y-4">
          <p class="text-gray-600 text-sm sm:text-base">
            {{ selectedProperty.description }}
          </p>
          <div
            class="flex flex-col sm:flex-row justify-between text-gray-700 text-xs sm:text-sm gap-2 sm:gap-0"
          >
            <div>
              <strong>Location:</strong> {{ selectedProperty.location }}
            </div>
            <div><strong>Status:</strong> {{ selectedProperty.status }}</div>
          </div>
          <div
            class="flex flex-col sm:flex-row justify-between text-gray-700 text-xs sm:text-sm gap-2 sm:gap-0"
          >
            <div>
              <strong>Bedrooms:</strong> {{ selectedProperty.bedrooms }}
            </div>
            <div>
              <strong>Bathrooms:</strong> {{ selectedProperty.bathrooms }}
            </div>
          </div>
          <div class="text-lg sm:text-2xl font-bold text-blue-600">
            $ {{ formatPrice(selectedProperty.price) }}
          </div>
        </div>
        <div class="px-4 sm:px-6 py-3 border-t flex justify-end">
          <button
            @click="closeModal"
            class="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
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
