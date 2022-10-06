import { PASSWORD_HELP, validatePassword } from "helpers/Validations";
import { Flex } from "components/Flex/Flex";
import { FormContainer } from "components/Form/FormContainer";
import { FormFooter } from "components/Form/FormFooter";
import { FormHeader } from "components/Form/FormHeader";
import { FormWrap } from "components/Form/FormWrap";
import { Input } from "components/InputField/Input";
import { Motion } from "components/PageMotion/PageMotion";
import { FormDependentValidator, FormValidator, useForm } from "hooks/useForm";
import jwtDecode from "jwt-decode";
import { PasswordResetToken } from "types/PassResetToken";
import { useRouter } from "next/dist/client/router";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Pages } from "routes/Routes";

export default () => {
  return <SetupPasswordForm />;
};

interface FormState {
  pass: string;
  confirmPass: string;
}

const initialState: FormState = {
  pass: "",
  confirmPass: "",
};

const validators: FormValidator<FormState> = {
  pass: (pass) => {
    const valid = validatePassword(pass);
    if (!valid) return "Please enter a stronger password.";
  },
};

const dependentValidators: FormDependentValidator<FormState> = {
  confirmPass: (formState) => {
    const { pass, confirmPass } = formState;
    const valid = pass === confirmPass;
    if (!valid) return "Passwords don't match.";
  },
};

export const SetupPasswordForm = () => {
  const { apiService } = useAPIContext();
  const router = useRouter();

  const { token } = router.query;

  const { formState, formError, formDidChange, handleFormSubmit, setError } =
    useForm({
      initialState,
      validators,
      dependentValidators,
      onFormSubmit: handleSubmit,
    });

  const { pass, confirmPass } = formState;
  const { pass: passError, confirmPass: confPassError } = formError;

  const [disabled, setDisabled] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const validateToken = async () => {
    try {
      const jwt = Buffer.from(token as string, "base64").toString();
      const decodedToken = jwtDecode(jwt) as PasswordResetToken;
      const isExpired =
        decodedToken.exp < Math.round(new Date().getTime() / 1000);
      setTokenExpired(isExpired);
    } catch (error) {
      setTokenExpired(true);
    }
  };
  useEffect(() => {
    token && validateToken();
    setDisabled(!token);
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDidChange({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  async function handleSubmit() {
    try {
      setDisabled(true);

      await apiService.setupPassword(token as string, pass);

      router.replace(Pages.SIGN_IN);
    } catch (error) {
      setDisabled(false);
      setError({
        confirmPass: "Something went wrong. Please try again.",
      });
    }
  }

  if (tokenExpired) {
    return (
      <Motion>
        <FormContainer>
          <FormHeader
            title="Token invalid"
            subtitle="Password reset token is either invalid or expired."
          />
          <FormFooter
            title="Request a"
            linkPath="/forgot-password"
            linkTitle="new one."
          />
        </FormContainer>
      </Motion>
    );
  }

  return (
    <Motion>
      <FormContainer>
        <FormWrap onSubmit={handleFormSubmit}>
          <FormHeader
            title="Reset your password"
            subtitle="Enter your new password."
          />
          <Card style={{ padding: "2rem" }}>
            <Flex column gap={1} style={{ paddingBottom: "2rem" }}>
              <Input
                name="pass"
                type="password"
                value={pass}
                onValueChange={handleChange}
                label="Password"
                error={passError}
              />
              <Input
                name="confirmPass"
                type="password"
                value={confirmPass}
                onValueChange={handleChange}
                label="Confirm password"
                note={PASSWORD_HELP}
                error={confPassError}
              />
            </Flex>
            <Button
              size="lg"
              className="w-100 mb-3"
              type="submit"
              disabled={disabled}
            >
              Create password
            </Button>
            <FormFooter
              title="Already have an account?"
              linkTitle="Sign in"
              linkPath={Pages.SIGN_IN}
            />
          </Card>
        </FormWrap>
      </FormContainer>
    </Motion>
  );
};
