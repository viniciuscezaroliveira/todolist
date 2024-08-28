import { UserProvider } from "@/app/providers/userContext";
import "../app/globals.css";

type Props = {
  Component: any;
  pageProps: any;
};
export default function App({ Component, pageProps }: Props) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
