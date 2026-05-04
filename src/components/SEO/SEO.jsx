import { Helmet } from "react-helmet-async";

const BASE_URL = "https://northwind.io";
const DEFAULT_IMAGE = BASE_URL + "/og-image.jpg";

export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const fullTitle = title
    ? title + " | NorthWind IT Services"
    : "NorthWind | IT Services & Consulting";

  const fullCanonical = canonical ? BASE_URL + canonical : BASE_URL;

  const metaDescription =
    description ||
    "NorthWind delivers end-to-end IT services and consulting — cloud solutions, cybersecurity, software development, and 24/7 support for businesses across Europe and North America.";

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={metaDescription} />
      <meta name="robots"             content="index, follow" />
      <link rel="canonical"           href={fullCanonical} />

      {/* ── Open Graph (Facebook, LinkedIn) ── */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={fullCanonical} />
      <meta property="og:site_name"   content="NorthWind IT Services" />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image"       content={image} />

      {/* ── Extra ── */}
      <meta name="theme-color"         content="#38bdf8" />
      <meta name="author"              content="NorthWind IT Services" />
      <meta name="keywords"            content="IT services, IT consulting, cloud solutions, cybersecurity, managed IT support, software development, Albania, Europe" />
    </Helmet>
  );
}