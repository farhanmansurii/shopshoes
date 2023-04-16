import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HomeNavbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} >
      <HomeNavbar />
      <Component {...pageProps} />
      <Footer />
    </ClerkProvider>
  )
};

export default api.withTRPC(MyApp);
