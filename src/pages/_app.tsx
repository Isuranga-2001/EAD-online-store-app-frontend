import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/contexts/userContext";
import RouteProtector from "@/components/RouteProtector";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RouteProtector>
        <Component {...pageProps} />
      </RouteProtector>
    </UserProvider>
  );
}
