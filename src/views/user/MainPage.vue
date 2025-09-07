<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 w-full relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <!-- Header -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-between items-center transition-all duration-500',
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20'
          : 'bg-white/10 backdrop-blur-md border-b border-white/10',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
        >
          <BuildingOfficeIcon class="h-6 w-6 text-white" />
        </div>
        <h1
          :class="[
            'text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300',
          ]"
        >
          DreamHomes
        </h1>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8 font-medium">
        <butto
          class="relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
          ><a href="/login">Login</a></butto
        >
        <button
          @click="scrollToSection('home')"
          :class="[
            'relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105',
            isScrolled
              ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              : 'text-blue-900 hover:text-blue-200 hover:bg-white/10',
          ]"
        >
          Home
          <div
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"
          ></div>
        </button>
        <button
          @click="scrollToSection('about')"
          :class="[
            'relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105',
            isScrolled
              ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              : 'text-blue-900 hover:text-blue-200 hover:bg-white/10',
          ]"
        >
          About
        </button>
        <button
          @click="scrollToSection('services')"
          :class="[
            'relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105',
            isScrolled
              ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              : 'text-blue-900 hover:text-blue-200 hover:bg-white/10',
          ]"
        >
          Services
        </button>
        <button
          @click="scrollToSection('contact')"
          class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Contact
        </button>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden p-2 rounded-lg transition-colors duration-300"
        :class="
          isScrolled
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-white hover:bg-white/10'
        "
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </header>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="fixed inset-0 z-40 md:hidden"
      @click="closeMobileMenu"
    >
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        class="fixed top-0 right-0 w-64 h-full bg-white/95 backdrop-blur-lg shadow-2xl p-6 transform transition-transform duration-300"
      >
        <div class="flex justify-end mb-8">
          <button
            @click="closeMobileMenu"
            class="p-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav class="space-y-4">
          <button
            @click="
              scrollToSection('home');
              closeMobileMenu();
            "
            class="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            Home
          </button>
          <button
            @click="
              scrollToSection('about');
              closeMobileMenu();
            "
            class="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            About
          </button>
          <button
            @click="
              scrollToSection('services');
              closeMobileMenu();
            "
            class="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            Services
          </button>
          <button
            @click="
              scrollToSection('contact');
              closeMobileMenu();
            "
            class="block w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Contact
          </button>
        </nav>
      </div>
    </div>

    <!-- Main wrapper with padding-top to avoid overlap -->
    <div class="pt-[80px] space-y-32 relative z-10">
      <!-- Hero Section -->
      <section
        id="home"
        class="relative flex flex-col items-center justify-center text-center text-white px-4 py-20 sm:py-32"
      >
        <!-- Enhanced Dark overlay with gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        ></div>

        <!-- Content -->
        <div class="relative z-10 space-y-8 max-w-5xl mx-auto">
          <div class="animate-bounce-slow">
            <div
              class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mx-auto shadow-2xl"
            >
              <BuildingOfficeIcon class="h-10 w-10 text-white" />
            </div>
          </div>

          <h1
            class="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            <span
              class="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            >
              Find Your
            </span>
            <span
              class="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2"
            >
              Dream Home
            </span>
          </h1>

          <p
            class="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-gray-100 font-light leading-relaxed"
          >
            Browse the latest properties and discover your perfect place to live
            with our premium real estate services.
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <button
              @click="scrollToSection('services')"
              class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <span class="flex items-center space-x-2">
                <span>Explore Properties</span>
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
            </button>
            <button
              @click="scrollToSection('contact')"
              class="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>

        <!-- Floating elements -->
        <div
          class="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"
        ></div>
        <div
          class="absolute bottom-20 right-10 w-16 h-16 bg-blue-400/20 rounded-full animate-float-delayed"
        ></div>
        <div
          class="absolute top-1/2 right-20 w-12 h-12 bg-purple-400/20 rounded-full animate-float-delayed-2"
        ></div>
      </section>

      <!-- About Section -->
      <section id="about" class="px-4 py-16">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2
              class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              About Us
            </h2>
          </div>
          <About />
        </div>
      </section>

      <!-- Services Section -->
      <section id="services" class="px-4 py-16">
        <div class="max-w-7xl mx-auto">
          <Services />
        </div>
      </section>

      <!-- Properties Grid -->
      <section class="px-4 py-16">
        <div class="max-w-7xl mx-auto space-y-12">
          <div class="text-center space-y-6">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mb-6"
            >
              <BuildingOfficeIcon class="w-8 h-8 text-white" />
            </div>
            <h2
              class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-green-600 bg-clip-text text-transparent"
            >
              Available Properties
            </h2>
            <p
              class="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl font-light"
            >
              Browse the latest properties posted by our admins and find your
              perfect match.
            </p>
          </div>

          <!-- Enhanced Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative group">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"
              ></div>
              <div
                class="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-2"
              >
                <div class="flex items-center">
                  <MagnifyingGlassIcon
                    class="absolute left-6 h-5 w-5 text-gray-400"
                  />
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by title, location, or type..."
                    class="w-full pl-12 pr-6 py-4 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                  />
                  <div class="flex-shrink-0">
                    <button
                      class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-medium"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Properties List -->
          <div
            v-if="filteredProperties.length"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div
              v-for="(property, index) in filteredProperties"
              :key="property.id"
              class="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-blue-200 hover:-translate-y-2 hover:scale-[1.02]"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="property.image"
                  :alt="property.title"
                  class="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>
                <span
                  :class="getStatusBadgeClass(property.status)"
                  class="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border"
                >
                  {{ property.status }}
                </span>
                <div
                  class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
              </div>

              <div class="p-6 space-y-4">
                <h3
                  class="font-bold text-xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300"
                >
                  {{ property.title }}
                </h3>

                <div class="flex items-center text-gray-500 text-sm">
                  <svg
                    class="w-4 h-4 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="truncate">{{ property.location }}</span>
                </div>

                <div
                  class="flex items-center justify-between text-sm text-gray-500"
                >
                  <span class="flex items-center">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      ></path>
                    </svg>
                    {{ property.bedrooms }}BR
                  </span>
                  <span class="flex items-center">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"
                      ></path>
                    </svg>
                    {{ property.bathrooms }}BA
                  </span>
                </div>

                <div
                  class="flex justify-between items-center pt-4 border-t border-gray-100"
                >
                  <div
                    class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    ${{ formatPrice(property.price) }}
                  </div>
                  <button
                    @click="viewProperty(property)"
                    class="group/btn px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
                  >
                    <span class="flex items-center space-x-2">
                      <span>View</span>
                      <svg
                        class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Property Modal -->
          <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div
              class="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative"
            >
              <button
                @click="closeModal"
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div v-if="selectedProperty">
                <h2 class="text-2xl font-bold mb-2">
                  {{ selectedProperty.title }}
                </h2>
                <img
                  :src="selectedProperty.image"
                  :alt="selectedProperty.title"
                  class="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p class="text-gray-600 mb-2">
                  {{ selectedProperty.description }}
                </p>
                <p class="text-gray-800 font-bold text-xl">
                  ${{ formatPrice(selectedProperty.price) }}
                </p>
                <p class="text-gray-500 mt-2">
                  Location: {{ selectedProperty.location }}
                </p>
                <p class="text-gray-500">
                  Type: {{ selectedProperty.type }}, Bedrooms:
                  {{ selectedProperty.bedrooms }}, Bathrooms:
                  {{ selectedProperty.bathrooms }}
                </p>
                <span
                  :class="getStatusBadgeClass(selectedProperty.status)"
                  class="inline-block mt-4 px-3 py-1 rounded-full text-white"
                >
                  {{ selectedProperty.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="px-4 py-16">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-6"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2
              class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              Get in Touch
            </h2>
          </div>
          <Contact />
        </div>
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
const showMobileMenu = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 50;
  });
});

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

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
    active: "bg-green-500/90 text-white border-green-400/50",
    pending: "bg-yellow-500/90 text-white border-yellow-400/50",
    sold: "bg-blue-500/90 text-white border-blue-400/50",
    inactive: "bg-gray-500/90 text-white border-gray-400/50",
  };
  return classes[status] || "bg-gray-500/90 text-white border-gray-400/50";
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
  min-height: 100vh;
}

section {
  scroll-margin-top: 100px;
}

/* Custom animations */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

@keyframes float-delayed-2 {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-float-delayed-2 {
  animation: float-delayed-2 10s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

/* Line clamp utility */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
