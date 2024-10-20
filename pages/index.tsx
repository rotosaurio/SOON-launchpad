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
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-[family-name:var(--font-geist-sans)]`}
    >
      <header className="flex justify-between items-center p-6">
        <Image
          className="invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          priority
        />
        <WalletConnectButton />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          SOON Launchpad
        </h1>
        <p className="text-xl mb-10 max-w-2xl text-gray-300">
          Discover and participate in token pre-sales with our easy-to-use platform. Connect your wallet to get started.
        </p>

        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">Active Pre-sales</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800">
              <div>
                <h3 className="font-semibold text-gray-100">Token XYZ</h3>
                <p className="text-sm text-gray-400">Ends in 2 days</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Participate
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800">
              <div>
                <h3 className="font-semibold text-gray-100">Token DEF</h3>
                <p className="text-sm text-gray-400">Ends in 5 days</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Participate
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-100">Upcoming Pre-sales</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800">
              <div>
                <h3 className="font-semibold text-gray-100">Token ABC</h3>
                <p className="text-sm text-gray-400">Starts in 5 days</p>
              </div>
              <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded hover:bg-blue-900 hover:text-blue-300 transition-colors">
                Remind Me
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800">
              <div>
                <h3 className="font-semibold text-gray-100">Token GHI</h3>
                <p className="text-sm text-gray-400">Starts in 7 days</p>
              </div>
              <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded hover:bg-blue-900 hover:text-blue-300 transition-colors">
                Remind Me
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center items-center p-6 text-sm text-gray-400">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-gray-300"
          href="https://solana.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about Solana
        </a>
      </footer>
    </div>
  );
}