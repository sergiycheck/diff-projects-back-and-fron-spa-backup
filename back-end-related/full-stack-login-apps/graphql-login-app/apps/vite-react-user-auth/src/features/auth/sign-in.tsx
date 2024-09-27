import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Card } from "ui-kit";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, LoginUserMutationResponse } from "./mutations";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { SignInSchema, signInSchema } from "./types";

export function SignIn() {
  const navigate = useNavigate();

  const [mutateSignIn] = useMutation<LoginUserMutationResponse>(LOGIN_USER);

  const setAuthInfo = useAuthStore((state) => state.setAuthInfo);
  const setUser = useAuthStore((state) => state.setUser);

  const { register, handleSubmit, reset } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutateSignIn({
      variables: {
        loginUserInput: {
          email: data.email,
          password: data.password,
        },
      },
    }).then((result) => {
      const accessToken = result.data?.loginUser?.authInfo?.accessToken;
      const user = result.data?.loginUser?.user;
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
              <label htmlFor="password-input" className="block  text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <Input {...register("password")} type="password" id="password-input" />

              <Button type="submit">Confirm</Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
