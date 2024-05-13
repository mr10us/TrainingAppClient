import { createBrowserRouter } from "react-router-dom";
import { routes } from "@consts";
import { StartupMenu } from "@pages/StartupMenu";
import { Home } from "@pages/Home";
import { ChooseTrainingType } from "@pages/ChooseTrainingType";
import { BMI } from "@pages/BMI";
import { Settings } from "@pages/Settings";
import { TrainingPreview } from "@pages/TrainingPreview";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <StartupMenu />,
  },
  {
    path: routes.HOME,
    element: <Home />,
  },
  {
    path: routes.TRAININGS_LIST,
    element: <ChooseTrainingType />,
  },
  {
    path: routes.TRAINING_PREVIEW,
    element: <TrainingPreview />,
  },
  {
    path: routes.BMI,
    element: <BMI />,
  },
  {
    path: routes.SETTINGS,
    element: <Settings />,
  },
  { path: routes.ADMIN_TRAININGS, element: <Trainings /> },
  { path: routes.CREATE_TRAINING, element: <CreateTraining /> },
  { path: routes.EDIT_TRAINING, element: <EditTraining /> },

  { path: routes.ADMIN_EXERCISES, element: <Exercises /> },
  { path: routes.CREATE_EXERCISE, element: <CreateExercise /> },
  { path: routes.EDIT_EXERCISE, element: <EditExercise /> },

  {path: routes.ADMIN_CATEGORIES, element: <Categories />},
  {path: routes.CREATE_CATEGORIES, element: <CreateCategory />},
  {path: routes.EDIT_CATEGORIES, element: <EditCategory />},

  {path: routes.ADMIN_TYPES, element: <Types />},
  {path: routes.CREATE_TYPE, element: <CreateType />},
  {path: routes.EDIT_TYPE, element: <EditType />},
]);
