import { Flex } from "components/Flex/Flex";
import { Loading } from "components/Loading";
import { useUser } from "providers/UserProvider";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const BillingView = () => {
  const { stats, getStripePortalLink } = useUser();
  const [loading, setLoading] = useState(false);

  if (!stats) return <Loading />;

  return (
    <Flex gap={1}>
      <Button
        className="btn-light"
        onClick={() => {
          window.open("https://www.nftport.xyz/pricing", "_blank");
        }}
      >
        Compare subscription plans
      </Button>
      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          getStripePortalLink()
            .then((portalUrl) => portalUrl && window.open(portalUrl))
            .finally(() => setLoading(false));
        }}
      >
        {Boolean(stats && stats.subscription_period)
          ? "Manage subscription and billing information"
          : "Subscribe"}
      </Button>
    </Flex>
  );
};
