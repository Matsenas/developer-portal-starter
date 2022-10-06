interface Props {
  label: string;
  checked: boolean;
  onDidToggle: (value: boolean) => void;
}

export const Checkbox = ({ label, checked, onDidToggle }: Props) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id="checklistOne"
        onChange={(e) => {
          onDidToggle(e.currentTarget.checked);
        }}
        checked={checked}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};
