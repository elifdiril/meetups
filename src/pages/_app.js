import "@/styles/globals.css";
import Layout from "../components/layout/Layout";
import { NotificationProvider } from "@/context/NotificationContext";

export default function App({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}
