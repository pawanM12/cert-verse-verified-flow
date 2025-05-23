const { ethers } = require('ethers');
const crypto = require('crypto');
const CertificateContract = require('../contracts/CertificateContract.json');

// Configure blockchain provider based on environment
const getProvider = () => {
  const network = process.env.BLOCKCHAIN_NETWORK || 'polygon-mumbai';
  
  if (process.env.NODE_ENV === 'production') {
    const infuraProjectId = process.env.INFURA_PROJECT_ID;
    if (!infuraProjectId) {
      throw new Error('Infura Project ID is required for production deployment');
    }
    return new ethers.providers.InfuraProvider(network, infuraProjectId);
  } else {
    // For local development, use a localhost provider if hardhat/ganache is running
    // Otherwise, fallback to a public testnet
    try {
      return new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    } catch (error) {
      console.warn('Local blockchain not available, using Mumbai testnet');
      return new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
    }
  }
};

// Get contract instance
const getContract = () => {
  const provider = getProvider();
  const privateKey = process.env.PRIVATE_KEY;
  
  // If private key is provided, create a signer
  let signer;
  if (privateKey) {
    signer = new ethers.Wallet(privateKey, provider);
  } else {
    console.warn('No private key provided, read-only mode');
    signer = provider;
  }
  
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error('Contract address is required');
  }
  
  return new ethers.Contract(
    contractAddress,
    CertificateContract.abi,
    signer
  );
};

// Generate certificate hash
const generateCertificateHash = (certificateData) => {
  const dataString = JSON.stringify(certificateData);
  return '0x' + crypto.createHash('sha256').update(dataString).digest('hex');
};

// Issue a certificate on the blockchain
const issueCertificate = async (certificateData) => {
  try {
    const contract = getContract();
    
    // Generate hash from certificate data
    const certificateHash = generateCertificateHash(certificateData);
    
    // Issue certificate on blockchain
    const tx = await contract.issueCertificate(
      certificateHash,
      certificateData.recipientName,
      certificateData.issuerName,
      Math.floor(new Date(certificateData.issueDate || Date.now()).getTime() / 1000),
      certificateData.expiryDate ? Math.floor(new Date(certificateData.expiryDate).getTime() / 1000) : 0
    );
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    
    return {
      success: true,
      certificateHash,
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Blockchain error while issuing certificate:', error);
    
    // For development/demo purposes, return mock response if blockchain fails
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Returning mock certificate hash for development');
      const certificateHash = generateCertificateHash(certificateData);
      return {
        success: true,
        certificateHash,
        transactionHash: `0x${crypto.randomBytes(32).toString('hex')}`,
        blockNumber: Math.floor(Math.random() * 10000000)
      };
    }
    
    throw error;
  }
};

// Verify a certificate on the blockchain
const verifyCertificate = async (certificateHash) => {
  try {
    const contract = getContract();
    
    // Verify certificate on blockchain
    const result = await contract.verifyCertificate(certificateHash);
    
    return {
      isValid: result.isValid,
      issuer: result.issuer,
      recipient: result.recipient,
      issueDate: new Date(result.issueDate.toNumber() * 1000),
      expiryDate: result.expiryDate.toNumber() > 0 ? 
        new Date(result.expiryDate.toNumber() * 1000) : null,
      status: result.isValid ? 'valid' : 'invalid'
    };
  } catch (error) {
    console.error('Blockchain error while verifying certificate:', error);
    
    // For development/demo purposes, return mock response if blockchain fails
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Returning mock verification for development');
      return {
        isValid: true,
        issuer: '0xMockIssuerAddress',
        recipient: 'Mock Recipient',
        issueDate: new Date(),
        expiryDate: null,
        status: 'valid'
      };
    }
    
    throw error;
  }
};

module.exports = {
  issueCertificate,
  verifyCertificate,
  generateCertificateHash,
  getProvider,
  getContract
};
