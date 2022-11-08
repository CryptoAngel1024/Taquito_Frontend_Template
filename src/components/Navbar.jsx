import "../index.css";
import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
} from "../utils/wallet";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [wallet, setWallet] = useState(null);

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
  };

  useEffect(() => {
    const func = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWallet(account.address);
      }
    };
    func();
  }, []);

  return (
    <nav className="bg-gray-800 h-14 flex items-center px-10 justify-between">
      <div className="flex-1 space-x-4">
        <a href="https://mutantgeckogang.xyz" target="_blank" className="font-bold text-white pr-10">
          MGG
        </a>
        <a
          href="#!"
          className="bg-black text-gray-200 px-4 py-2 text-sm font-semibold rounded-sm"
        >
          Mint Portal
        </a>
        <a
          href="https://objkt.com/collection/mutantgeckogang" target="_blank" 
          className="cursor-pointer text-gray-300 px-4 py-2 text-sm font-semibold rounded-sm hover:bg-gray-700 hover:text-gray-200"
        >
          On Objkt
        </a>
        <a
          href="https://rarible.com/mutantgeckogang" target="_blank" 
          className="cursor-pointer text-gray-300 px-4 py-2 text-sm font-semibold rounded-sm hover:bg-gray-700 hover:text-gray-200"
        >
          On Rarible
        </a>
        <a
          href="https://better-call.dev/mainnet/KT1Gxkok7KpNPanU9nGdwoYcwAQ8n2aTuV7M" target="_blank"
          className="cursor-pointer text-gray-300 px-4 py-2 text-sm font-semibold rounded-sm hover:bg-gray-700 hover:text-gray-200"
        >
          Crowdsale Contract
        </a>
        <a
          href="#!"
          className="text-gray-300 px-4 py-2 text-sm font-semibold rounded-sm"
        >
          Provenance CID: QmUQJQ2fYb8HEHni9mWnP2Tthb14hi6HEqmTR9ZLUfw8FA
        </a>
      </div>
      <div>
        <button
          onClick={wallet ? handleDisconnectWallet : handleConnectWallet}
          className="bg-green-500 px-6 py-2 rounded-sm text-xs font-semibold text-white cursor-pointer"
        >
          💳{" "}
          {wallet
            ? wallet.slice(0, 4) +
              "..." +
              wallet.slice(wallet.length - 4, wallet.length)
            : "Connect"}
        </button>
      </div>
    </nav>
  );
}
