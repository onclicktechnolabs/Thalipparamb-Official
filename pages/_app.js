// import node module libraries
import Head from "next/head";
// import { appWithTranslation } from "next-i18next";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import theme style scss file
import "styles/theme.scss";

// import default layouts
import DefaultDashboardLayout from "layouts/DefaultDashboardLayout";
// import AuthProvider from "context/AuthProvider";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, locale, ...pageProps } }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Thalipparamb";
  const description = "Thalipparamb wesite";
  const keywords = "thalipparamb,Thalipparamb panchayath";

  // Identify the layout, which will be applied conditionally
  const Layout =
    Component.Layout ||
    (router.pathname.includes("dashboard")
      ? router.pathname.includes("instructor") ||
        router.pathname.includes("student")
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  const timeZone = "Asia/Kolkata";

  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
        }}
      />
      <NextIntlClientProvider
        locale={locale || "ml"}
        messages={pageProps.messages}
        timeZone={timeZone}
      >
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </SessionProvider>
      </NextIntlClientProvider>
      <ToastContainer />
    </SSRProvider>
  );
}

export default MyApp;

// appWithTranslation(MyApp);
