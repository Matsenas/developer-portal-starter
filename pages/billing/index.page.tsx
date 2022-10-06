import { HeaderFC } from "components/Header/HeaderFC";
import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";

const BillingView = dynamic(
  () =>
    import("../../components/BillingView/BillingView").then(
      (module) => module.BillingView
    ),
  { ssr: false }
);
export default () => (
  <div className="main-content">
    <HeaderFC title="Billing" />
    <Container fluid>
      <p className="text-muted">
        You can manage your NFTPort subscription and billing information in the
        Stripe portal, or compare different plans.
      </p>
      <BillingView />
    </Container>
  </div>
);
