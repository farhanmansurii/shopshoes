import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HomeNavbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { createTheme, NextUIProvider } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom theme values
const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#1f1f1',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
})
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
