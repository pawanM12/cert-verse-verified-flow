
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCertificates } from '@/hooks/useCertificates';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CertificateIssuer = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    certificateTitle: '',
    description: '',
    issuerName: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: ''
  });
  
  const { issueCertificate, issuingCertificate, error } = useCertificates();
  const { isConnected, address } = useWallet();
  const { user } = useAuth();
  const { toast } = useToast();
  const [success, setSuccess] = useState<boolean>(false);
  const [certificateHash, setCertificateHash] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setCertificateHash(null);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to issue certificates.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your blockchain wallet to issue certificates.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Auto-populate issuer name if not provided
      const issuerName = formData.issuerName || user.name;
      
      const result = await issueCertificate({
        ...formData,
        issuerName,
      });
      
      if (result.success) {
        toast({
          title: "Certificate Issued Successfully!",
          description: "Your certificate has been stored on the blockchain.",
        });
        
        setSuccess(true);
        if (result.certificate && result.certificate.blockchainHash) {
          setCertificateHash(result.certificate.blockchainHash);
        }
        
        // Reset form
        setFormData({
          recipientName: '',
          recipientEmail: '',
          certificateTitle: '',
          description: '',
          issuerName: '',
          issueDate: new Date().toISOString().split('T')[0],
          expiryDate: ''
        });
      } else {
        toast({
          title: "Certificate Issuance Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: "An error occurred",
        description: "Failed to issue certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Issue New Certificate</h1>
            <p className="text-xl text-white/70">Create and mint a new certificate on the blockchain</p>
          </div>

          {/* Wallet Status */}
          {!isConnected && (
            <Alert className="mb-6 bg-yellow-500/10 border-yellow-600/30">
              <AlertTitle className="text-yellow-300">Wallet Not Connected</AlertTitle>
              <AlertDescription className="text-yellow-100">
                Please connect your blockchain wallet to issue certificates.
                You can connect your wallet from the Dashboard.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-600/30">
              <AlertTitle className="text-red-300">Error</AlertTitle>
              <AlertDescription className="text-red-100">{error}</AlertDescription>
            </Alert>
          )}

          {success && certificateHash && (
            <Alert className="mb-6 bg-green-500/10 border-green-600/30">
              <AlertTitle className="text-green-300">Certificate Issued Successfully!</AlertTitle>
              <AlertDescription className="text-green-100">
                <p>Your certificate has been successfully stored on the blockchain.</p>
                <p className="mt-2 font-mono text-xs break-all bg-green-900/20 p-2 rounded">
                  Certificate Hash: {certificateHash}
                </p>
              </AlertDescription>
            </Alert>
          )}

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 h-6 w-6 text-teal-400" />
                Certificate Details
              </CardTitle>
              <CardDescription className="text-white/70">
                Fill in the certificate information below to mint it on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName" className="text-white">Recipient Name</Label>
                    <Input
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      placeholder="Enter recipient's full name"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientEmail" className="text-white">Recipient Email</Label>
                    <Input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      value={formData.recipientEmail}
                      onChange={handleInputChange}
                      placeholder="recipient@example.com"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certificateTitle" className="text-white">Certificate Title</Label>
                  <Input
                    id="certificateTitle"
                    name="certificateTitle"
                    value={formData.certificateTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Bachelor of Computer Science"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Certificate description and achievements"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="issuerName" className="text-white">Issuing Organization</Label>
                    <Input
                      id="issuerName"
                      name="issuerName"
                      value={formData.issuerName}
                      onChange={handleInputChange}
                      placeholder={user?.name || "University/Organization name"}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                    <p className="text-xs text-white/50">
                      Leave blank to use your account name ({user?.name})
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueDate" className="text-white">Issue Date</Label>
                    <Input
                      id="issueDate"
                      name="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/30 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="text-white">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/30 text-white"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Save Draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={issuingCertificate || !isConnected}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {issuingCertificate ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Minting on Blockchain...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Mint Certificate
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-6 text-center">
                <Upload className="h-12 w-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">1. Upload Details</h3>
                <p className="text-white/60 text-sm">Fill in certificate information and recipient details</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">2. Blockchain Mint</h3>
                <p className="text-white/60 text-sm">Certificate is minted and stored immutably on blockchain</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">3. Verification Ready</h3>
                <p className="text-white/60 text-sm">Certificate becomes instantly verifiable worldwide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateIssuer;
