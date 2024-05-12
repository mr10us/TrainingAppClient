import { MenuButton } from "@components/UI/MenuButton";
import { IoMdFitness } from "react-icons/io";
import { FiTarget } from "react-icons/fi";
import { routes } from "@consts";
import BackButton from "@components/UI/BackButton";
import { PageHeader } from "@components/PageHeader";
import { Flex } from "antd";

export const AdminSettings = () => {
  return (
    <>
      <Flex align="center" justify="center" className="h-16">
        <div className="-translate-x-5 translate-y-0.5">
          <BackButton
            withIcon
            withText={false}
            withBG={false}
            withPadding={false}
          />
        </div>
        <PageHeader size={"large"} text={"Налаштування"} />
      </Flex>
      <div className="flex justify-between flex-wrap gap-4 m-8">
        <MenuButton.Link
          to={routes.ADMIN_TRAININGS}
          text="Тренування"
          icon={<FiTarget size={50} className="text-yellow-300" />}
        />
        <MenuButton.Link
          to={routes.ADMIN_EXERCISES}
          text="Вправи"
          icon={<IoMdFitness size={50} className="text-yellow-300" />}
        />
      </div>
    </>
  );
};
