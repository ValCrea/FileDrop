import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { isDuplicate, removeDuplicates } from "@/utils/file-utils";

export const useFileStore = defineStore("files", () => {
  const files: Ref<File[]> = ref([]);
  return { files };
});
