
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

// Define MetaMask ethereum provider type
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextType {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  
  const { updateWalletAddress, user } = useAuth();

  // Initialize provider
  useEffect(() => {
    const initProvider = async () => {
      // Check if MetaMask is installed
      if (window.ethereum) {
        try {
          // Create a Web3Provider wrapped around the window.ethereum object
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          setProvider(web3Provider);

          // Check if already connected
          const accounts = await web3Provider.listAccounts();
          if (accounts.length > 0) {
            handleAccountsChanged(accounts);
          }

          // Listen for account changes
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          
          // Listen for chain changes
          window.ethereum.on('chainChanged', (chainIdHex: string) => {
            console.log("Chain changed to:", chainIdHex);
            // Convert hex chainId to number
            const chainIdNum = parseInt(chainIdHex, 16);
            setChainId(chainIdNum);
            // Refresh page is recommended by MetaMask to ensure proper context
            window.location.reload();
          });

          // Get current chain ID
          const network = await web3Provider.getNetwork();
          setChainId(network.chainId);

          console.log("Wallet initialized with chainId:", network.chainId);
          
          return () => {
            if (window.ethereum) {
              window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
              window.ethereum.removeListener('chainChanged', () => {
                console.log('Chain changed');
              });
            }
          };
        } catch (error) {
          console.error('Failed to initialize provider:', error);
          toast({
            title: "Wallet Initialization Error",
            description: "There was a problem connecting to your wallet.",
            variant: "destructive",
          });
        }
      } else {
        console.log("MetaMask not installed");
      }
    };

    initProvider();
  }, []);

  // Update wallet address on the backend when user connects
  useEffect(() => {
    const updateBackendWalletAddress = async () => {
      if (isConnected && address && user && (!user.walletAddress || user.walletAddress !== address)) {
        try {
          await updateWalletAddress(address);
          toast({
            title: "Wallet Connected",
            description: `Wallet ${address.substring(0, 6)}...${address.substring(address.length - 4)} linked to your account.`,
          });
        } catch (error) {
          console.error('Failed to update wallet address on backend:', error);
          toast({
            title: "Update Failed",
            description: "Failed to link wallet to your account. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    updateBackendWalletAddress();
  }, [isConnected, address, user, updateWalletAddress]);

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // Disconnected
      setIsConnected(false);
      setAddress(null);
      setBalance(null);
      setSigner(null);
      console.log("Wallet disconnected");
    } else {
      // Connected
      const account = accounts[0];
      setAddress(account);
      setIsConnected(true);
      console.log(`Wallet connected: ${account}`);
      
      if (provider) {
        const newSigner = provider.getSigner();
        setSigner(newSigner);
        
        try {
          const network = await provider.getNetwork();
          setChainId(network.chainId);
          console.log(`Connected to network with chainId: ${network.chainId}`);
          
          const balanceWei = await provider.getBalance(account);
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setBalance(parseFloat(balanceEth).toFixed(4));
          console.log(`Wallet balance: ${balanceEth} ETH`);
        } catch (error) {
          console.error('Error fetching account details:', error);
        }
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask browser extension to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsConnecting(true);
      console.log("Requesting wallet connection...");
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      console.log("Accounts received:", accounts);
      handleAccountsChanged(accounts);
      
      // Request connection to Mumbai testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }], // Mumbai testnet chainId
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Mumbai Testnet',
                  nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18
                  },
                  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                },
              ],
            });
          } catch (addError) {
            console.error('Error adding Mumbai network:', addError);
          }
        }
      }

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    console.log("Disconnecting wallet...");
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setSigner(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        chainId,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        provider,
        signer
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
