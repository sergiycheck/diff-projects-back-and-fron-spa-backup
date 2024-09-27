import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { REGISTER_USER, RegisterUserMutationResponse } from "./mutations";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { RegisterSchema, registerSchema } from "./types";
import { Button, Input, Card } from "ui-kit";

export function SignUp() {
  const navigate = useNavigate();

  const [mutateSignUp] = useMutation<RegisterUserMutationResponse>(REGISTER_USER);

  const setAuthInfo = useAuthStore((state) => state.setAuthInfo);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutateSignUp({
      variables: {
        registerUserInput: {
          email: data.email,
          password: data.password,
        },
      },
    }).then((result) => {
      const accessToken = result.data?.registerUser?.authInfo?.accessToken;
      const user = result.data?.registerUser?.user;
      if (!accessToken || !user) {
        return;
      }

      setAuthInfo({ accessToken });
      setUser(user);
      navigate("/");
    });

    reset();
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <Card bg="bg-none" className="sm:col-span-3 md:col-start-3 md:col-span-2">
          <Card.Body>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <label htmlFor="email-input" className="block text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <Input {...register("email")} id="email-input" />
              <label htmlFor="password-input" className="block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <Input {...register("password")} type="password" id="password-input" />
              <label
                htmlFor="repeat-password-input"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Repeat password
              </label>
              <Input {...register("confirmPassword")} type="password" id="repeat-password-input" />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              <Button type="submit">Confirm</Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
