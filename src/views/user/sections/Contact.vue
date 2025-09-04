<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full pt-20 px-6"
  >
    <!-- Header -->
    <div class="text-center space-y-6 max-w-3xl mx-auto">
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-900">
        Contactez-nous
      </h1>
      <p class="text-lg text-gray-600">
        Nous sommes là pour vous aider à trouver votre futur logement. Contactez
        notre équipe pour toute question ou information.
      </p>
    </div>

    <!-- Main Grid -->
    <div class="mt-16 grid gap-10 lg:grid-cols-2 max-w-6xl mx-auto">
      <!-- Contact Info -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 space-y-6 hover:shadow-2xl transition"
      >
        <h2 class="text-2xl font-bold text-blue-600 mb-4">Nos Coordonnées</h2>
        <ul class="space-y-6 text-gray-700">
          <li class="flex items-start gap-4">
            <EnvelopeIcon class="w-6 h-6 text-blue-600 flex-shrink-0" />
            <span
              ><strong>Email :</strong>
              <a
                href="mailto:contact@dreamhomes.com"
                class="text-blue-600 font-medium"
                >contact@dreamhomes.com</a
              ></span
            >
          </li>
          <li class="flex items-start gap-4">
            <PhoneIcon class="w-6 h-6 text-blue-600 flex-shrink-0" />
            <span><strong>Téléphone :</strong> +213 555 123 456</span>
          </li>
          <li class="flex items-start gap-4">
            <MapPinIcon class="w-6 h-6 text-blue-600 flex-shrink-0" />
            <span
              ><strong>Adresse :</strong> 123 Rue des Villas, Alger,
              Algérie</span
            >
          </li>
        </ul>

        <!-- Optional Google Map -->
        <div class="mt-8 rounded-xl overflow-hidden shadow-lg">
          <iframe
            class="w-full h-64"
            frameborder="0"
            style="border: 0"
            src="https://www.google.com/maps/embed/v1/place?q=Algeria&key=YOUR_API_KEY"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Contact Form -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
      >
        <h2 class="text-2xl font-bold text-blue-600 mb-6">
          Envoyez-nous un message
        </h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name"
            required
            class="input"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email"
            required
            class="input"
          />
          <input
            v-model="form.phone"
            type="tel"
            placeholder="Your Phone Number"
            required
            class="input"
          />
          <textarea
            v-model="form.message"
            placeholder="Your Message"
            required
            class="textarea"
          ></textarea>
          <button type="submit" class="btn">Send</button>
        </form>

        <!-- Confirmation -->
        <p v-if="submitted" class="mt-4 text-green-600 font-medium text-center">
          ✅ Merci ! Votre message a été envoyé avec succès.
        </p>
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

// Submit form
const submitForm = async () => {
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.phone ||
    !form.value.message
  )
    return;

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
  }
};
</script>
