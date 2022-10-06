import { CentralMessage } from "components/CentralMessage/CentralMessage";
import Image from "next/image";

export default () => {
  return (
    <CentralMessage
      title="Your payment was successfull."
      image={
        <div style={{ paddingBottom: "1rem" }}>
          <Image src="/img/sucess.svg" width={50} height={50} />
        </div>
      }
    >
      <p style={{ textAlign: "center" }}>
        Your account has been upgraded to the
        {<i> Growth </i>}
        plan.
      </p>
    </CentralMessage>
  );
};
