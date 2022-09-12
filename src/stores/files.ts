import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { isDuplicate, removeDuplicates } from "@/utils/file-utils";

export const useFileStore = defineStore("files", () => {
  const files: Ref<File[]> = ref([]);

  function addFiles(newFiles: File[]) {
    let noDupFiles = removeDuplicates(files.value, newFiles);
    files.value = [...files.value, ...noDupFiles];
  }

  function deleteFile(fileName: string): number {
    const fileIndex = files.value.indexOf(
      files.value.filter((file) => file.name === fileName)[0]
    );

    if (fileIndex >= 0) files.value.splice(fileIndex, 1);
    return fileIndex;
  }

  function renameFile(originalName: string, newName: string) {
    if (originalName === newName) return;

    const oldFile = files.value.filter((file) => file.name === originalName);
    if (oldFile.length == 0) return;

    const newFile = new File([oldFile[0]], newName);
    if (isDuplicate(newFile, files.value)) return;

    const fileIndex = deleteFile(oldFile[0].name);
    if (fileIndex < 0) return;

    files.value.splice(fileIndex, 0, newFile);
  }

  return { files, addFiles, deleteFile, renameFile };
});
