export const routes = {
  HOME: "/home/",

  TRAININGS_LIST: "/trainings/",
  TRAINING_PREVIEW: "/trainings/:trainingID/preview/",
  TRAINING: "/trainings/:trainingID/",
  TRAINING_REVIEW: "/trainings/:trainingID/review/",

  BMI: "/bmi-calc/",

  SETTINGS: "/settings/",

  ADMIN_TRAININGS: "/settings/training/",
  CREATE_TRAINING: "/settings/training/create/",
  EDIT_TRAINING: "/settings/training/:id/",

  ADMIN_EXERCISES: "/settings/exercise/",
  CREATE_EXERCISE: "/settings/exercise/create/",
  EDIT_EXERCISE: "/settings/exercise/:id/",

  ADMIN_CATEGORIES: "/settings/category/",
  CREATE_CATEGORIES: "/settings/category/create/",
  EDIT_CATEGORIES: "/settings/category/:id/",

  ADMIN_TYPES: "/settings/type/",
  CREATE_TYPE: "/settings/type/create/",
  EDIT_TYPE: "/settings/type/:id/",
};

export const colors = {
  brand: "#ffb800",
};

export const levels = {
  0: "Новачок",
  1: "Середній",
  2: "Високий",
};

export const genders = {
  0: "Універсальний",
  1: "Для чоловіків",
  2: "Для жінок",
};
