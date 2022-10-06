import { format } from "date-fns";

export const DateCell = ({ value }: { value: unknown }) => {
  const date = Date.parse(value as string);
  const monthDay = format(date, "MMM d,");
  const time = format(date, "HH:mm");

  return (
    <div>
      <p style={{ margin: 0 }}> {monthDay}</p>
      <p style={{ margin: 0 }} className="text-muted">
        {time}
      </p>
    </div>
  );
};
