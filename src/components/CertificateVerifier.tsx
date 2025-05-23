
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Shield, FileText, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificateData {
  id: string;
  recipientName: string;
  certificateTitle: string;
  description: string;
  issuerName: string;
  issueDate: string;
  expiryDate: string;
  blockchainHash: string;
  status: 'valid' | 'expired' | 'revoked';
}

const CertificateVerifier = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast();

  // Mock certificate data for demo
  const mockCertificate: CertificateData = {
    id: 'CERT-2024-001',
    recipientName: 'John Doe',
    certificateTitle: 'Bachelor of Computer Science',
    description: 'Successfully completed the Bachelor of Computer Science program with distinction in Software Engineering and Artificial Intelligence.',
    issuerName: 'University of Technology',
    issueDate: '2024-05-15',
    expiryDate: '',
    blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
    status: 'valid'
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearchAttempted(true);
    
    // Simulate blockchain verification
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, show certificate if search matches mock ID
      if (searchQuery.toLowerCase().includes('cert-2024-001') || 
          searchQuery.toLowerCase().includes('john') ||
          searchQuery.includes('0x1234567890abcdef')) {
        setCertificate(mockCertificate);
        toast({
          title: "Certificate Found!",
          description: "Valid certificate found on the blockchain.",
        });
      } else {
        setCertificate(null);
        toast({
          title: "Certificate Not Found",
          description: "No certificate found with the provided identifier.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-600';
      case 'expired': return 'bg-yellow-600';
      case 'revoked': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-4 w-4" />;
      case 'expired': return <Calendar className="h-4 w-4" />;
      case 'revoked': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Verify Certificate</h1>
            <p className="text-xl text-white/70">Enter certificate ID, hash, or recipient name to verify authenticity</p>
          </div>

          {/* Search Form */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="mr-2 h-6 w-6 text-teal-400" />
                Certificate Lookup
              </CardTitle>
              <CardDescription className="text-white/70">
                Search by certificate ID, blockchain hash, or recipient name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-white">Certificate Identifier</Label>
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="CERT-2024-001, 0x1234...abcd, or John Doe"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching Blockchain...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verify Certificate
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Certificate Result */}
          {searchAttempted && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Shield className="mr-2 h-6 w-6 text-teal-400" />
                    Verification Result
                  </span>
                  {certificate && (
                    <Badge className={`${getStatusColor(certificate.status)} text-white`}>
                      {getStatusIcon(certificate.status)}
                      <span className="ml-1 capitalize">{certificate.status}</span>
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificate ? (
                  <div className="space-y-6">
                    {/* Certificate Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white/70 text-sm">Certificate ID</Label>
                          <p className="text-white font-mono">{certificate.id}</p>
                        </div>
                        <div>
                          <Label className="text-white/70 text-sm">Recipient</Label>
                          <p className="text-white flex items-center">
                            <User className="mr-2 h-4 w-4 text-teal-400" />
                            {certificate.recipientName}
                          </p>
                        </div>
                        <div>
                          <Label className="text-white/70 text-sm">Certificate Title</Label>
                          <p className="text-white font-semibold">{certificate.certificateTitle}</p>
                        </div>
                        <div>
                          <Label className="text-white/70 text-sm">Issuing Organization</Label>
                          <p className="text-white">{certificate.issuerName}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white/70 text-sm">Issue Date</Label>
                          <p className="text-white flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-blue-400" />
                            {new Date(certificate.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                        {certificate.expiryDate && (
                          <div>
                            <Label className="text-white/70 text-sm">Expiry Date</Label>
                            <p className="text-white flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-yellow-400" />
                              {new Date(certificate.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        <div>
                          <Label className="text-white/70 text-sm">Blockchain Hash</Label>
                          <p className="text-white font-mono text-sm break-all bg-white/5 p-2 rounded">
                            {certificate.blockchainHash}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white/70 text-sm">Description</Label>
                      <p className="text-white/90 mt-1">{certificate.description}</p>
                    </div>

                    {/* Verification Status */}
                    <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                      <div className="flex items-center text-green-400 mb-2">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        <span className="font-semibold">Certificate Verified</span>
                      </div>
                      <p className="text-green-200 text-sm">
                        This certificate has been verified on the blockchain and is authentic. 
                        The certificate data matches the immutable record stored on the distributed ledger.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Certificate Not Found</h3>
                    <p className="text-white/60">
                      No certificate found with the provided identifier. Please check the certificate ID, 
                      blockchain hash, or recipient name and try again.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Demo Instructions */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10 mt-8">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4">Try the Demo</h3>
              <p className="text-white/70 mb-4">Use these sample identifiers to test the verification system:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-white/60">
                  <span className="w-32">Certificate ID:</span>
                  <code className="bg-white/10 px-2 py-1 rounded text-teal-300">CERT-2024-001</code>
                </div>
                <div className="flex items-center text-white/60">
                  <span className="w-32">Recipient:</span>
                  <code className="bg-white/10 px-2 py-1 rounded text-teal-300">John Doe</code>
                </div>
                <div className="flex items-center text-white/60">
                  <span className="w-32">Blockchain Hash:</span>
                  <code className="bg-white/10 px-2 py-1 rounded text-teal-300">0x1234567890abcdef</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerifier;
