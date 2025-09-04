<template>
  <div class="space-y-6">
    <!-- Header with Add Property Button -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Properties Management</h1>
        <p class="text-gray-600 text-sm mt-1">Manage your property listings</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Add Property
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Search Properties
          </label>
          <div class="relative">
            <MagnifyingGlassIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, location, or type..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Type Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            v-model="selectedType"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Properties Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                Property
              </th>
              <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                Type
              </th>
              <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                Price
              </th>
              <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                Location
              </th>
              <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                Status
              </th>
              <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                Created
              </th>
              <th
                class="text-right px-6 py-4 text-sm font-medium text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="property in filteredProperties"
              :key="property.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <img
                    :src="property.image"
                    :alt="property.title"
                    class="h-12 w-12 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <p class="font-medium text-gray-900">
                      {{ property.title }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ property.bedrooms }}BR • {{ property.bathrooms }}BA
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 capitalize">
                {{ property.type }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                ${{ formatPrice(property.price) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ property.location }}
              </td>
              <td class="px-6 py-4">
                <span
                  :class="getStatusBadgeClass(property.status)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ property.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ formatDate(property.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="viewProperty(property)"
                    class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    title="View Details"
                  >
                    <EyeIcon class="h-4 w-4" />
                  </button>
                  <button
                    @click="editProperty(property)"
                    class="p-2 text-blue-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Edit Property"
                  >
                    <PencilIcon class="h-4 w-4" />
                  </button>
                  <button
                    @click="deleteProperty(property.id)"
                    class="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Property"
                  >
                    <TrashIcon class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProperties.length === 0" class="text-center py-12">
        <BuildingOfficeIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          No properties found
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{
            searchQuery || selectedStatus || selectedType
              ? "Try adjusting your filters"
              : "Get started by adding a new property"
          }}
        </p>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200"
    >
      <div class="text-sm text-gray-700">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredProperties.length) }} of
        {{ filteredProperties.length }} results
      </div>
      <div class="flex items-center space-x-2">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 text-sm rounded-lg transition-colors',
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Property Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="closeModal"
    >
      <div class="flex min-h-screen items-center justify-center p-4">
        <div
          class="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
        ></div>
        <div
          class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">
                {{
                  modalMode === "create"
                    ? "Add New Property"
                    : modalMode === "edit"
                    ? "Edit Property"
                    : "Property Details"
                }}
              </h3>
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon class="h-6 w-6" />
              </button>
            </div>
          </div>

          <div class="p-6">
            <!-- View Mode -->
            <div v-if="modalMode === 'view'" class="space-y-6">
              <img
                :src="selectedProperty?.image"
                :alt="selectedProperty?.title"
                class="w-full h-64 object-cover rounded-lg"
              />
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Title</label
                  >
                  <p class="text-gray-900">{{ selectedProperty?.title }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Price</label
                  >
                  <p class="text-gray-900">
                    ${{ formatPrice(selectedProperty?.price ?? 0) }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Type</label
                  >
                  <p class="text-gray-900 capitalize">
                    {{ selectedProperty?.type }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Status</label
                  >
                  <span
                    :class="getStatusBadgeClass(selectedProperty?.status ?? '')"
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ selectedProperty?.status }}
                  </span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Bedrooms</label
                  >
                  <p class="text-gray-900">{{ selectedProperty?.bedrooms }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Bathrooms</label
                  >
                  <p class="text-gray-900">{{ selectedProperty?.bathrooms }}</p>
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Location</label
                  >
                  <p class="text-gray-900">{{ selectedProperty?.location }}</p>
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Description</label
                  >
                  <p class="text-gray-900">
                    {{ selectedProperty?.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Edit/Create Mode -->
            <form v-else @submit.prevent="saveProperty" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Title</label
                  >
                  <input
                    v-model="formData.title"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Property title"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Price</label
                  >
                  <input
                    v-model="formData.price"
                    type="number"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Type</label
                  >
                  <select
                    v-model="formData.type"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Bedrooms</label
                  >
                  <input
                    v-model="formData.bedrooms"
                    type="number"
                    required
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Bathrooms</label
                  >
                  <input
                    v-model="formData.bathrooms"
                    type="number"
                    required
                    min="0"
                    step="0.5"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Status</label
                  >
                  <select
                    v-model="formData.status"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Image</label
                  >
                  <input
                    type="file"
                    accept="image/*"
                    @change="onFileChange"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Location</label
                  >
                  <input
                    v-model="formData.location"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Description</label
                  >
                  <textarea
                    v-model="formData.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Property description..."
                  ></textarea>
                </div>
              </div>

              <div
                class="flex justify-end space-x-3 pt-4 border-t border-gray-200"
              >
                <button
                  type="button"
                  @click="closeModal"
                  class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {{
                    modalMode === "create"
                      ? "Create Property"
                      : "Update Property"
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  BuildingOfficeIcon,
} from "@heroicons/vue/24/outline";
import { db } from "@/plugins/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  status: "active" | "pending" | "sold" | "inactive";
  bedrooms: number;
  bathrooms: number;
  image: string;
  description: string;
  createdAt: string;
}

// State
const searchQuery = ref("");
const selectedStatus = ref("");
const selectedType = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showModal = ref(false);
const modalMode = ref<"create" | "edit" | "view">("create");
const selectedProperty = ref<Property | null>(null);

// Form data
const formData = ref({
  title: "",
  type: "",
  price: 0,
  location: "",
  status: "active" as "active" | "pending" | "sold" | "inactive",
  bedrooms: 0,
  bathrooms: 0,
  image: "",
  description: "",
});

// Real-time properties
const properties = ref<Property[]>([]);

const setupRealtimeProperties = () => {
  const propertiesCollection = collection(db, "properties");

  onSnapshot(propertiesCollection, (snapshot) => {
    properties.value = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Property, "id">;
      return {
        id: doc.id,
        title: data.title || "",
        type: data.type || "",
        price: data.price || 0,
        location: data.location || "",
        status: data.status || "inactive",
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        image: data.image || "",
        description: data.description || "",
        createdAt: (data.createdAt as any)?.toDate
          ? (data.createdAt as any).toDate().toISOString()
          : new Date().toISOString(),
      };
    });
  });
};

onMounted(() => {
  setupRealtimeProperties();
});
const file = ref<File | null>(null);

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    file.value = target.files[0];
  }
};

async function uploadToCloudinary(file: File) {
  const url = `https://api.cloudinary.com/v1_1/dk0k4gxt8/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "real-estates-agency"); // created in Cloudinary settings

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url; // ✅ direct image URL
}

// Computed properties
const filteredProperties = computed(() => {
  return properties.value.filter((property) => {
    const matchesSearch =
      !searchQuery.value ||
      property.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      property.location
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      !selectedStatus.value || property.status === selectedStatus.value;
    const matchesType =
      !selectedType.value || property.type === selectedType.value;

    return matchesSearch && matchesStatus && matchesType;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProperties.value.length / itemsPerPage.value)
);

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, start + 4);

  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

// Helpers
const formatPrice = (price: number) => new Intl.NumberFormat().format(price);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getStatusBadgeClass = (status: string) => {
  const classes = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    sold: "bg-blue-100 text-blue-800",
    inactive: "bg-gray-100 text-gray-800",
  };
  return classes[status as keyof typeof classes] || "bg-gray-100 text-gray-800";
};

// Modal functions
const openCreateModal = () => {
  modalMode.value = "create";
  formData.value = {
    title: "",
    type: "",
    price: 0,
    location: "",
    status: "active",
    bedrooms: 0,
    bathrooms: 0,
    image: "",
    description: "",
  };
  showModal.value = true;
};

const viewProperty = (property: Property) => {
  selectedProperty.value = property;
  modalMode.value = "view";
  showModal.value = true;
};

const editProperty = (property: Property) => {
  selectedProperty.value = property;
  modalMode.value = "edit";
  formData.value = { ...property };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProperty.value = null;
};

// CRUD operations
const saveProperty = async () => {
  try {
    let imageUrl = formData.value.image;

    if (file.value) {
      // Upload image to Cloudinary
      imageUrl = await uploadToCloudinary(file.value);
    }

    if (modalMode.value === "create") {
      await addDoc(collection(db, "properties"), {
        ...formData.value,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });
    } else if (modalMode.value === "edit" && selectedProperty.value) {
      const docRef = doc(db, "properties", selectedProperty.value.id);
      await updateDoc(docRef, { ...formData.value, image: imageUrl });
    }

    closeModal();
    file.value = null; // reset after upload
  } catch (err) {
    console.error("Error saving property:", err);
  }
};

const deleteProperty = async (id: string) => {
  if (confirm("Are you sure you want to delete this property?")) {
    try {
      await deleteDoc(doc(db, "properties", id));
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  }
};

// Pagination
const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>
