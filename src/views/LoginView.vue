<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-4"
  >
    <transition name="fade-scale" mode="out-in">
      <div
        key="login"
        class="bg-white rounded-xl shadow-xl p-8 w-full max-w-md transform transition-all duration-500"
      >
        <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Field -->
          <div>
            <label class="block text-gray-600 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-gray-600 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
            <!-- Error Message -->
            <div v-if="loginError" class="text-red-600 text-sm mt-1">
              {{ loginError }}
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p class="mt-4 text-gray-500 text-center">
          Don't have an account?
          <router-link
            to="/register"
            class="text-indigo-500 font-medium hover:underline"
          >
            Register
          </router-link>
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
const loginError = ref<string | null>(null);

const store = useUserStore();
const router = useRouter();

async function handleLogin() {
  loginError.value = null; // reset before attempt
  try {
    await store.login(email.value, password.value);

    if (store.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  } catch (error: any) {
    console.error("Login error:", error);

    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      loginError.value = "Invalid email or password.";
    } else if (error.code === "auth/too-many-requests") {
      loginError.value = "Too many attempts. Try again later.";
    } else {
      loginError.value = "Invalid email or password.";
    }
  }
}
</script>
