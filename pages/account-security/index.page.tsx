import { HeaderFC } from "components/Header/HeaderFC";
import { Container } from "react-bootstrap";
import { PASSWORD_HELP, validatePassword } from "helpers/Validations";
import { AdminstrationCard } from "components/AdministrationCard/AdministrationCard";
import { Flex } from "components/Flex/Flex";
import { FormWrap } from "components/Form/FormWrap";
import { Input } from "components/InputField/Input";
import { useAPIContext } from "providers/APIProvider";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FormDependentValidator, FormValidator, useForm } from "hooks/useForm";
import { showToast } from "services/ToastService/ToastService";
import { Motion } from "components/PageMotion/PageMotion";

export default () => (
  <div className="main-content">
    <HeaderFC title="Account security" />
    <Container fluid>
      <p className="text-muted">Here you can change your NFTPort password.</p>
      <AccountSecurityView />
    </Container>
  </div>
);

interface FormState {
  currentPass: string;
  newPass: string;
  confirmPass: string;
}

const initialState: FormState = {
  currentPass: "",
  newPass: "",
  confirmPass: "",
};

const validators: FormValidator<FormState> = {
  currentPass: (pass) => {
    const valid = pass.length !== 0;
    if (!valid) return "Please enter your current password.";
  },
  newPass: (pass) => {
    const valid = validatePassword(pass);
    if (!valid) return "Please enter a stronger password.";
  },
};

const dependentValidators: FormDependentValidator<FormState> = {
  confirmPass: (formState) => {
    const { newPass, confirmPass } = formState;
    const valid = newPass === confirmPass;
    if (!valid) return "Passwords don't match.";
  },
};

export const AccountSecurityView = () => {
  const { apiService } = useAPIContext();

  const { formState, formError, formDidChange, handleFormSubmit, clearForm } =
    useForm({
      initialState,
      validators,
      dependentValidators,
      onFormSubmit: handleSubmit,
    });
  const [loading, setLoading] = useState(false);
  const { currentPass, newPass, confirmPass } = formState;
  const {
    newPass: newPassErr,
    confirmPass: confPassErr,
    currentPass: currentPassErr,
  } = formError;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDidChange({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  async function handleSubmit() {
    try {
      setLoading(true);

      await apiService.changePassword(newPass, currentPass);

      showToast({ text: "Password changed." });
    } catch (error) {
      showToast({
        text: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
      clearForm();
    }
  }

  return (
    <Motion>
      <AdminstrationCard title="Change password">
        <FormWrap onSubmit={handleFormSubmit} styleProp={{ maxWidth: "25rem" }}>
          <Flex column gap={1}>
            <Input
              name="currentPass"
              type="password"
              value={currentPass}
              onValueChange={handleChange}
              label="Current password"
              placeholder="Enter your current password"
              error={currentPassErr}
            />
            <Input
              name="newPass"
              type="password"
              value={newPass}
              onValueChange={handleChange}
              label="New password"
              note={PASSWORD_HELP}
              placeholder="Enter your new password"
              error={newPassErr}
            />
            <Input
              name="confirmPass"
              type="password"
              value={confirmPass}
              onValueChange={handleChange}
              label="Confirm password"
              placeholder="Confirm your new password"
              error={confPassErr}
            />
            <Button
              size="lg"
              type="submit"
              style={{
                position: "relative",
                marginTop: "1rem",
                alignSelf: "flex-end",
                padding: "0.5rem 0.75rem",
              }}
              disabled={loading}
            >
              Confirm
            </Button>
          </Flex>
        </FormWrap>
      </AdminstrationCard>
    </Motion>
  );
};
