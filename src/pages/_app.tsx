import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/contexts/userContext";
import { GeneralContextProvider } from "@/contexts/generalContext";
import { CartProvider } from "@/contexts/cartContext";
import RouteProtector from "@/components/RouteProtector";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeneralContextProvider>
      <UserProvider>
        <CartProvider>
          <RouteProtector>
            <Component {...pageProps} />
          </RouteProtector>
        </CartProvider>
      </UserProvider>
    </GeneralContextProvider>
  );
}
