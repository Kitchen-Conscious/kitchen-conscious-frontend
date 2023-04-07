import "@/styles/globals.css";
import { MyContextProvider } from "../src/myContext";

export default function App({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  );
}
