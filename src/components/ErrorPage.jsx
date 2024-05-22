import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 text-white">
      <h1 className="text-4xl font-bold">Вітаю!</h1>
      <p className="text-lg">Схоже, в додатку сталася помилка :(</p>
      <p className="text-lg">Якщо вона продовжує зʼявлятись, повідомте адміністратора</p>
    </div>
  );
};

export default ErrorPage;
