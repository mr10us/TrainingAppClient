import { MenuButton } from "@components/UI/MenuButton";
import { IoMdFitness } from "react-icons/io";
import { FiTarget } from "react-icons/fi";
import { routes } from "@consts";
import { MdCategory } from "react-icons/md";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { PageHeader } from "@components/PageHeader";

export const AdminSettings = () => {
  return (
    <>
      <PageHeader size={"large"} title={"Налаштування"} />
      <div className="flex justify-center flex-wrap gap-4 m-8">
        <div style={{width: "calc(50% - 8px)"}}>
          <MenuButton.Link
            to={routes.ADMIN_TRAININGS}
            text="Тренування"
            icon={<FiTarget size={50} className="text-yellow-300" />}
          />
        </div>
        <div style={{width: "calc(50% - 8px)"}}>
          <MenuButton.Link
            to={routes.ADMIN_EXERCISES}
            text="Вправи"
            icon={<IoMdFitness size={50} className="text-yellow-300" />}
          />
        </div>
        <div style={{width: "calc(50% - 8px)"}}>
          <MenuButton.Link
            to={routes.ADMIN_CATEGORIES}
            text="Категорії"
            icon={
              <MdOutlineSportsGymnastics
                size={50}
                className="text-yellow-300"
              />
            }
          />
        </div>
        <div style={{width: "calc(50% - 8px)"}}>
          <MenuButton.Link
            to={routes.ADMIN_TYPES}
            text="Типи"
            icon={<MdCategory size={50} className="text-yellow-300" />}
          />
        </div>
      </div>
    </>
  );
};
