import { CSSProperties, FormEvent, ReactNode } from "react";

interface FormWrapProps {
  children: ReactNode;
  onSubmit: () => void;
  styleProp?: CSSProperties;
}
export const FormWrap = ({ children, onSubmit, styleProp }: FormWrapProps) => {
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form noValidate onSubmit={handleFormSubmit} style={styleProp}>
      {children}
    </form>
  );
};
