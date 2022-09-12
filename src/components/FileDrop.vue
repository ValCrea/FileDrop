<script setup lang="ts">
import { ref, type Ref } from "vue";
import FileDropBox from "@/components/FileDropBox.vue";
import FileDropEdit from "@/components/FileDropEdit.vue";

import { storeToRefs } from "pinia";
import { useFileStore } from "@/stores/files";

const fileStore = useFileStore();
const { files } = storeToRefs(fileStore);

const popupVisible = ref(false);
const autoUpdateNames = ref(false);

function closePopup() {
  autoUpdateNames.value = true;
  setTimeout(() => {
    autoUpdateNames.value = false;
    popupVisible.value = !popupVisible.value;
  });
}
</script>

<template>
  <section class="visible">
    <p v-if="files.length == 0" class="visible__text">No data available</p>
    <p v-else v-for="file in files" class="visible__text">{{ file.name }}</p>
    <button
      @click="popupVisible = !popupVisible"
      class="visible__button my-btn my-btn--blue"
    >
      UPLOAD FILES
    </button>
  </section>

  <Transition>
    <div v-if="popupVisible" class="popup">
      <section class="popup__container">
        <header class="popup__header">
          <p class="popup__title">Add new files</p>
          <button
            @click="popupVisible = !popupVisible"
            class="popup__close my-btn-empty"
          >
            <font-awesome-icon icon="times" />
          </button>
        </header>

        <section class="popup__drop">
          <FileDropBox @new-files="fileStore.addFiles" />
        </section>

        <section class="popup__files">
          <template v-for="file in files" :key="file.name">
            <FileDropEdit
              :name="file.name"
              :auto-update="autoUpdateNames"
              @delete="fileStore.deleteFile"
              @rename="fileStore.renameFile"
            />
          </template>
        </section>

        <footer class="popup__footer">
          <button @click="closePopup" class="my-btn my-btn--red">
            SAVE AND CLOSE
          </button>
        </footer>
      </section>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@import "../assets/styles/buttons";

.visible {
  width: 100%;
  height: fit-content;

  padding: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #efefef;

  &__text {
    padding-top: 0.5rem;
    padding-inline: 0.2rem;
  }

  &__button {
    margin-top: 1rem;
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.7);

  &__container {
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    width: 90%;
    max-width: 800px;
    padding: 0.5rem;

    background-color: white;
    border-radius: 0.25rem;
  }

  &__header {
    padding: 0.5rem;

    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;

    border-bottom: 0.15rem solid #dddddd;
  }

  &__title {
    color: #575757;
    font-weight: 550;
  }

  &__close {
    color: #5198db;
  }

  &__drop {
    margin: 1.5rem;
    margin-bottom: 0;
  }

  &__files {
    margin-bottom: 1rem;
    padding: 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.6rem;
  }

  &__footer {
    padding: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    border-top: 0.15rem solid #dddddd;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
