/*export const findDuplicateFiles = (
  original: readonly File[],
  findDupes: readonly File[]
): File[] => {
  return findDupes.filter(
    (dupFile) =>
      original.filter((orgFile) => dupFile.name === orgFile.name).length > 0
  );
};*/

export const isDuplicate = (file: File, files: File[]) => {
  return files.filter((checkFile) => checkFile.name === file.name).length > 0;
};

export const findDuplicates = (
  originalFiles: readonly File[],
  newFiles: readonly File[]
): File[] => {
  return newFiles.filter(
    (newFile) =>
      originalFiles.filter((orgFile) => newFile.name === orgFile.name).length >
      0
  );
};

export const removeDuplicates = (originalFiles: File[], newFiles: File[]) => {
  const duplicates = findDuplicates(originalFiles, newFiles);

  return newFiles.filter(
    (newFile) =>
      duplicates.filter((dupFile) => dupFile.name === newFile.name).length == 0
  );
};

export const getFileName = (file: string): string => {
  const split = file.lastIndexOf(".");
  if (split <= 0) return file;

  return file.substring(0, split);
};

export const getFileExtension = (file: string): string => {
  const split = file.lastIndexOf(".");
  if (split <= 0) return "";

  return file.substring(split, file.length);
};
