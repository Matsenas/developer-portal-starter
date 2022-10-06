import Link from "next/link";

interface Props {
  title: string;
  linkTitle?: string;
  linkPath?: string;
}

export const FormFooter = ({ title, linkTitle, linkPath }: Props) => {
  return (
    <p className="text-center">
      <small className="text-muted text-center">
        {title}{" "}
        {linkTitle && linkPath && (
          <Link href={linkPath}>
            <a>{linkTitle}</a>
          </Link>
        )}
      </small>
    </p>
  );
};
