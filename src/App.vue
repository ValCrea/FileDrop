<script setup lang="ts">
import FileDrop from "./components/FileDrop.vue";
import { useFileStore } from "@/stores/files";

const fileStore = useFileStore();
</script>

<template>
  <div class="container">
    <FileDrop
      :fileStore="fileStore"
      :allowedExtensions="['json', 'svg', 'html']"
    />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 90%;
  max-width: 800px;
  margin-top: 15rem;
  margin-inline: auto;
}
</style>
