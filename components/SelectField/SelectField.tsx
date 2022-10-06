// @ts-nocheck
import { Form } from "react-bootstrap";
import { Select } from "components/SelectField/Select";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  name: string;
  placeholder?: string;
  initialValue?: Option;
  onSelectChanged: (option: Option, name) => void;
  label?: string;
  error?: string;
  value?: Option | null;
}

export const SelectField = ({
  options,
  placeholder,
  onSelectChanged,
  label,
  name,
  error,
  initialValue,
  value,
}: Props) => {
  return (
    <div>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={(option) => onSelectChanged(option, name)}
        initialValue={initialValue}
      />
      {error && (
        <div style={{ color: "red", padding: "0.3rem 0.5rem" }}>{error}</div>
      )}
    </div>
  );
};
