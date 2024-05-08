export const images = {};

export type Image = keyof typeof images;

export const getImage = (imageKey: Image): string => {
  return images[imageKey];
};
