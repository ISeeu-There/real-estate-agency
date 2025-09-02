<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 p-4"
  >
    <transition name="fade-scale" mode="out-in">
      <div
        key="register"
        class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md transform transition-all duration-500"
      >
        <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center">
          Register
        </h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-gray-600 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Role</label>
            <select
              v-model="role"
              class="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            class="w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p class="mt-4 text-gray-500 text-center">
          Already have an account?
          <router-link to="/" class="text-pink-500 font-medium hover:underline"
            >Login</router-link
          >
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const role = ref("user");
const store = useUserStore();
const router = useRouter();

async function handleRegister() {
  try {
    await store.register(email.value, password.value, role.value);
    if (store.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  } catch (error) {
    alert("Registration failed!");
  }
}
</script>
