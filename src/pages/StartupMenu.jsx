import logoBird from "/img/logo-bird.png";
import { useEffect } from "react";
import { useTelegram } from "@hooks/useTelegram";
import { login } from "@http/userApi";
import { App, Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { routes } from "@consts";

export const StartupMenu = () => {
  const { tg, user, confirmClosing } = useTelegram();
  const { message } = App.useApp();

  const navigate = useNavigate();

  // const user = { id: 340167417 };

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ password }) => login(null, user.id, password),
    onError: (e) => {
      message.error(e.response.data.message);
    },
    onSuccess: () => {
      message.success("Вхід успішний");
      navigate(routes.HOME);
    },
  });

  useEffect(() => {
    tg.ready();
    confirmClosing();
    tg.expand();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg self-start mt-4">
        <div className="text-center">
          <img src={logoBird} alt="Logo bird" className="h-40 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Вітаю</h1>
          <p className="text-gray-600 mb-6">
            Я Ваш віртуальний тренер і готовий вести Вас до нових перемог!
          </p>
          <p className="text-gray-600 mb-6">Для початку введіть пароль</p>
        </div>
        <Form
          layout="vertical"
          size="large"
          requiredMark={false}
          className="flex flex-col items-center"
          onFinish={mutate}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Введіть пароль",
              },
            ]}
          >
            <Input.OTP
              inputMode="numeric"
              placeholder="Введіть пароль..."
              mask="*"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            disabled={isPending}
          >
            Почати тренування
          </Button>
        </Form>
      </div>
    </div>
  );
};
