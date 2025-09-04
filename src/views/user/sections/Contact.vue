<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 w-full pt-16 px-4 sm:px-6 lg:px-8"
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
        class="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Header Section -->
      <div class="text-center space-y-8 max-w-4xl mx-auto mb-20">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
        >
          <EnvelopeIcon class="w-8 h-8 text-white" />
        </div>

        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight"
        >
          Contactez-nous
        </h1>

        <p
          class="text-xl sm:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed"
        >
          Nous sommes là pour vous accompagner dans votre recherche du logement
          idéal. Notre équipe d'experts est à votre écoute.
        </p>

        <!-- Stats or Features -->
        <div class="flex flex-wrap justify-center gap-8 mt-12">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">24/7</div>
            <div class="text-sm text-gray-500">Support disponible</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">1000+</div>
            <div class="text-sm text-gray-500">Clients satisfaits</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-indigo-600">5★</div>
            <div class="text-sm text-gray-500">Note moyenne</div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid gap-12 lg:gap-16 lg:grid-cols-2 max-w-7xl mx-auto">
        <!-- Contact Information Card -->
        <div class="group">
          <div
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 ease-out"
          >
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <MapPinIcon class="w-6 h-6 text-white" />
              </div>
              <h2
                class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Nos Coordonnées
              </h2>
            </div>

            <div class="space-y-8">
              <!-- Email -->
              <div
                class="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50/50 transition-all duration-300"
              >
                <div
                  class="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300"
                >
                  <EnvelopeIcon class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p
                    class="text-sm font-medium text-gray-500 uppercase tracking-wide"
                  >
                    Email
                  </p>
                  <a
                    href="mailto:contact@dreamhomes.com"
                    class="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
                  >
                    contact@dreamhomes.com
                  </a>
                </div>
              </div>

              <!-- Phone -->
              <div
                class="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50/50 transition-all duration-300"
              >
                <div
                  class="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300"
                >
                  <PhoneIcon class="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p
                    class="text-sm font-medium text-gray-500 uppercase tracking-wide"
                  >
                    Téléphone
                  </p>
                  <a
                    href="tel:+213555123456"
                    class="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300"
                  >
                    +213 555 123 456
                  </a>
                </div>
              </div>

              <!-- Address -->
              <div
                class="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50/50 transition-all duration-300"
              >
                <div
                  class="w-12 h-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300"
                >
                  <MapPinIcon class="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p
                    class="text-sm font-medium text-gray-500 uppercase tracking-wide"
                  >
                    Adresse
                  </p>
                  <p class="text-lg font-semibold text-gray-800">
                    123 Rue des Villas, Alger, Algérie
                  </p>
                </div>
              </div>
            </div>

            <!-- Map Section -->
            <div class="mt-10">
              <div
                class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 hover:border-white/50 transition-all duration-500"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10"
                ></div>
                <iframe
                  class="w-full h-80 filter contrast-110 saturate-110"
                  frameborder="0"
                  style="border: 0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52014.82134850001!2d3.0421554!3d36.7372648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad6aac606a3f%3A0x4ba2e4fa6d4d3c9e!2sAlger%2C%20Algeria!5e0!3m2!1sen!2sus!4v1638000000000!5m2!1sen!2sus"
                  allowfullscreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="group">
          <div
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 ease-out"
          >
            <div class="flex items-center gap-4 mb-8">
              <div
                class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center"
              >
                <EnvelopeIcon class="w-6 h-6 text-white" />
              </div>
              <h2
                class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                Envoyez-nous un message
              </h2>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Name Input -->
              <div class="group/input">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Nom complet</label
                >
                <div class="relative">
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Votre nom complet"
                    required
                    class="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium group-hover/input:border-gray-300"
                  />
                  <div
                    class="absolute inset-y-0 right-4 flex items-center pointer-events-none"
                  >
                    <div
                      class="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Email Input -->
              <div class="group/input">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Adresse email</label
                >
                <div class="relative">
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                    class="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium group-hover/input:border-gray-300"
                  />
                  <div
                    class="absolute inset-y-0 right-4 flex items-center pointer-events-none"
                  >
                    <div
                      class="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Phone Input -->
              <div class="group/input">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Numéro de téléphone</label
                >
                <div class="relative">
                  <input
                    v-model="form.phone"
                    type="tel"
                    placeholder="+213 XXX XXX XXX"
                    required
                    class="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium group-hover/input:border-gray-300"
                  />
                  <div
                    class="absolute inset-y-0 right-4 flex items-center pointer-events-none"
                  >
                    <div
                      class="w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Message Textarea -->
              <div class="group/input">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Message</label
                >
                <div class="relative">
                  <textarea
                    v-model="form.message"
                    placeholder="Décrivez votre projet, vos besoins, ou posez-nous vos questions..."
                    required
                    rows="5"
                    class="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium resize-none group-hover/input:border-gray-300"
                  ></textarea>
                  <div class="absolute top-4 right-4 pointer-events-none">
                    <div
                      class="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="group/btn w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div
                  class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"
                ></div>
                <span class="relative flex items-center justify-center gap-3">
                  <span v-if="!isSubmitting">Envoyer le message</span>
                  <span v-else>Envoi en cours...</span>
                  <div
                    v-if="isSubmitting"
                    class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></div>
                </span>
              </button>
            </form>

            <!-- Success Message -->
            <div
              v-if="submitted"
              class="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl transform transition-all duration-500 ease-out"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-green-800 text-lg">
                    Message envoyé avec succès !
                  </h3>
                  <p class="text-green-700">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Contact Methods -->
      <div class="mt-20 mb-16">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-2xl font-bold text-gray-800 mb-8">
            Autres moyens de nous contacter
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- WhatsApp -->
            <div
              class="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 hover:bg-white/80 hover:shadow-xl transition-all duration-300"
            >
              <div
                class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-2">WhatsApp</h4>
              <p class="text-gray-600 text-sm mb-3">
                Contactez-nous directement
              </p>
              <a
                href="https://wa.me/213555123456"
                class="text-green-600 font-medium hover:text-green-700 transition-colors"
              >
                +213 555 123 456
              </a>
            </div>

            <!-- Facebook -->
            <div
              class="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 hover:bg-white/80 hover:shadow-xl transition-all duration-300"
            >
              <div
                class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-2">Facebook</h4>
              <p class="text-gray-600 text-sm mb-3">Suivez-nous sur Facebook</p>
              <a
                href="https://facebook.com/dreamhomes"
                class="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                @DreamHomes
              </a>
            </div>

            <!-- Instagram -->
            <div
              class="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30 hover:bg-white/80 hover:shadow-xl transition-all duration-300"
            >
              <div
                class="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </div>
              <h4 class="font-semibold text-gray-800 mb-2">Instagram</h4>
              <p class="text-gray-600 text-sm mb-3">Photos & actualités</p>
              <a
                href="https://instagram.com/dreamhomes"
                class="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                @dreamhomes_dz
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import { db } from "@/plugins/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Form state
const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const submitted = ref(false);
const isSubmitting = ref(false);

// Submit form
const submitForm = async () => {
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.phone ||
    !form.value.message
  )
    return;

  isSubmitting.value = true;

  try {
    await addDoc(collection(db, "contactMessages"), {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
      createdAt: serverTimestamp(),
    });

    submitted.value = true;
    form.value = { name: "", email: "", phone: "", message: "" };

    // Auto reset success message after 5 seconds
    setTimeout(() => (submitted.value = false), 5000);
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Une erreur s'est produite. Veuillez réessayer.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
