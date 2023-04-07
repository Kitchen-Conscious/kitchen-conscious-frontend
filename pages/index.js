// Screen size: 1200px x 400px

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NavBar from "../src/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Kitchen Conscious</title>
        <meta name="description" content="Manage your shared kitchen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <div className="flex flex-row justify-center mt-14">
          <div className="text-4xl font-semibold text-center mr-40 my-auto">
            Keep track of your{" "}
            <span className="text-green-600">fridge!</span>
          </div>
          <Image src="/hero.png" width={300} height={300} />
        </div>
      </main>
    </>
  );
}
