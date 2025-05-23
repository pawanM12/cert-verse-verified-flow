
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

### Backend (To Be Implemented)
- **Node.js** with Express.js
- **MongoDB** for certificate metadata storage
- **Mongoose** ODM for database operations
- **JWT** authentication
- **Blockchain integration** (Ethereum/Polygon)

### Blockchain
- **Smart Contracts** for certificate storage
- **Web3.js/Ethers.js** for blockchain interaction
- **MetaMask** wallet integration
- **IPFS** for certificate file storage

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- MetaMask browser extension

### Frontend Setup (Current Implementation)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd decertify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Backend Setup (Coming Next)

1. **MongoDB Setup**
   ```bash
   # For local MongoDB installation on Mac M2
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb/brew/mongodb-community
   ```

2. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/decertify
   JWT_SECRET=your_jwt_secret_here
   BLOCKCHAIN_NETWORK=polygon-mumbai
   INFURA_PROJECT_ID=your_infura_project_id
   PRIVATE_KEY=your_wallet_private_key
   ```

3. **Smart Contract Deployment**
   ```bash
   # Deploy to testnet (Polygon Mumbai recommended)
   npm run deploy:testnet
   ```

## 🎯 Current Implementation Status

### ✅ Completed
- [x] Modern React frontend with TypeScript
- [x] Responsive design with Tailwind CSS
- [x] Certificate issuing interface
- [x] Certificate verification portal
- [x] Landing page with feature showcase
- [x] Navigation and routing setup
- [x] UI components and styling
- [x] Demo functionality for testing

### 🚧 In Progress / Next Steps
- [ ] Backend API development (Express.js + Node.js)
- [ ] MongoDB integration and schema design
- [ ] Smart contract development and deployment
- [ ] Blockchain integration (Web3/Ethers.js)
- [ ] Wallet connection (MetaMask)
- [ ] Authentication system (JWT)
- [ ] IPFS integration for file storage
- [ ] Real-time notifications
- [ ] Certificate template system
- [ ] Bulk certificate issuance
- [ ] Analytics dashboard

## 🎨 Design System

### Color Palette
- **Primary**: Deep Navy (#1e293b)
- **Accent**: Teal (#0d9488)
- **Highlight**: Gold (#f59e0b)
- **Background**: Gradient from slate-900 to blue-900

### Typography
- **Headings**: Inter/System fonts, bold weights
- **Body**: Clean, readable fonts with proper hierarchy
- **Code**: Monospace fonts for hashes and IDs

## 🔧 Development Guide

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── CertificateIssuer.tsx
│   └── CertificateVerifier.tsx
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Issue.tsx       # Certificate issuing
│   └── Verify.tsx      # Certificate verification
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Testing the Demo

The current implementation includes demo functionality. Try these features:

1. **Navigate to Certificate Verification** (`/verify`)
2. **Test with sample data**:
   - Certificate ID: `CERT-2024-001`
   - Recipient: `John Doe`
   - Blockchain Hash: `0x1234567890abcdef`

3. **Issue a new certificate** (`/issue`)
   - Fill in the form and click "Mint Certificate"
   - Observe the blockchain minting simulation

## 🔮 Roadmap

### Phase 1: Core Backend (Next Sprint)
- Express.js API setup
- MongoDB integration
- Basic CRUD operations
- Authentication system

### Phase 2: Blockchain Integration
- Smart contract development
- Testnet deployment (Polygon Mumbai)
- Web3 integration
- Wallet connectivity

### Phase 3: Advanced Features
- IPFS file storage
- Certificate templates
- Bulk operations
- Analytics dashboard

### Phase 4: Production Ready
- Mainnet deployment
- Security audits
- Performance optimization
- Documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original [DeCertify project](https://github.com/saRvaGnyA/decertify)
- Built with modern web technologies and best practices
- Designed for the future of digital credential verification

---

**Next Steps**: Ready to implement the full MERN stack backend with MongoDB and blockchain integration. The frontend foundation is solid and ready for backend connectivity!
