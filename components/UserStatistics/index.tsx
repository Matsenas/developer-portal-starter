import { MintingUsageAndLimits, SettingsRes } from "types/SettingsRes";
import { OverviewCard } from "../overviewCard/OverviewCard";
import styles from "./styles.module.css";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { useUser } from "providers/UserProvider";
import { HeaderFC } from "components/Header/HeaderFC";
import { Container } from "react-bootstrap";
import { Loading } from "components/Loading";
import { Motion } from "components/PageMotion/PageMotion";

export const UserStatisticsPage = () => {
  const { stats, refetch } = useUser();

  useEffect(() => {
    refetch && refetch();
  }, [refetch]);

  if (!stats)
    return (
      <div className="main-content">
        <Loading />
      </div>
    );

  return (
    <div className="main-content">
      <HeaderFC title={`Hey ${stats && stats.profile.name} 👋`} />
      <Container fluid>
        <p className="text-muted">
          A bird's-eye view of what’s happening with your NFTPort account.
        </p>
        <Motion>
          <UserStatistics statistics={stats} />
        </Motion>
      </Container>
    </div>
  );
};

const UserStatistics = ({ statistics }: { statistics: SettingsRes }) => {
  const { data_limits, data_usage } = statistics.data_usage_and_limits;
  const subscribed = Boolean(statistics.subscription_period);

  let subRenewal;
  if (subscribed && statistics.subscription_period) {
    const date = Date.parse(statistics.subscription_period.end_date);
    subRenewal = format(date, "MMM d, yyyy.");
  }

  return (
    <>
      {subRenewal && (
        <p className="text-muted">
          {`NFTPort scheduled an update to your plan on ${subRenewal} (UTC)`}
        </p>
      )}
      <div className={styles.component}>
        {subscribed && (
          <APIRequestsLimit
            amount={data_usage.subscription_data_requests_made}
            maxAmount={data_limits.subscription_data_requests_included}
            isSubscribed={subscribed}
          />
        )}
        <div />
      </div>
      <ChainsOverview
        mintStats={statistics.minting_usage_and_limits}
        isSubscribed={subscribed}
      />
    </>
  );
};

interface OverviewProps {
  amount: number;
  maxAmount: number;
  isSubscribed: boolean;
}

const APIRequestsLimit = ({
  amount = 0,
  maxAmount,
  isSubscribed,
}: OverviewProps) => (
  <OverviewCard
    title="Data API requests this month"
    amount={amount}
    maxAmount={maxAmount}
    onDidClickFooterButton={undefined}
    footerText={`${
      maxAmount - amount
    } requests left this month before additional costs apply.`}
    upgradeLink={!isSubscribed}
  />
);

const NFTsMinted = ({ maxAmount, amount, isSubscribed }: OverviewProps) => {
  const footerText = isSubscribed
    ? `${
        maxAmount - amount
      } NFTs left to mint this month before additional costs apply.`
    : `${maxAmount - amount} mints left in total with your free plan. `;

  return (
    <OverviewCard
      title="NFTs minted"
      amount={amount}
      maxAmount={maxAmount}
      onDidClickFooterButton={undefined}
      footerText={footerText}
      upgradeLink={!isSubscribed}
    />
  );
};

const ContractsDeployed = ({
  amount,
  maxAmount,
  isSubscribed,
}: OverviewProps) => {
  const footerText = isSubscribed
    ? `${
        maxAmount - amount
      } contracts left this month before additional costs apply.`
    : `${maxAmount - amount} contracts left in total with your free plan. `;

  return (
    <OverviewCard
      title="Contracts deployed"
      amount={amount}
      maxAmount={maxAmount}
      onDidClickFooterButton={undefined}
      footerText={footerText}
      upgradeLink={!isSubscribed}
    />
  );
};

const ChainsOverview = ({
  mintStats,
  isSubscribed,
}: {
  mintStats: MintingUsageAndLimits;
  isSubscribed: boolean;
}) => {
  const chains = Object.keys(mintStats);

  if (!chains || !chains.length) return <></>; /// TODO can this happen

  return (
    <>
      {chains.map((chainName) => {
        const { minting_limits, minting_usage } = mintStats[chainName];

        const { contract_deployment_limits, contract_deployment_usage } =
          mintStats[chainName];

        const mintedAmount = isSubscribed
          ? minting_usage.subscription_nfts_minted
          : minting_usage.total_nfts_minted;
        const mintedLimit = isSubscribed
          ? minting_limits.subscription_mints_included
          : minting_limits.max_mints;

        const contractAmount = isSubscribed
          ? contract_deployment_usage.subscription_contracts_deployed
          : contract_deployment_usage.total_contracts_deployed;
        const contractLimit = isSubscribed
          ? contract_deployment_limits.subscription_contracts_included
          : contract_deployment_limits.max_contracts;

        return (
          <React.Fragment key={chainName}>
            <p className="text-muted" style={{ paddingTop: "2rem" }}>
              {chainName.toUpperCase()}
            </p>
            <div className={styles.component}>
              <NFTsMinted
                amount={mintedAmount}
                maxAmount={mintedLimit}
                isSubscribed={isSubscribed}
              />
              <ContractsDeployed
                amount={contractAmount}
                maxAmount={contractLimit}
                isSubscribed={isSubscribed}
              />
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};
