import { FormHeader } from "components/Form/FormHeader";
import { Button, Card } from "react-bootstrap";
import { Input } from "components/InputField/Input";
import { FormWrap } from "components/Form/FormWrap";
import { FormContainer } from "components/Form/FormContainer";
import { FormFooter } from "components/Form/FormFooter";
import { useState } from "react";
import { useAPIContext } from "providers/APIProvider";
import { validateEmail } from "helpers/Validations";
import { showToast } from "services/ToastService/ToastService";
import { Motion } from "components/PageMotion/PageMotion";
import { FormValidator, useForm } from "hooks/useForm";
import { Pages } from "routes/Routes";

export default () => {
  return <ForgotPasswordForm />;
};

interface FormState {
  email: string;
}

const initialState: FormState = {
  email: "",
};

const validators: FormValidator<FormState> = {
  email: (email) => {
    const valid = validateEmail(email);
    if (!valid) return "Please enter a valid email.";
  },
};

const ForgotPasswordForm = () => {
  const { apiService } = useAPIContext();

  const { formState, formError, formDidChange, handleFormSubmit, setError } =
    useForm({
      initialState,
      validators,
      onFormSubmit: handleSubmit,
    });

  const { email } = formState;
  const { email: emailErr } = formError;

  const [loading, setLoading] = useState<boolean>();
  const [linkSent, setLinkSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDidChange({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  async function handleSubmit() {
    try {
      setLoading(true);
      await apiService.validateEmail(email);
      setLinkSent(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError({
        email: "Something went wrong. Please try again.",
      });
    }
  }

  async function handleResend() {
    try {
      setLoading(true);
      await apiService.validateEmail(email);
      showToast({
        text: `Confirmation mail resent to ${email}`,
        type: "info",
      });
    } catch (error) {
      setError({
        email: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (linkSent) {
    return (
      <FormContainer>
        <FormHeader
          title="Check your email"
          subtitle="Open your email and click on the link to continue setting up your account."
        />
        <FormFooter title="Didn't receive your confirmation email?" />
        <Button
          size="lg"
          className="w-100 mb-3"
          type="submit"
          onClick={handleResend}
          disabled={loading}
        >
          Resend
        </Button>
      </FormContainer>
    );
  }

  return (
    <Motion>
      <FormContainer>
        <FormWrap onSubmit={handleFormSubmit}>
          <FormHeader
            title="Reset your password"
            subtitle="Enter your email to receive a password setup link."
          />
          <Card style={{ padding: "2rem" }}>
            <div style={{ paddingBottom: "2rem" }}>
              <Input
                name="email"
                type="email"
                value={email}
                onValueChange={handleChange}
                label="Email Address"
                error={emailErr}
              />
            </div>
            <Button
              disabled={loading}
              size="lg"
              className="w-100 mb-3"
              type="submit"
            >
              Confirm Email
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
