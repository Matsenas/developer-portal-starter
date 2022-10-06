import "../../styles/theme.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { Sidenav } from "components/Sidenav/Sidenav";
import { APIProvider } from "providers/APIProvider";
import { UserProvider } from "providers/UserProvider";
import Script from "next/script";
import { useEffect } from "react";
import { isMounted } from "helpers/isMounted";
import { recordPageView, GA_TRACKING_ID } from "../utils/gtag";
import { privatePages } from "routes/Routes";
import dynamic from "next/dynamic";

const Satismeter = dynamic(
  () =>
    import("../components/Satismeter/Satismeter").then(
      (module) => module.Satismeter
    ),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isAuthFlow = privatePages.includes(router.pathname);
  const showSideNav = isAuthFlow && router.pathname !== "/_error";

  return (
    <>
      <GoogleAnalytics measurmentId={GA_TRACKING_ID} />
      <Head>
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />
        <title>NFTPort Dashboard</title>
      </Head>
      <APIProvider>
        <UserProvider>
          <Satismeter />
          {showSideNav && <Sidenav />}
          <Component {...pageProps} />
        </UserProvider>
      </APIProvider>
    </>
  );
}

const GoogleAnalytics = ({ measurmentId }) => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChange = (path) => {
      //@ts-ignore:next-line
      if (!isMounted() || !window.gtag) return;
      recordPageView(path);
    };
    //@ts-ignore:next-line
    isMounted() && window.gtag && onRouteChange(window.location.pathname);
    router.events.on("routeChangeComplete", onRouteChange);
    return () => {
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {measurmentId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurmentId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
        </>
      )}
    </>
  );
};
export default MyApp;
