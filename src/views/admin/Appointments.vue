<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1
              class="text-3xl font-bold text-gray-900 flex items-center gap-3"
            >
              <CalendarDaysIcon class="h-8 w-8 text-blue-600" />
              Appointments
            </h1>
            <p class="text-gray-600 mt-2">
              Manage and track all property appointments
            </p>
          </div>
          <button
            @click="handleCreateAppointment"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></div>
        <span class="ml-3 text-gray-600">Loading appointments...</span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div class="flex">
          <ExclamationTriangleIcon class="h-5 w-5 text-red-400 mr-3 mt-0.5" />
          <div>
            <h3 class="text-sm font-medium text-red-800">
              Error Loading Appointments
            </h3>
            <p class="text-sm text-red-700 mt-1">{{ error }}</p>
            <button
              @click="fetchAppointments"
              class="mt-2 text-sm text-red-800 underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div
        v-else
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      >
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
          <!-- Search -->
          <div class="flex-1">
            <div class="relative">
              <MagnifyingGlassIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search appointments..."
                v-model="searchTerm"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Filters -->
          <div class="flex gap-4">
            <div class="flex items-center gap-2">
              <FunnelIcon class="h-5 w-5 text-gray-500" />
              <select
                v-model="statusFilter"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <select
              v-model="typeFilter"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="viewing">Property Viewing</option>
              <option value="consultation">Consultation</option>
              <option value="inspection">Inspection</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Appointments Table -->
      <div
        v-if="!loading && !error"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Property
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Agent
                </th>
                <th
                  class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="appointment in filteredAppointments"
                :key="appointment.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div
                      class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <UserIcon class="h-5 w-5 text-blue-600" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ appointment.clientName }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ appointment.clientEmail }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <MapPinIcon class="h-4 w-4 text-gray-400 mr-2" />
                    <span class="text-sm text-gray-900">{{
                      appointment.propertyAddress
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <div class="flex items-center text-sm text-gray-900">
                      <CalendarDaysIcon class="h-4 w-4 text-gray-400 mr-2" />
                      {{ formatDate(appointment.appointmentDate) }}
                    </div>
                    <div class="flex items-center text-sm text-gray-500 mt-1">
                      <ClockIcon class="h-4 w-4 text-gray-400 mr-2" />
                      {{ formatTime(appointment.appointmentTime) }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ appointment.type }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      appointment.status
                    )}`"
                  >
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ appointment.agent }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="handleViewAppointment(appointment)"
                      class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View details"
                    >
                      <EyeIcon class="h-4 w-4" />
                    </button>
                    <button
                      @click="handleEditAppointment(appointment)"
                      class="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit appointment"
                    >
                      <PencilIcon class="h-4 w-4" />
                    </button>
                    <button
                      @click="handleDeleteAppointment(appointment)"
                      class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete appointment"
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
        <div v-if="filteredAppointments.length === 0" class="text-center py-12">
          <CalendarDaysIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No appointments found
          </h3>
          <p class="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>

      <!-- View Modal -->
      <Teleport to="body">
        <div
          v-if="showModal && modalType === 'view' && selectedAppointment"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div
            class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                Appointment Details
              </h2>
              <button
                @click="closeModal"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <div class="p-6">
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">
                      Client Information
                    </h3>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <UserIcon class="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div class="font-medium">
                            {{ selectedAppointment.clientName }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ selectedAppointment.clientEmail }}
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <PhoneIcon class="h-5 w-5 text-gray-400 mr-3" />
                        <span>{{ selectedAppointment.clientPhone }}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">
                      Appointment Details
                    </h3>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <CalendarDaysIcon class="h-5 w-5 text-gray-400 mr-3" />
                        <span>{{
                          formatDate(selectedAppointment.appointmentDate)
                        }}</span>
                      </div>
                      <div class="flex items-center">
                        <ClockIcon class="h-5 w-5 text-gray-400 mr-3" />
                        <span>{{
                          formatTime(selectedAppointment.appointmentTime)
                        }}</span>
                      </div>
                      <div class="flex items-center">
                        <span
                          :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            selectedAppointment.status
                          )}`"
                        >
                          {{ selectedAppointment.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Property & Additional Info
                  </h3>
                  <div class="space-y-3">
                    <div class="flex items-start">
                      <MapPinIcon class="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <span>{{ selectedAppointment.propertyAddress }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Notes</label
                      >
                      <p class="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {{ selectedAppointment.notes || "No notes available" }}
                      </p>
                    </div>
                    <div class="text-sm text-gray-500">
                      Assigned Agent:
                      <span class="font-medium">{{
                        selectedAppointment.agent
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Create/Edit Modal -->
        <div
          v-if="showModal && (modalType === 'create' || modalType === 'edit')"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div
            class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div
              class="flex items-center justify-between p-6 border-b border-gray-200"
            >
              <h2 class="text-xl font-semibold text-gray-900">
                {{
                  modalType === "create"
                    ? "Create New Appointment"
                    : "Edit Appointment"
                }}
              </h2>
              <button
                @click="closeModal"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <form @submit.prevent="handleSaveAppointment" class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Client Information -->
                <div class="md:col-span-2">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">
                    Client Information
                  </h3>
                </div>

                <div>
                  <label
                    for="clientName"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Client Name *
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    v-model="form.clientName"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    for="clientEmail"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Client Email *
                  </label>
                  <input
                    id="clientEmail"
                    type="email"
                    v-model="form.clientEmail"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    for="clientPhone"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Client Phone *
                  </label>
                  <input
                    id="clientPhone"
                    type="tel"
                    v-model="form.clientPhone"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <!-- Appointment Details -->
                <div class="md:col-span-2">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4 mt-6">
                    Appointment Details
                  </h3>
                </div>

                <div>
                  <label
                    for="appointmentDate"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Appointment Date *
                  </label>
                  <input
                    id="appointmentDate"
                    type="date"
                    v-model="form.appointmentDate"
                    required
                    :min="new Date().toISOString().split('T')[0]"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    for="appointmentTime"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Appointment Time *
                  </label>
                  <input
                    id="appointmentTime"
                    type="time"
                    v-model="form.appointmentTime"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    for="type"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Appointment Type *
                  </label>
                  <select
                    id="type"
                    v-model="form.type"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="viewing">Property Viewing</option>
                    <option value="consultation">Consultation</option>
                    <option value="inspection">Inspection</option>
                  </select>
                </div>

                <div>
                  <label
                    for="status"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    v-model="form.status"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div class="md:col-span-2">
                  <label
                    for="propertyAddress"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Address *
                  </label>
                  <input
                    id="propertyAddress"
                    type="text"
                    v-model="form.propertyAddress"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div class="md:col-span-2">
                  <label
                    for="agent"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Assigned Agent *
                  </label>
                  <input
                    id="agent"
                    type="text"
                    v-model="form.agent"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div class="md:col-span-2">
                  <label
                    for="notes"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    v-model="form.notes"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes or comments..."
                  ></textarea>
                </div>
              </div>

              <!-- Form Actions -->
              <div
                class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200"
              >
                <button
                  type="button"
                  @click="closeModal"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="saving"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <span v-if="saving" class="flex items-center">
                    <div
                      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                    ></div>
                    Saving...
                  </span>
                  <span v-else>
                    {{
                      modalType === "create"
                        ? "Create Appointment"
                        : "Update Appointment"
                    }}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div
          v-if="showModal && modalType === 'delete' && selectedAppointment"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div class="p-6">
              <div class="text-center">
                <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
                >
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  Delete Appointment
                </h3>
                <p class="text-sm text-gray-500 mb-6">
                  Are you sure you want to delete the appointment with
                  {{ selectedAppointment.clientName }}? This action cannot be
                  undone.
                </p>
                <div class="flex gap-3 justify-center">
                  <button
                    @click="closeModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    @click="confirmDelete"
                    :disabled="deleting"
                    class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                  >
                    <span v-if="deleting" class="flex items-center">
                      <div
                        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                      ></div>
                      Deleting...
                    </span>
                    <span v-else>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { db } from "@/plugins/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";

/* --------------------
   Interfaces
-------------------- */
interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyAddress: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: "viewing" | "consultation" | "inspection";
  notes: string;
  agent: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/* --------------------
   State & Stores
-------------------- */
const userStore = useUserStore();
const appointments = ref<Appointment[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const saving = ref(false);
const deleting = ref(false);

const searchTerm = ref("");
const statusFilter = ref("all");
const typeFilter = ref("all");

const showModal = ref(false);
const modalType = ref<"view" | "create" | "edit" | "delete">("view");
const selectedAppointment = ref<Appointment | null>(null);

const form = reactive({
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  propertyAddress: "",
  appointmentDate: "",
  appointmentTime: "",
  status: "pending" as Appointment["status"],
  type: "" as Appointment["type"],
  notes: "",
  agent: "",
});

/* --------------------
   Computed
-------------------- */
const filteredAppointments = computed(() =>
  appointments.value.filter((appointment) => {
    const matchesSearch =
      appointment.clientName
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      appointment.clientEmail
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase()) ||
      appointment.propertyAddress
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" || appointment.status === statusFilter.value;
    const matchesType =
      typeFilter.value === "all" || appointment.type === typeFilter.value;

    return matchesSearch && matchesStatus && matchesType;
  })
);

/* --------------------
   Utility Functions
-------------------- */
const getStatusColor = (status: Appointment["status"]) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status];
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const resetForm = () => {
  Object.assign(form, {
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    propertyAddress: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "pending" as Appointment["status"],
    type: "" as Appointment["type"],
    notes: "",
    agent: "",
  });
};

const fillForm = (appointment: Appointment) => {
  Object.assign(form, {
    clientName: appointment.clientName,
    clientEmail: appointment.clientEmail,
    clientPhone: appointment.clientPhone,
    propertyAddress: appointment.propertyAddress,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    status: appointment.status,
    type: appointment.type,
    notes: appointment.notes,
    agent: appointment.agent,
  });
};

const closeModal = () => {
  showModal.value = false;
  selectedAppointment.value = null;
  resetForm();
};

/* --------------------
   CRUD Operations
-------------------- */
const fetchAppointments = () => {
  loading.value = true;
  error.value = null;

  try {
    const q = query(
      collection(db, "appointments"),
      orderBy("appointmentDate", "desc")
    );
    onSnapshot(
      q,
      (snapshot) => {
        appointments.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Appointment, "id">),
        }));
        loading.value = false;
      },
      (err) => {
        console.error("Error fetching appointments:", err);
        error.value = "Failed to load appointments.";
        loading.value = false;
      }
    );
  } catch (err) {
    console.error(err);
    error.value = "Failed to load appointments.";
    loading.value = false;
  }
};

const handleSaveAppointment = async () => {
  saving.value = true;
  try {
    const data = {
      ...form,
      updatedAt: Timestamp.now(),
    };

    if (modalType.value === "create") {
      await addDoc(collection(db, "appointments"), {
        ...data,
        createdAt: Timestamp.now(),
      });
    } else if (modalType.value === "edit" && selectedAppointment.value) {
      const docRef = doc(db, "appointments", selectedAppointment.value.id);
      await updateDoc(docRef, data);
    }

    closeModal();
  } catch (err) {
    console.error("Error saving appointment:", err);
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async () => {
  if (!selectedAppointment.value) return;
  deleting.value = true;
  try {
    const docRef = doc(db, "appointments", selectedAppointment.value.id);
    await deleteDoc(docRef);
    closeModal();
  } catch (err) {
    console.error("Error deleting appointment:", err);
  } finally {
    deleting.value = false;
  }
};

/* --------------------
   Event Handlers
-------------------- */
const handleCreateAppointment = () => {
  resetForm();
  modalType.value = "create";
  showModal.value = true;
};

const handleViewAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment;
  modalType.value = "view";
  showModal.value = true;
};

const handleEditAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment;
  fillForm(appointment);
  modalType.value = "edit";
  showModal.value = true;
};

const handleDeleteAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment;
  modalType.value = "delete";
  showModal.value = true;
};

/* --------------------
   Lifecycle
-------------------- */
onMounted(() => {
  fetchAppointments();
});
</script>
