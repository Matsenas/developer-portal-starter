import { CentralMessage } from "components/CentralMessage/CentralMessage";

export default () => {
  return (
    <CentralMessage title="Payment failed">
      <p style={{ textAlign: "center" }}>
        Click{" "}
        {
          <StrongLink href="https://www.nftport.xyz/subscription/grow">
            here
          </StrongLink>
        }{" "}
        to try again or get in touch with our{" "}
        {
          <StrongLink href="https://www.nftport.xyz/contact">
            support
          </StrongLink>
        }{" "}
        or write to support on{" "}
        {
          <StrongLink href="https://discord.com/invite/K8nNrEgqhE">
            Discord.
          </StrongLink>
        }
      </p>
    </CentralMessage>
  );
};

const StrongLink = ({ href, children }) => {
  return (
    <a href={href} target="_blank">
      <strong
        style={{
          color: "black",
          textDecoration: "underline",
          textDecorationColor: "black",
        }}
      >
        {children}
      </strong>
    </a>
  );
};
