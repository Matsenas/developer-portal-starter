import { validateEmail } from "helpers/Validations";
import { Flex } from "components/Flex/Flex";
import { FormContainer } from "components/Form/FormContainer";
import { FormFooter } from "components/Form/FormFooter";
import { FormHeader } from "components/Form/FormHeader";
import { FormWrap } from "components/Form/FormWrap";
import { Input } from "components/InputField/Input";
import { Motion } from "components/PageMotion/PageMotion";
import { FormValidator, useForm } from "hooks/useForm";
import { useRouter } from "next/dist/client/router";
import { useAPIContext } from "providers/APIProvider";
import { useUser } from "providers/UserProvider";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default () => {
  return <SignIn />;
};

export interface SignInQuery {
  prefillEmail: string;
}

interface FormState {
  email: string;
  pass: string;
}

const validators: FormValidator<FormState> = {
  email: (email) => {
    const valid = validateEmail(email);
    if (!valid) return "Please enter a valid email.";
  },
  pass: (pass) => {
    const valid = pass.length !== 0;
    if (!valid) return "Password field cannot be empty.";
  },
};

export const SignIn = () => {
  const { refetch } = useUser();
  const { apiService } = useAPIContext();
  const router = useRouter();

  const { formState, formError, formDidChange, handleFormSubmit, setError } =
    useForm({
      initialState: getInitialFormState(),
      validators,
      onFormSubmit: handleSubmit,
    });

  const [loading, setLoading] = useState(false);

  const { email, pass } = formState;
  const { email: emailErr, pass: passErr } = formError;

  function getInitialFormState(): FormState {
    const prefill = router.query.prefillEmail as string;
    return {
      email: prefill || "",
      pass: "",
    };
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    formDidChange({
      [name]: value,
    });
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      await apiService.login(email, pass);
      refetch();
      await router.replace("/");
    } catch (apiError) {
      setLoading(false);
      setError({
        pass: "Email or password is incorrect. Please try again.",
      });
    }
  }

  return (
    <Motion>
      <FormContainer>
        <FormWrap onSubmit={handleFormSubmit}>
          <FormHeader
            title="Welcome to NFTPort Dashboard"
            subtitle="Enter your details to sign in."
          />
          <Card style={{ padding: "2rem" }}>
            <Flex column gap={1} style={{ paddingBottom: "2rem" }}>
              <Input
                name="email"
                type="email"
                value={email}
                onValueChange={handleChange}
                label="Email"
                error={emailErr}
                readonly={loading}
              />
              <Input
                name="pass"
                type="password"
                value={pass}
                onValueChange={handleChange}
                label="Password"
                error={passErr}
                helpLink={{
                  title: "Forgot password?",
                  path: "/forgot-password",
                }}
                readonly={loading}
              />
            </Flex>
            <Button
              size="lg"
              className="w-100 mb-3"
              type="submit"
              disabled={loading}
            >
              Sign in
            </Button>
            <FormFooter
              title="Don’t have an account yet?"
              linkTitle="Sign up."
              linkPath="/sign-up"
            />
          </Card>
        </FormWrap>
      </FormContainer>
    </Motion>
  );
};
