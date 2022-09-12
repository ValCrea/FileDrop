<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const emits = defineEmits<{
  (eventName: "newFiles", files: File[]): void;
}>();

const onDrop = (e: DragEvent) => {
  if (!e.dataTransfer) return;
  uploadFiles(e.dataTransfer.files);
};

const onSelect = (e: any) => {
  if (!e.target) return;

  if (e.target.files) uploadFiles(e.target.files);
};

const uploadFiles = (files: FileList) => {
  emits("newFiles", [...files]);
};

const preventDefaults = (e: Event) => e.preventDefault();
const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});
onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<template>
  <div @drop.prevent="onDrop" class="drop">
    <p class="pad-text">Drag and drop your files here</p>
    <p class="pad-text">or paste them using CTRL + V (CMD + V on Mac)</p>

    <input @change="onSelect" type="file" id="file-input" multiple hidden />
    <label class="my-btn my-btn--blue mt-04" for="file-input"
      >OR CHOOSE FILES <font-awesome-icon icon="upload"
    /></label>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/buttons";

.drop {
  padding: 5rem;

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f8f8f8;

  border-radius: 0.25rem;
}

.pad-text {
  padding: 0.6rem;
}

.mt-04 {
  margin-top: 0.4rem;
}
</style>
