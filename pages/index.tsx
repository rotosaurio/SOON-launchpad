import React from 'react';
import Image from "next/image";
import localFont from "next/font/local";
import WalletConnectButton from '../components/WalletConnectButton';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold mb-4">
          SOON launchpad
        </h1>
        <p className="text-xl mb-6">
          Conecta tu wallet para comenzar
        </p>
        <WalletConnectButton />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mt-8">
          <li className="mb-2">
            Conecta tu wallet de Solana.
          </li>
          <li>Explora las funcionalidades de la aplicación.</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://solana.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprende más sobre Solana
        </a>
      </footer>
    </div>
  );
}
