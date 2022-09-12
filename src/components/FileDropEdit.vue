<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { getFileName, getFileExtension } from "@/utils/file-utils";

const props = defineProps<{
  name: string;
  autoUpdate: boolean;
}>();

const emits = defineEmits<{
  (eventName: "delete", name: string): void;
  (eventName: "rename", oldName: string, newName: string): void;
}>();

watch(
  () => props.autoUpdate,
  (newValue, oldValue) => {
    if (newValue) attemptRename();
  }
);

let name = computed(() => getFileName(props.name));
let extension = computed(() => getFileExtension(props.name));

const spanInput = ref();

function attemptRename() {
  const rename = spanInput.value.innerHTML;

  if (rename !== name)
    emits("rename", props.name, `${rename}${extension.value}`);
}
</script>

<template>
  <span class="file-edit">
    <div class="file-edit__align">
      <p class="file-edit__gray"><font-awesome-icon icon="file-image" /></p>
      <span
        :ref="
          (el) => {
            spanInput = el;
          }
        "
        class="file-edit__input"
        contenteditable
        >{{ name }}</span
      >
      <p v-if="extension" class="file-edit__gray">{{ extension }}</p>
    </div>

    <div class="file-edit__align">
      <button @click="attemptRename" class="file-edit__green my-btn-empty">
        <font-awesome-icon icon="check" />
      </button>
      <div class="file-edit__split"></div>
      <button
        @click="emits('delete', props.name)"
        class="file-edit__red my-btn-empty"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </span>
</template>

<style scoped lang="scss">
@import "../assets/styles/buttons";

.file-edit {
  width: 100%;

  padding: 0.3rem 0.8rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-radius: 0.25rem;
  background-color: #efefef;

  &__align {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.3rem;
  }

  &__input {
    width: fit-content;

    padding: 0.1rem 0.3rem;

    background-color: white;
    border-radius: 0.2rem;
    border: 0.1rem solid #bbbbbb;

    &:hover,
    &:focus {
      outline: none;
      border-color: #888888;
    }
  }

  &__split {
    height: 100%;
    border: solid 0.1rem #bbbbbb;
  }

  &__gray {
    color: #999999;
  }

  &__green {
    color: #047b04;
  }

  &__red {
    color: #f63939;
  }
}
</style>
