<script setup lang="ts">
import FileDrop from "./components/FileDrop.vue";
import { ref } from "vue";
import { useFileStore } from "@/stores/files";

import { storeToRefs } from "pinia";

const fileStore = useFileStore();
const { files } = storeToRefs(fileStore);
</script>

<template>
  <div class="container">
    <FileDrop
      v-model:files="files"
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
