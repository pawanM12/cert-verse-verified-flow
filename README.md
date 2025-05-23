
# DeCertify - Decentralized Certificate Verification System

A modern, blockchain-powered certificate verification system built with the MERN stack that ensures immutable, instantly verifiable digital credentials.

## 🚀 Features

- **Decentralized Verification**: Certificates stored immutably on blockchain
- **Instant Verification**: Verify any certificate in seconds
- **User-Friendly Interface**: Modern, responsive React frontend
- **Secure Storage**: MongoDB database with blockchain integration
- **Multi-Role Support**: Support for issuers, recipients, and verifiers
- **Real-time Status**: Live transaction and verification status updates

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** for certificate metadata storage
- **Mongoose** ODM for database operations
- **JWT** authentication
- **Blockchain integration** (Ethereum/Polygon)

### Blockchain
- **Smart Contracts** for certificate storage
- **Ethers.js** for blockchain interaction
- **MetaMask** wallet integration

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- MetaMask browser extension

### MongoDB Setup on Mac M2
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB service
brew services start mongodb/brew/mongodb-community@6.0

# Verify MongoDB is running
brew services list | grep mongodb
```

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd decertify
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Backend Setup

1. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure .env file**
   Create or modify the `.env` file in the backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/decertify
   JWT_SECRET=your_jwt_secret_123456789
   BLOCKCHAIN_NETWORK=polygon-mumbai
   CONTRACT_ADDRESS=0x123456789abcdef123456789abcdef123456789a
   # Optional for production:
   # INFURA_PROJECT_ID=your_infura_project_id
   # PRIVATE_KEY=your_wallet_private_key
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```

### Smart Contract Deployment (Optional)

For full blockchain functionality, deploy the smart contract to a testnet:

1. **Deploy using Remix (Easiest Method)**
   - Go to [Remix IDE](https://remix.ethereum.org/)
   - Create a new file called `CertificateVerification.sol`
   - Copy the contract code from `backend/contracts/CertificateVerification.sol`
   - Compile the contract
   - Connect MetaMask to Polygon Mumbai testnet
   - Deploy the contract
   - Copy the deployed contract address to your `.env` file

2. **Alternative: Deploy using script (Requires wallet private key)**
   ```bash
   cd backend
   npm run deploy-contract
   ```

## 🧭 Using the Application

### User Registration & Login
1. Register as an Issuer, Recipient, or Verifier
2. Connect your MetaMask wallet (required for Issuers)

### Certificate Issuance
1. Navigate to the Issue page
2. Fill in the certificate details
3. Click "Mint Certificate" to store on blockchain

### Certificate Verification
1. Navigate to the Verify page
2. Enter a certificate ID, blockchain hash, or recipient name
3. View the verification results

## 🔑 Wallet Connection

**Is wallet connection required?**

- **For Issuers:** Yes, wallet connection is required to sign blockchain transactions when issuing certificates.
- **For Verifiers:** No, wallet connection is not required for verification.
- **For Recipients:** Optional, can be used to manage received certificates.

The system uses MetaMask for wallet connection, which provides:
- Secure transaction signing
- Blockchain account management
- Network switching (for different testnets/mainnets)

## 📝 Development Notes

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/wallet` - Update wallet address
- `GET /api/auth/me` - Get current user info

#### Certificates
- `POST /api/certificates/issue` - Issue new certificate
- `POST /api/certificates/verify` - Verify certificate
- `GET /api/certificates/issued` - Get certificates issued by user

### Database Schema

#### Certificate Schema
- `recipientName` (String): Full name of the recipient
- `recipientEmail` (String): Email address of the recipient
- `certificateTitle` (String): Title/name of the certificate
- `description` (String): Detailed description
- `issuerName` (String): Name of the issuing organization
- `issuerAddress` (String): Blockchain address of the issuer
- `issueDate` (Date): When the certificate was issued
- `expiryDate` (Date, optional): When the certificate expires
- `blockchainHash` (String): Certificate hash stored on blockchain
- `transactionHash` (String): Blockchain transaction hash
- `status` (String): Current status (valid, expired, revoked)

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Errors
- Ensure MongoDB is running: `brew services list | grep mongodb`
- Restart if needed: `brew services restart mongodb/brew/mongodb-community@6.0`
- Check connection string in `.env` file

#### Blockchain Integration Issues
- Ensure MetaMask is installed and connected to the correct network
- For Mumbai testnet, add network to MetaMask:
  - Network Name: Mumbai Testnet
  - RPC URL: https://rpc-mumbai.maticvigil.com/
  - Chain ID: 80001
  - Currency Symbol: MATIC
  - Block Explorer: https://mumbai.polygonscan.com/

#### Backend API Connection
- Ensure backend server is running on port 5000
- Check for CORS issues in browser console
- Verify API endpoints in frontend code match backend routes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original [DeCertify project](https://github.com/saRvaGnyA/decertify)
- Built with modern web technologies and best practices
- Designed for the future of digital credential verification

---

© 2025 DeCertify - Secure, Decentralized Certificate Verification
