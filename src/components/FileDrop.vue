<script setup lang="ts">
import { ref, nextTick } from "vue";
import FileDropBox from "@/components/FileDropBox.vue";
import FileDropEdit from "@/components/FileDropEdit.vue";

import {
  isDuplicate,
  removeDuplicates,
  getFileExtension,
} from "@/utils/file-utils";

const emit = defineEmits(["update:files"]);
const props = defineProps<{
  files: File[];
  allowedExtensions?: string[];
}>();

function checkFiles(newFiles: File[]) {
  if (props.allowedExtensions) {
    newFiles = newFiles.filter((file) =>
      props.allowedExtensions?.includes(
        getFileExtension(file.name).substring(1)
      )
    );
  }
  addFiles(newFiles);
}

function addFiles(newFiles: File[]) {
  console.log(props.files);
  let noDupFiles = removeDuplicates(props.files, newFiles);
  emit("update:files", [...props.files, ...noDupFiles]);
}

function deleteFile(fileName: string): number {
  const fileIndex = props.files.indexOf(
    props.files.filter((file) => file.name === fileName)[0]
  );

  let filesTemp = props.files;
  if (fileIndex >= 0) filesTemp.splice(fileIndex, 1);
  emit("update:files", filesTemp);
  return fileIndex;
}

function renameFile(originalName: string, newName: string) {
  if (originalName === newName) return;

  const oldFile = props.files.filter((file) => file.name === originalName);
  if (oldFile.length == 0) return;

  const newFile = new File([oldFile[0]], newName);
  if (isDuplicate(newFile, props.files)) return;

  const fileIndex = deleteFile(oldFile[0].name);
  if (fileIndex < 0) return;

  let filesTemp = props.files;
  filesTemp.splice(fileIndex, 0, newFile);
  emit("update:files", filesTemp);
}

const popupVisible = ref(false);
const autoUpdateNames = ref(false);

function closePopup() {
  autoUpdateNames.value = true;
  nextTick(() => {
    autoUpdateNames.value = false;
    popupVisible.value = !popupVisible.value;
  });
}

const onPaste = (event: ClipboardEvent) => {
  if (event!.clipboardData) addFiles([...event.clipboardData.files]);
};
</script>

<template>
  <section class="visible">
    <p v-if="files.length == 0" class="visible__text">No data available</p>
    <p v-for="file in files" class="visible__text">
      {{ file.name }}
    </p>
    <button
      @click="popupVisible = !popupVisible"
      class="visible__button my-btn my-btn--blue"
    >
      UPLOAD FILES
    </button>
  </section>

  <Transition>
    <div v-if="popupVisible" class="popup">
      <section @paste="onPaste" class="popup__container">
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
          <FileDropBox @new-files="checkFiles" />
        </section>

        <section class="popup__files">
          <template v-for="file in files" :key="file.name">
            <FileDropEdit
              :name="file.name"
              :auto-update="autoUpdateNames"
              @delete="deleteFile"
              @rename="renameFile"
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

    text-overflow: clip;
    overflow-x: hidden;
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
    max-height: 99%;

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
