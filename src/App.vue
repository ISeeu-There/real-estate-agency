<template>
  <div><router-view /></div>
</template>

<script setup lang="ts">
import { auth } from "./plugins/firebase";

console.log("Firebase Auth Loaded:", auth);
</script>

<style lang="scss"></style>
