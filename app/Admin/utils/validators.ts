export const validateProjectForm = (formData: any): string[] => {
  const errors: string[] = [];

  if (!formData.title?.trim()) {
    errors.push("Title is required");
  }

  if (!formData.description?.trim()) {
    errors.push("Description is required");
  }

  if (!formData.category?.trim()) {
    errors.push("Category is required");
  }

  if (formData.image && !isValidUrl(formData.image)) {
    errors.push("Image URL is invalid");
  }

  if (formData.liveDemo && !isValidUrl(formData.liveDemo)) {
    errors.push("Live Demo URL is invalid");
  }

  if (formData.github && !isValidUrl(formData.github)) {
    errors.push("GitHub URL is invalid");
  }

  return errors;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFile = (file: File): string | null => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, WebP, GIF)';
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'Image size should be less than 5MB';
  }

  return null;
};