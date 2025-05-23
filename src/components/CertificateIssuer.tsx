
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CertificateIssuer = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    certificateTitle: '',
    description: '',
    issuerName: '',
    issueDate: '',
    expiryDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate blockchain minting process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Certificate Minted Successfully!",
        description: "Your certificate has been stored on the blockchain.",
      });
      
      // Reset form
      setFormData({
        recipientName: '',
        recipientEmail: '',
        certificateTitle: '',
        description: '',
        issuerName: '',
        issueDate: '',
        expiryDate: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Issue New Certificate</h1>
            <p className="text-xl text-white/70">Create and mint a new certificate on the blockchain</p>
          </div>

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
                      placeholder="University/Organization name"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
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
                    disabled={isLoading}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {isLoading ? (
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
