import dynamic from "next/dynamic";

const UserStatisticsPage = dynamic(
  () =>
    import("../components/UserStatistics").then(
      (module) => module.UserStatisticsPage
    ),
  {
    ssr: false,
  }
);

export default () => {
  return <UserStatisticsPage />;
};
