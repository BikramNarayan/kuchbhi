import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../contracts/coffeekachakkar.json"; // Update the path to your JSON file
import Home from "../components/Home";

const WalletConnect = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Account not connected");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectToBlockchain = async () => {
      try {
        const { ethereum } = window;
        let provider;
        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const account = accounts[0];
          setAccount(account);
          setConnected(true);
          provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractAddress = "0xC0C2118A92DdcA2382d92066FA404f13251b0090";
          const contractABI = abi.abi;

          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask to use this app.");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    connectToBlockchain();
  }, []);

  const requestAccount = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const account = accounts[0];
        setAccount(account);
      } else {
        alert("Please install MetaMask to use this app.");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const transactionHandle = () => {};

  return (
    <div className="App">
      <header className="App-header">
        {connected ? (
          <>
            <p>Thanks for connecting to MetaMask!</p>

            <>
              <h3 className="connected-account">Connected Account: </h3>
              {account}
              <button className="transactions" onClick={transactionHandle}>
                <Home />
              </button>
            </>
          </>
        ) : (
          <button onClick={requestAccount}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
};

export default WalletConnect;
