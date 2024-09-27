import React from "react";
import validator from "validator";
import { Dialog } from "./ui/dialogs/Dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPasswordlessCode,
  resendPasswordlessCode,
  getPasswordlessLoginAttemptInfo,
  consumePasswordlessCode,
} from "supertokens-web-js/recipe/thirdpartypasswordless";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";
import { Button, Input } from "./ui/shared";
import { useEffectOnce } from "usehooks-ts";

const emailOrPhoneSchema = z.object({
  emailOrPhone: z.string().min(1).max(100),
});

type EmailOrPhone = z.infer<typeof emailOrPhoneSchema>;

export function Authentication() {
  const [isInitialMagicLinkSent, setIsInitialMagicLinkSent] = React.useState(false);
  React.useEffect(() => {
    async function hasInitialMagicLinkBeenSent() {
      return (await getPasswordlessLoginAttemptInfo()) !== undefined;
    }

    function checkIfInitialMagicLinkSent() {
      hasInitialMagicLinkBeenSent().then((result) => {
        setIsInitialMagicLinkSent(result);
      });
    }
    checkIfInitialMagicLinkSent();
  }, []);

  const [isDialogSuccessVisible, setIsDialogSuccessVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const authMagicLinkSendResendProps = { setIsDialogSuccessVisible, setErrorMessage, setIsInitialMagicLinkSent };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold underline">Authentication</h1>
      {isInitialMagicLinkSent ? (
        <AuthResentMagicLink {...authMagicLinkSendResendProps} />
      ) : (
        <AuthSendMagicLink {...authMagicLinkSendResendProps} />
      )}

      <Dialog isVisible={isDialogSuccessVisible} onClose={() => setIsDialogSuccessVisible(false)}>
        <Dialog.Header text="Magic Link Sent"></Dialog.Header>
        <Dialog.Body>
          <p className="text-sm">Please check your email for the magic link</p>
        </Dialog.Body>
        <Dialog.Footer>
          <button onClick={() => setIsDialogSuccessVisible(false)}>Close</button>
        </Dialog.Footer>
      </Dialog>

      <Dialog isVisible={!!errorMessage} onClose={() => setErrorMessage("")}>
        <Dialog.Header text="Error happened"></Dialog.Header>
        <Dialog.Body>
          <p className="text-sm">{errorMessage}</p>
        </Dialog.Body>
        <Dialog.Footer>
          <button onClick={() => setErrorMessage("")}>Close</button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
}

type AuthMagiLinkProps = {
  setIsDialogSuccessVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsInitialMagicLinkSent: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AuthSendMagicLink({ setIsDialogSuccessVisible, setErrorMessage }: AuthMagiLinkProps) {
  async function sendMagicLink(emailOrPhone: string) {
    try {
      let response: Awaited<ReturnType<typeof createPasswordlessCode>> | undefined = undefined;

      if (validator.isEmail(emailOrPhone)) {
        response = (await createPasswordlessCode({
          email: emailOrPhone,
        })) as any;
      } else if (validator.isMobilePhone(emailOrPhone)) {
        response = (await createPasswordlessCode({
          phoneNumber: emailOrPhone,
        })) as any;
      }

      if (response?.status === "SIGN_IN_UP_NOT_ALLOWED") {
        // this can happen due to automatic account linking. See that section in our docs.
      } else {
        // Magic link sent successfully.
        setIsDialogSuccessVisible(true);
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you,
        // or if the input email / phone number is not valid.

        setErrorMessage(err.message);
      } else {
        setErrorMessage("Oops! Something went wrong.");
      }
    }
  }

  const { register, handleSubmit, reset } = useForm<EmailOrPhone>({
    resolver: zodResolver(emailOrPhoneSchema),
  });

  const onSubmit = handleSubmit((data) => {
    sendMagicLink(data.emailOrPhone);
    reset();
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <form className="sm:col-start-3 sm:col-span-2 flex flex-col gap-4" onSubmit={onSubmit}>
          <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email or phone
          </label>
          <Input {...register("emailOrPhone")} />
          <Button type="submit">Confirm</Button>
        </form>
      </div>
    </>
  );
}

export function AuthResentMagicLink({
  setIsDialogSuccessVisible,
  setErrorMessage,
  setIsInitialMagicLinkSent,
}: AuthMagiLinkProps) {
  async function resendMagicLink() {
    try {
      const response = await resendPasswordlessCode();

      console.log("resendMagicLink response", response);

      if (response.status === "RESTART_FLOW_ERROR") {
        // this can happen if the user has already successfully logged in into
        // another device whilst also trying to login to this one.
        setErrorMessage("Login failed. Please try again");

        setIsInitialMagicLinkSent(false);
      } else {
        // Magic link resent successfully.

        setIsDialogSuccessVisible(true);
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Oops! Something went wrong.");
      }
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
      <div className="sm:col-start-3 sm:col-span-2 flex flex-col gap-4">
        <Button onClick={() => setIsInitialMagicLinkSent(false)}>Go back</Button>

        <Button onClick={() => resendMagicLink()}>Resend Magic Link</Button>
      </div>
    </div>
  );
}

// TODO: fix RESTART_FLOW_ERROR
// got two responses one success and one RESTART_FLOW_ERROR
// happens because of react strick mode
// react render twice in strict mode
// and request is sent twice
export function AuthenticationVerify() {
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  useEffectOnce(() => {
    async function handleMagicLinkClicked() {
      try {
        setSuccessMessage("");
        setErrorMessage("");

        const response = await consumePasswordlessCode();

        if (response.status === "OK") {
          if (response.createdNewRecipeUser && response.user.loginMethods.length === 1) {
            // user sign up success
            setSuccessMessage("Sign up success. Please wait...");
          } else {
            // user sign in success
            setSuccessMessage("Sign in success. Please wait...");
          }
          setUser(response.user);
        } else {
          // this can happen if the magic link has expired or is invalid
          // or if it was denied due to security reasons in case of automatic account linking
          setErrorMessage("Login failed. Please try again");
        }
      } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you.
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Oops! Something went wrong.");
        }
      }
    }

    handleMagicLinkClicked();
  });

  const closeErrorDialogHandler = () => {
    setErrorMessage("");
    navigate("/");
  };

  return (
    <>
      <Dialog isVisible={!!successMessage} onClose={() => setSuccessMessage("")}>
        <Dialog.Header text="Magic Link Sent"></Dialog.Header>
        <Dialog.Body>
          <p className="text-sm">{successMessage}</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setSuccessMessage("")}>Close</Button>
        </Dialog.Footer>
      </Dialog>

      <Dialog isVisible={!!errorMessage} onClose={() => closeErrorDialogHandler()}>
        <Dialog.Header text="Error happened"></Dialog.Header>
        <Dialog.Body>
          <p className="text-sm">{errorMessage}</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => closeErrorDialogHandler()}>Close</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}
