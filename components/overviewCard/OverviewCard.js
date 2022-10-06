import { useState, useEffect } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { Flex } from "../Flex/Flex";
import { useUser } from "providers/UserProvider";
import Link from "next/link";

export function OverviewCard({
  title,
  amount,
  maxAmount,
  footerText,
  onDidClickFooterButton,
  upgradeLink,
  ...props
}) {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { stripePortalUrl } = useUser();

  useEffect(() => {
    setTimeout(() => setProgressPercentage((amount / maxAmount) * 100), 100);
  }, []);

  return (
    <Card {...props}>
      <Card.Body>
        <h6 className="text-uppercase text-muted mb-4">{title}</h6>
        <Flex gap={0.5} column>
          <div className="h2 me-2 mb-0">{`${amount} / ${maxAmount}`}</div>
          <ProgressBar
            className="progress-sm mb-4"
            now={progressPercentage}
            style={{ height: "8px" }}
          />
        </Flex>
        <p className="text-muted m-0">
          {footerText}
          {upgradeLink && stripePortalUrl && (
            <Link href={stripePortalUrl}>
              <a target="_blank" onClick={() => window.open(stripePortalUrl)}>
                Upgrade now.
              </a>
            </Link>
          )}
        </p>
      </Card.Body>
    </Card>
  );
}
