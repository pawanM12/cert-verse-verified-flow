
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { useCertificates } from '@/hooks/useCertificates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield, FileText, User, Wallet, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Certificate {
  _id: string;
  recipientName: string;
  certificateTitle: string;
  issueDate: string;
  status: 'valid' | 'expired' | 'revoked';
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { address, balance, isConnected, connectWallet } = useWallet();
  const { getIssuedCertificates } = useCertificates();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCertificates = async () => {
      if (user?.role === 'issuer') {
        try {
          const certs = await getIssuedCertificates();
          setCertificates(certs);
        } catch (error) {
          console.error('Error loading certificates:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadCertificates();
  }, [user, getIssuedCertificates]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-600';
      case 'expired': return 'bg-yellow-600';
      case 'revoked': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Logout */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-white/70">Welcome back, {user?.name}</p>
            </div>
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* User Info Card */}
          <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="mr-2 h-6 w-6 text-teal-400" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-sm">Name</p>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Role</p>
                  <p className="text-white font-medium capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Account Created</p>
                  <p className="text-white font-medium">
                    {new Date().toLocaleDateString()} {/* This should come from user object */}
                  </p>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 text-teal-400 mr-2" />
                    <p className="text-white font-medium">Blockchain Wallet</p>
                  </div>
                  {!isConnected ? (
                    <Button 
                      onClick={connectWallet} 
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      size="sm"
                    >
                      Connect Wallet
                    </Button>
                  ) : (
                    <Badge className="bg-teal-600 text-white">Connected</Badge>
                  )}
                </div>
                
                {isConnected && address && (
                  <div className="mt-2 space-y-1">
                    <p className="text-white/70 text-sm">Wallet Address</p>
                    <code className="text-xs bg-white/10 p-1 rounded text-teal-300 block">
                      {address}
                    </code>
                    {balance && (
                      <p className="text-white/70 text-sm">
                        Balance: <span className="text-teal-300">{balance} ETH</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-teal-400" />
                  Issue Certificates
                </CardTitle>
                <CardDescription className="text-white/70">
                  Create and mint new certificates on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white/80">
                {user?.role === 'issuer' ? (
                  <p>
                    As an issuer, you can create new certificates that will be securely stored 
                    on the blockchain for verification.
                  </p>
                ) : (
                  <p>
                    You need issuer privileges to create certificates. Contact an administrator 
                    to upgrade your account.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className={user?.role === 'issuer' ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-gray-600 cursor-not-allowed"}
                  disabled={user?.role !== 'issuer'}
                >
                  <Link to="/issue">Issue Certificate</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-blue-400" />
                  Verify Certificates
                </CardTitle>
                <CardDescription className="text-white/70">
                  Verify the authenticity of certificates on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white/80">
                <p>
                  Anyone can verify the authenticity of certificates using our blockchain 
                  verification system. Simply search by ID, recipient name, or blockchain hash.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link to="/verify">Verify Certificate</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Issued Certificates (Only for Issuers) */}
          {user?.role === 'issuer' && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-teal-400" />
                  Your Issued Certificates
                </CardTitle>
                <CardDescription className="text-white/70">
                  Certificates you have issued on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto"></div>
                    <p className="mt-2 text-white/70">Loading certificates...</p>
                  </div>
                ) : certificates.length > 0 ? (
                  <div className="rounded-md border border-white/20 overflow-hidden">
                    <table className="w-full text-white/90">
                      <thead className="bg-white/10">
                        <tr>
                          <th className="py-2 px-4 text-left font-medium text-white">Certificate</th>
                          <th className="py-2 px-4 text-left font-medium text-white">Recipient</th>
                          <th className="py-2 px-4 text-left font-medium text-white">Issue Date</th>
                          <th className="py-2 px-4 text-left font-medium text-white">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {certificates.map((cert) => (
                          <tr key={cert._id} className="hover:bg-white/5">
                            <td className="py-3 px-4">
                              <Link to={`/certificate/${cert._id}`} className="text-teal-400 hover:underline">
                                {cert.certificateTitle}
                              </Link>
                            </td>
                            <td className="py-3 px-4">{cert.recipientName}</td>
                            <td className="py-3 px-4">
                              {new Date(cert.issueDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={`${getStatusColor(cert.status)} text-white`}>
                                {cert.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/70">You haven't issued any certificates yet.</p>
                    <Button 
                      asChild 
                      className="bg-teal-600 hover:bg-teal-700 text-white mt-4"
                    >
                      <Link to="/issue">Issue Your First Certificate</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
