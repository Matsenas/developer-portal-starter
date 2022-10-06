import Script from "next/script";
import { useUser } from "providers/UserProvider";
import { useEffect, useState } from "react";
import { Profile } from "types/SettingsRes";

enum SatismeterEvent {
  PricingClicked = "pricing_clicked", // TODO change when finalized
}

export function reportSatismeterEvent(
  eventName: SatismeterEvent,
  user: Profile
) {
  //@ts-ignore:next-line
  if (!window.satismeter) return;

  if (!process.env.NEXT_PUBLIC_SATISMETER_ID) return;

  //@ts-ignore:next-line
  window.satismeter("track", {
    writeKey: process.env.NEXT_PUBLIC_SATISMETER_ID,
    userId: user.email,
    traits: {
      name: user.name,
      createdAt: user.joined_date,
    },
    event: eventName,
  });
}

export function Satismeter() {
  const { stats } = useUser();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    scriptLoaded && updateSatismeterUser(stats ? stats.profile : undefined);
  }, [stats, scriptLoaded]);

  if (!process.env.NEXT_PUBLIC_SATISMETER_ID) return <></>;
  return (
    <Script
      id="satismeter-init"
      strategy="afterInteractive"
      src="https://app.satismeter.com/js"
      dangerouslySetInnerHTML={{
        __html: `
        (function() {
          window.satismeter = window.satismeter || function() {
              (window.satismeter.q = window.satismeter.q || []).push(arguments);
          };
          window.satismeter.l = 1 * new Date();
      })();        `,
      }}
      onLoad={() => {
        setScriptLoaded(true);
      }}
    />
  );
}

const updateSatismeterUser = (profile: Profile | undefined) => {
  //@ts-ignore:next-line
  if (!window || !window.satismeter || !process.env.NEXT_PUBLIC_SATISMETER_ID)
    return;

  const args = !!profile
    ? {
        writeKey: process.env.NEXT_PUBLIC_SATISMETER_ID,
        userId: profile.email,
        traits: {
          name: profile.name,
          createdAt: profile.joined_date,
        },
      }
    : { writeKey: process.env.NEXT_PUBLIC_SATISMETER_ID, userId: null };

  //@ts-ignore:next-line
  window.satismeter(args);
};
