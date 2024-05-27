import { createBrowserRouter } from "react-router-dom";
import { routes } from "@consts";
import { StartupMenu } from "@pages/StartupMenu";
import { Home } from "@pages/Home";
import { ChooseTraining } from "@pages/ChooseTraining";
import { Settings } from "@pages/Settings";
import { TrainingPreview } from "@pages/Trainings/TrainingPreview";
import { CreateTraining } from "@pages/Settings/Trainings/CreateTraining";
import { CreateExercise } from "@pages/Settings/Exercixes/CreateExercise";
import { EditTraining } from "@pages/Settings/Trainings/EditTraining";
import { EditExercise } from "@pages/Settings/Exercixes/EditExercise";
import { Trainings } from "@pages/Settings/Trainings/Trainings";
import { Exercises } from "@pages/Settings/Exercixes/Exercises";
import { Categories } from "@pages/Settings/Categories/Categories";
import { CreateCategory } from "@pages/Settings/Categories/CreateCategory";
import { EditCategory } from "@pages/Settings/Categories/EditCategory";
import { Types } from "@pages/Settings/Types/Types";
import { CreateType } from "@pages/Settings/Types/CreateType";
import { EditType } from "@pages/Settings/Types/EditType";
import { TrainingPage } from "@pages/Trainings/TrainingPage";
import { TrainingReview } from "@pages/Trainings/TrainingReview";
import { NotFound } from "./NotFound";

export const router = createBrowserRouter([
  // Root/index page
  { path: "/", element: <StartupMenu /> },

  // Home page
  { path: routes.HOME, element: <Home /> },

  // Trainings page
  { path: routes.TRAININGS_LIST, element: <ChooseTraining /> },

  // Training Preview
  { path: routes.TRAINING_PREVIEW, element: <TrainingPreview /> },

  // Training exercise page
  { path: routes.TRAINING, element: <TrainingPage /> },

  // Review page
  { path: routes.TRAINING_REVIEW, element: <TrainingReview /> },

  // Settings pages
  { path: routes.SETTINGS, element: <Settings /> },

  // Training Section
  { path: routes.ADMIN_TRAININGS, element: <Trainings /> },
  { path: routes.CREATE_TRAINING, element: <CreateTraining /> },
  { path: routes.EDIT_TRAINING, element: <EditTraining /> },

  // Exercise Section
  { path: routes.ADMIN_EXERCISES, element: <Exercises /> },
  { path: routes.CREATE_EXERCISE, element: <CreateExercise /> },
  { path: routes.EDIT_EXERCISE, element: <EditExercise /> },

  // Categories Section
  { path: routes.ADMIN_CATEGORIES, element: <Categories /> },
  { path: routes.CREATE_CATEGORIES, element: <CreateCategory /> },
  { path: routes.EDIT_CATEGORIES, element: <EditCategory /> },

  // Types Section
  { path: routes.ADMIN_TYPES, element: <Types /> },
  { path: routes.CREATE_TYPE, element: <CreateType /> },
  { path: routes.EDIT_TYPE, element: <EditType /> },

  // 404 Not Found page
  { path: "*", element: <NotFound to={routes.HOME} /> },
]);
