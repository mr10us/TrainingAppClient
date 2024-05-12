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
  { path: routes.ADMIN_EXERCISES, element: <Exercises /> },
  { path: routes.CREATE_TRAINING, element: <CreateTraining /> },
  { path: routes.CREATE_EXERCISE, element: <CreateExercise /> },
  { path: routes.EDIT_TRAINING_TRAINING, element: <EditTraining /> },
  { path: routes.EDIT_EXERCISE, element: <EditExercise /> },
]);
