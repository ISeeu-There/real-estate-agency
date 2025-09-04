<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full pt-20 px-6"
  >
    <!-- Header -->
    <div class="text-center space-y-6 max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-900">About</h1>
      <p class="text-lg text-gray-600">
        At <span class="font-semibold text-blue-600">DreamHomes</span>, we
        believe finding a home should be as exciting as living in it. With
        curated listings, professional support, and personalized service, we
        help you discover properties that match your lifestyle.
      </p>
    </div>

    <!-- Mission & Vision -->
    <div class="mt-16 grid gap-10 sm:grid-cols-2 max-w-5xl mx-auto">
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
      >
        <h2 class="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
        <p class="text-gray-600">
          To simplify the process of buying, selling, or renting properties by
          combining the latest technology with dedicated customer care.
        </p>
      </div>
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
      >
        <h2 class="text-2xl font-bold text-blue-600 mb-4">Our Vision</h2>
        <p class="text-gray-600">
          To become the leading real estate platform where people can find their
          dream home with confidence and ease.
        </p>
      </div>
    </div>

    <!-- Team Section -->
    <div class="mt-20 text-center space-y-6 max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900">Meet Our Team</h2>
      <p class="text-gray-600">
        A passionate team of real estate experts and tech enthusiasts working
        together to make your property search effortless.
      </p>

      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        <div
          v-for="member in team"
          :key="member.name"
          class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 class="text-xl font-semibold text-gray-900">{{ member.name }}</h3>
          <p class="text-blue-600 font-medium">{{ member.role }}</p>
          <p class="text-gray-500 text-sm mt-2">{{ member.bio }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

import SarahImg from "@/assets/web.png";
import MichaelImg from "@/assets/web.png";
import EmmaImg from "@/assets/web.png";

const team = ref<TeamMember[]>([
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: SarahImg,
    bio: "Leading DreamHomes with a vision to simplify real estate experiences.",
  },
  {
    name: "Michael Lee",
    role: "Head of Sales",
    image: MichaelImg,
    bio: "Passionate about connecting clients with their dream properties.",
  },
  {
    name: "Emma Davis",
    role: "Marketing Manager",
    image: EmmaImg,
    bio: "Creating strategies to reach more people and showcase properties.",
  },
]);
</script>
