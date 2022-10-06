import { FormContainer } from "./Form/FormContainer.tsx";
import { FormFooter } from "./Form/FormFooter.tsx";
import { FormHeader } from "./Form/FormHeader.tsx";
import { FormWrap } from "./Form/FormWrap.tsx";
import { Button, Card } from "react-bootstrap";
import { Input } from "./InputField/Input.tsx";
import { Motion } from "./PageMotion/PageMotion.tsx";

interface FormState {
  email: string;
}

const initialState: FormState = {
  email: "",
};

const SignUp = () => {



  if (false) {
    return (
      <FormContainer>
        <FormWrap>
          <FormHeader
            title="Check your email"
            subtitle="Open your email and click on the link to continue setting up your account."
          />
          <FormFooter title="Didn't receive your confirmation email?" />
          <Button
            size="lg"
            className="w-100 mb-3"
            type="submit"
            disabled={loading}
          >
            Resend
          </Button>
        </FormWrap>
      </FormContainer>
    );
  }

  return (
    <Motion>
      <FormContainer>
        <FormWrap>
          <FormHeader
            title="Signup to get a free API key"
            subtitle="Self sign-up and start building in minutes.
          By developers, for developers."
          />
          <Card style={{ padding: "2rem" }}>
            <form style={{ paddingBottom: "2rem" }}>
              <Input
                name="email"
                value={email}
                label="Email"
              />
            </form>
            <Button
              size="lg"
              className="w-100 mb-3"
              type="submit"
              disabled={loading}
            >
              Sign up
            </Button>
            <FormFooter
              title="Already have an account?"
              linkTitle="Sign in."
            />
          </Card>
        </FormWrap>
      </FormContainer>
    </Motion>
  );
};

export default () => {
  return <SignUp />;
};