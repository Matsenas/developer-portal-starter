import {
  PASSWORD_HELP,
  validateEmail,
  validatePassword,
} from "helpers/Validations";
import { Flex } from "components/Flex/Flex";
import { FormContainer } from "components/Form/FormContainer";
import { FormFooter } from "components/Form/FormFooter";
import { FormHeader } from "components/Form/FormHeader";
import { FormWrap } from "components/Form/FormWrap";
import { Input } from "components/InputField/Input";
import { Motion } from "components/PageMotion/PageMotion";
import { SelectField } from "components/SelectField/SelectField";
import { FormDependentValidator, FormValidator, useForm } from "hooks/useForm";
import { SignupForm } from "types/SignupForm";
import { useRouter } from "next/router";
import { useAPIContext } from "providers/APIProvider";
import { useUser } from "providers/UserProvider";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Pages } from "routes/Routes";

export default () => {
  return <SignUpNewUser />;
};

const initialState: SignupForm = {
  name: "",
  email: "",
  pass: "",
  confirmPass: "",
  company: "",
  role: "",
  teamSize: "",
  project: "",
};

const validators: FormValidator<SignupForm> = {
  name: (name) => {
    const valid = name.length !== 0;
    if (!valid) return "Invalid name.";
  },
  email: (email) => {
    const valid = validateEmail(email);
    if (!valid) return "Please enter a valid email.";
  },
  pass: (pass) => {
    const valid = validatePassword(pass);
    if (!valid) return "Please enter a stronger password.";
  },
  company: (company) => {
    const valid = company.length !== 0;
    if (!valid) return "Please describe your company or project.";
  },
  role: (role) => {
    const valid = role.length !== 0;
    if (!valid) return "Please select a role.";
  },
  teamSize: (teamSize) => {
    const valid = teamSize.length !== 0;
    if (!valid) return "Please select a team size.";
  },
  project: (project) => {
    const valid = project.length !== 0;
    if (!valid) return "Please select a project.";
  },
};

const dependentValidators: FormDependentValidator<SignupForm> = {
  confirmPass: (formState) => {
    const { pass, confirmPass } = formState;
    const valid = pass === confirmPass;
    if (!valid) return "Passwords don't match.";
  },
};

const SignUpNewUser = () => {
  const { refetch } = useUser();
  const router = useRouter();
  const { apiService } = useAPIContext();

  const { formState, formError, formDidChange, handleFormSubmit, setError } =
    useForm<SignupForm>({
      initialState: getInitialFormState(),
      validators,
      onFormSubmit: handleSubmit,
      dependentValidators,
    });

  const { name, email, pass, confirmPass, company } = formState;
  const {
    name: nameErr,
    email: emailErr,
    pass: passErr,
    confirmPass: confPassErr,
    company: companyErr,
    role: roleErr,
    teamSize: teamSizeErr,
    project: projectErr,
  } = formError;

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formDidChange({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSelectChange = (option, name) => {
    formDidChange({
      [name]: option.value,
    });
  };

  function getInitialFormState(): SignupForm {
    const prefill = router.query.prefillEmail as string;
    return {
      ...initialState,
      email: prefill || "",
    };
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await apiService.signup(formState);

      await apiService.login(email, pass);

      refetch();

      router.replace(Pages.OVERVIEW);
    } catch (error) {
      setLoading(false);
      setError({
        project: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Motion>
      <FormContainer>
        <FormWrap onSubmit={handleFormSubmit}>
          <FormHeader
            title="Signup to get a free API key"
            subtitle="Self sign-up and start building in minutes.
          By developers, for developers."
          />
          <Card style={{ padding: "2rem" }}>
            <Flex column gap={1} style={{ paddingBottom: "2rem" }}>
              <Input
                name="name"
                type="text"
                value={name}
                onValueChange={handleChange}
                label="Name"
                placeholder="Name"
                error={nameErr}
              />
              <Input
                name="email"
                type="email"
                value={email}
                onValueChange={handleChange}
                label="Email"
                placeholder="Email"
                error={emailErr}
              />
              <Input
                name="pass"
                type="password"
                value={pass}
                onValueChange={handleChange}
                label="Password"
                placeholder="Password"
                note={PASSWORD_HELP}
                error={passErr}
              />
              <Input
                name="confirmPass"
                type="password"
                value={confirmPass}
                onValueChange={handleChange}
                label="Confirm password"
                placeholder="Confirm password"
                error={confPassErr}
              />
              <Input
                name="company"
                value={company}
                onValueChange={handleChange}
                label="Company"
                placeholder="Your company or project"
                error={companyErr}
              />
              <SelectField
                options={roleOptions}
                name="role"
                label="Role"
                placeholder="Which best describes your role?"
                onSelectChanged={handleSelectChange}
                error={roleErr}
              />
              <SelectField
                options={teamSizeOptions}
                label="Team Size"
                name="teamSize"
                placeholder="How large is your company/team?"
                onSelectChanged={handleSelectChange}
                error={teamSizeErr}
              />
              <SelectField
                options={projectOptions}
                label="Project"
                name="project"
                placeholder="What are you building with NFTs?"
                onSelectChanged={handleSelectChange}
                error={projectErr}
              />
            </Flex>
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
              linkPath={Pages.SIGN_IN}
            />
          </Card>
        </FormWrap>
      </FormContainer>
    </Motion>
  );
};

const roleOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "executive/founder", label: "Executive/Founder" },
  { value: "artist/creator", label: "Artist/Creator" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "customer service", label: "Customer service" },
  { value: "research", label: "Research" },
  { value: "student", label: "Student" },
];

const teamSizeOptions = [
  { value: "1", label: "1" },
  { value: "2-10", label: "2-10" },
  { value: "10-25", label: "10-25" },
  { value: "25-100", label: "25-100" },
  { value: "100-", label: "100+" },
];

const projectOptions = [
  { value: "art", label: "Art" },
  { value: "collection", label: "Collection" },
  { value: "social media", label: "Social media" },
  { value: "finance", label: "Finance" },
  { value: "gaming", label: "Gaming" },
  { value: "metaverse", label: "Metaverse" },
  { value: "sports", label: "Sports" },
  {
    value: "data analytics/intelligence",
    label: "Data analytics/intelligence",
  },
  { value: "marketplace", label: "Marketplace" },
  {
    value: "marketing and rewards",
    label: "Marketing and rewards (e.g. giveaways)",
  },
  { value: "utility", label: "Utility (e.g. tickets, access tokens)" },
  { value: "intellectual property", label: "Intellectual property" },
  { value: "minting app", label: "Minting app" },

  { value: "mobile app", label: "Mobile app" },
  { value: "real world assets", label: "Real world assets" },
  { value: "music", label: "Music" },
  { value: "plugin", label: "Plugin" },
  { value: "nft tooling", label: "NFT tooling" },
  { value: "design tooling", label: "Design tooling" },

  { value: "dao", label: "DAO" },
  { value: "other", label: "Other" },
];
