import { useTelegram } from "@hooks/useTelegram";
import { MainLayout } from "../layouts/MainLayout";
import React from "react";
import { MenuButtons } from "@components/MenuButtons";
import { motion } from "framer-motion";

export const Home = () => {
  const { user } = useTelegram();
  const image = user?.photo_url || null;
  const name = user ? user?.first_name || user?.username : "друже";

  const nameAnim = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 },
    },
    hidden: { opacity: 0, x: -200 },
  };
  const photoAnim = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.3 },
    },
    hidden: { opacity: 0, x: 200 },
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-between h-screen">
        <div className="pt-8 px-4 flex flex-row-reverse justify-between">
          {image ? (
            <motion.img
              className="size-16 object-contain"
              src={image}
              alt="user image"
              variants={photoAnim}
              initial="hidden"
              animate="visible"
            />
          ) : (
            <motion.div
              className="bg-brand-dark flex justify-center items-center rounded-full size-16 mb-3"
              variants={photoAnim}
              initial="hidden"
              animate="visible"
            >
              <p className="text-gray-100 text-2xl font-bold">
                {name[0].toUpperCase()}
              </p>
            </motion.div>
          )}
          <motion.p
            className="text-gray-100 py font-bold text-3xl mt-4 w-min"
            variants={nameAnim}
            initial="hidden"
            animate="visible"
          >
            Привіт, <br />
            <span className="text-5xl text-yellow-300 ml-4">{name}</span>!
          </motion.p>
        </div>
        <MenuButtons />
      </div>
    </MainLayout>
  );
};
