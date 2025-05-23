
const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  certificateTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  issuerName: {
    type: String,
    required: true,
  },
  issuerAddress: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
  },
  blockchainHash: {
    type: String,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['valid', 'expired', 'revoked'],
    default: 'valid',
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Certificate', CertificateSchema);
