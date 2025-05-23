
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface CertificateData {
  recipientName: string;
  recipientEmail: string;
  certificateTitle: string;
  description: string;
  issuerName: string;
  issueDate?: string;
  expiryDate?: string;
}

interface VerificationData {
  certificateId?: string;
  recipientName?: string;
  blockchainHash?: string;
}

interface Certificate {
  _id: string;
  recipientName: string;
  recipientEmail: string;
  certificateTitle: string;
  description: string;
  issuerName: string;
  issuerAddress: string;
  issueDate: string;
  expiryDate?: string;
  blockchainHash: string;
  transactionHash: string;
  status: 'valid' | 'expired' | 'revoked';
  createdAt: string;
  updatedAt: string;
}

interface VerificationResult {
  success: boolean;
  certificate?: Certificate;
  blockchainVerification?: {
    isValid: boolean;
    issuer: string;
    recipient: string;
    issueDate: string;
    expiryDate?: string;
    status: string;
  };
  message: string;
}

export const useCertificates = () => {
  const [issuingCertificate, setIssuingCertificate] = useState<boolean>(false);
  const [verifyingCertificate, setVerifyingCertificate] = useState<boolean>(false);
  const [issuedCertificates, setIssuedCertificates] = useState<Certificate[]>([]);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const issueCertificate = async (certificateData: CertificateData) => {
    setIssuingCertificate(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/certificates/issue`, certificateData);
      
      return {
        success: true,
        certificate: response.data.certificate,
        message: response.data.message
      };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to issue certificate';
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIssuingCertificate(false);
    }
  };

  const verifyCertificate = async (verificationData: VerificationData) => {
    setVerifyingCertificate(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/certificates/verify`, verificationData);
      
      const result = {
        success: true,
        certificate: response.data.certificate,
        blockchainVerification: response.data.blockchainVerification,
        message: response.data.message
      };
      
      setVerificationResult(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to verify certificate';
      setError(errorMessage);
      
      const result = {
        success: false,
        message: errorMessage
      };
      
      setVerificationResult(result as VerificationResult);
      return result;
    } finally {
      setVerifyingCertificate(false);
    }
  };

  const getIssuedCertificates = async () => {
    try {
      const response = await axios.get(`${API_URL}/certificates/issued`);
      setIssuedCertificates(response.data.certificates);
      return response.data.certificates;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to get certificates';
      setError(errorMessage);
      return [];
    }
  };

  const resetVerificationResult = () => {
    setVerificationResult(null);
  };

  return {
    issuingCertificate,
    verifyingCertificate,
    issuedCertificates,
    verificationResult,
    error,
    issueCertificate,
    verifyCertificate,
    getIssuedCertificates,
    resetVerificationResult
  };
};
