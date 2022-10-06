export const validateEmail = (email: string) => {
  return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(
    email
  );
};

export const validatePassword = (password: string) => {
  return /^(?=\S{10,128}$)(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])/.test(password);
};

export const PASSWORD_HELP =
  "Password must be between 10-128 characters and contain a combination of lowercase, uppercase and alphanumeric characters.";
