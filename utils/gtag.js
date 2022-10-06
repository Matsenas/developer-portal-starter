export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const recordPageView = (path) => {
  window.gtag("event", "page_view", {
    page_title: pathToPageTitle(path),
    page_location: window.location.href,
    page_path: path,
    send_to: GA_TRACKING_ID,
  });
};

export const recordStart = () => {
  window.gtag("js", new Date());
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const recordEvent = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

function pathToPageTitle(path) {
  const camelCase = path
    .replace("/", "")
    .replace(/-([a-z])/g, (c) => c[1].toUpperCase())
    .trim();
  if (!camelCase.length) return "Overview";
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}
