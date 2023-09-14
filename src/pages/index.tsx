import MasterLayout from "@/layouts/MainLayout";
import Head from "next/head";

export default function Home() {
  return (
    <MasterLayout>
      <Head>
        <title>Home page</title>
      </Head>

      <h1>Home</h1>
    </MasterLayout>
  );
}
