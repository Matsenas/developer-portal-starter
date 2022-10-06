import { Flex } from "components/Flex/Flex";

export const CopyCell = ({
  value,
  isLink,
  linkHref,
}: {
  value: string;
  linkHref?: string;
  isLink?: boolean;
}) => (
  <Flex gap={1} alignItems="center">
    {isLink ? (
      <a
        href={linkHref || value}
        onClick={(e) => {
          e.preventDefault();
          window.open(linkHref || value);
        }}
      >
        {value}
      </a>
    ) : (
      <p style={{ margin: 0 }}>{value}</p>
    )}
    <button
      style={{ border: "none", background: "transparent", padding: "0.5rem" }}
      onClick={() => {
        navigator.clipboard.writeText(value as string);
      }}
    >
      <img style={{ margin: 0 }} src="/img/copy.svg" alt="Copy" />
    </button>
  </Flex>
);
