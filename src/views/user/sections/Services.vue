<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full pt-20 px-6"
  >
    <!-- Header -->
    <div class="text-center space-y-6 max-w-3xl mx-auto">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6"
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            ></path>
          </svg>
        </div>
        <h2
          class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          Our Services
        </h2>
      </div>
      <p class="text-lg text-gray-600">
        Chez <span class="font-semibold text-blue-600">DreamHomes</span>, nous
        vous accompagnons à chaque étape de votre projet immobilier, avec des
        solutions adaptées à vos besoins.
      </p>
    </div>

    <!-- Services Grid -->
    <div
      class="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
    >
      <div
        v-for="service in services"
        :key="service.title"
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition"
      >
        <div
          class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6"
        >
          <component :is="service.icon" class="w-8 h-8 text-blue-600" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">
          {{ service.title }}
        </h2>
        <p class="text-gray-600 text-sm">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  CurrencyDollarIcon,
  KeyIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
} from "@heroicons/vue/24/outline";

interface Service {
  title: string;
  description: string;
  icon: any;
}

const services: Service[] = [
  {
    title: "Achat de Propriétés",
    description:
      "Trouvez et achetez facilement la maison de vos rêves grâce à notre plateforme.",
    icon: HomeIcon,
  },
  {
    title: "Vente de Propriétés",
    description:
      "Nous vous aidons à vendre rapidement votre bien avec une visibilité maximale.",
    icon: CurrencyDollarIcon,
  },
  {
    title: "Location Immobilière",
    description:
      "Découvrez des centaines d’options de location adaptées à vos besoins.",
    icon: KeyIcon,
  },
  {
    title: "Gestion Locative",
    description:
      "Profitez d’un service complet pour la gestion et le suivi de vos biens en location.",
    icon: ClipboardDocumentListIcon,
  },
  {
    title: "Conseil & Expertise",
    description:
      "Nos experts vous guident dans vos décisions immobilières avec des conseils personnalisés.",
    icon: UserGroupIcon,
  },
  {
    title: "Investissements",
    description:
      "Explorez des opportunités d’investissement rentables dans l’immobilier.",
    icon: BuildingOfficeIcon,
  },
];
</script>
