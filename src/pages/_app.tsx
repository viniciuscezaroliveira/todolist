import Logout from "@/app/components/Logout";
import { UserProvider } from "@/app/providers/userContext";
import "../app/globals.css";

type Props = {
  Component: any;
  pageProps: any;
};
export default function App({ Component, pageProps }: Props) {
  return (
    <UserProvider>
      <Logout />
      <Component {...pageProps} />
    </UserProvider>
  );
}
