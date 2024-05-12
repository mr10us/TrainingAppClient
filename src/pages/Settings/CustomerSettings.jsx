import BackButton from "@components/UI/BackButton";

export const CustomerSettings = () => {
  return (
    <div>
      <p className="text-gray-100 font-bold text-4xl mb-6 p-12 text-center">
        Вибач, поки що розділ доступний тільки для адміна
      </p>
      <BackButton block />
    </div>
  );
};
