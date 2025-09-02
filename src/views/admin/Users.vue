<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Users Management</h1>
        <p class="text-gray-600 text-sm mt-1">Manage registered users</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Add User
      </button>
    </div>

    <!-- Users Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[600px]">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-3 text-sm font-medium text-gray-600">
                Email
              </th>
              <th class="text-left px-6 py-3 text-sm font-medium text-gray-600">
                Role
              </th>
              <th class="text-left px-6 py-3 text-sm font-medium text-gray-600">
                Created At
              </th>
              <th
                class="text-right px-6 py-3 text-sm font-medium text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="user in users"
              :key="user.uid"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-3 text-gray-900">{{ user.email }}</td>
              <td class="px-6 py-3 capitalize">{{ user.role }}</td>
              <td class="px-6 py-3">{{ formatDate(user.createdAt) }}</td>
              <td class="px-6 py-3 text-right space-x-2">
                <button
                  @click="editUser(user)"
                  class="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </button>
                <button
                  @click="deleteUser(user)"
                  class="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Create/Edit User -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          {{ modalMode === "create" ? "Add User" : "Edit User" }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <input
              v-model="formData.password"
              type="password"
              :required="modalMode === 'create'"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Role</label
            >
            <select
              v-model="formData.role"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {{ modalMode === "create" ? "Create" : "Update" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useUserStore } from "@/stores/user";
import router from "@/router";

interface UserItem {
  uid: string;
  email: string;
  role: string;
  createdAt: any;
}

const store = useUserStore();

// State
const users = ref<UserItem[]>([]);
const showModal = ref(false);
const modalMode = ref<"create" | "edit">("create");
const formData = ref({ uid: "", email: "", password: "", role: "user" });

// Fetch users from Firestore
const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  users.value = snapshot.docs.map(
    (doc) => ({ uid: doc.id, ...doc.data() } as UserItem)
  );
};

onMounted(() => {
  fetchUsers();
});

// Modal functions
const openCreateModal = () => {
  modalMode.value = "create";
  formData.value = { uid: "", email: "", password: "", role: "user" };
  showModal.value = true;
};

const editUser = (user: UserItem) => {
  modalMode.value = "edit";
  formData.value = {
    uid: user.uid,
    email: user.email,
    password: "",
    role: user.role,
  };
  showModal.value = true;
};

const closeModal = () => (showModal.value = false);

// Submit
const handleSubmit = async () => {
  if (modalMode.value === "create") {
    try {
      await store.register(
        formData.value.email,
        formData.value.password,
        formData.value.role
      );
      await fetchUsers();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  } else if (modalMode.value === "edit") {
    const { uid, email, role } = formData.value;
    await setDoc(
      doc(db, "users", uid),
      { email, role, updatedAt: serverTimestamp() },
      { merge: true }
    );
    await fetchUsers();
    closeModal();
  }
};

// Delete user
const deleteUser = async (user: UserItem) => {
  if (confirm(`Are you sure you want to delete ${user.email}?`)) {
    await deleteDoc(doc(db, "users", user.uid));
    await fetchUsers();
  }
};

// Format date
const formatDate = (timestamp: any) => {
  if (!timestamp) return "-";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
};
</script>

<style scoped>
/* Optional: add scroll styles or modal styles if needed */
</style>
