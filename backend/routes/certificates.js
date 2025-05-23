
const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { issueCertificate, verifyCertificate } = require('../utils/blockchain');
const auth = require('../middleware/auth');

// Issue a new certificate
router.post('/issue', auth, async (req, res) => {
  try {
    const { 
      recipientName, 
      recipientEmail, 
      certificateTitle, 
      description, 
      issuerName,
      expiryDate
    } = req.body;

    // Issue certificate on blockchain
    const result = await issueCertificate({
      recipientName,
      recipientEmail,
      certificateTitle,
      description,
      issuerName,
      issuerAddress: req.user.walletAddress,
      expiryDate: expiryDate || null
    });

    // Create certificate in database
    const certificate = new Certificate({
      recipientName,
      recipientEmail,
      certificateTitle,
      description,
      issuerName,
      issuerAddress: req.user.walletAddress,
      issueDate: new Date(),
      expiryDate: expiryDate || null,
      blockchainHash: result.certificateHash,
      transactionHash: result.transactionHash,
      status: 'valid'
    });

    await certificate.save();
    res.status(201).json({ 
      success: true,
      certificate,
      message: 'Certificate issued successfully'
    });
  } catch (error) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error issuing certificate', 
      error: error.message 
    });
  }
});

// Verify a certificate
router.post('/verify', async (req, res) => {
  try {
    const { certificateId, recipientName, blockchainHash } = req.body;
    
    let certificate;
    
    // Find by certificateId if provided
    if (certificateId) {
      certificate = await Certificate.findById(certificateId);
    }
    // Find by blockchain hash if provided
    else if (blockchainHash) {
      certificate = await Certificate.findOne({ blockchainHash });
    }
    // Find by recipient name (less accurate, might return multiple)
    else if (recipientName) {
      certificate = await Certificate.findOne({ 
        recipientName: { $regex: recipientName, $options: 'i' }
      });
    }
    
    if (!certificate) {
      return res.status(404).json({ 
        success: false,
        message: 'Certificate not found' 
      });
    }

    // Verify on blockchain
    const verificationResult = await verifyCertificate(certificate.blockchainHash);
    
    if (verificationResult.isValid) {
      res.json({
        success: true,
        certificate,
        blockchainVerification: verificationResult,
        message: 'Certificate verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        certificate,
        blockchainVerification: verificationResult,
        message: 'Certificate verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error verifying certificate', 
      error: error.message 
    });
  }
});

// Get certificates issued by user
router.get('/issued', auth, async (req, res) => {
  try {
    const certificates = await Certificate.find({ issuerAddress: req.user.walletAddress });
    res.json({ certificates });
  } catch (error) {
    console.error('Error getting certificates:', error);
    res.status(500).json({ message: 'Error getting certificates', error: error.message });
  }
});

module.exports = router;
