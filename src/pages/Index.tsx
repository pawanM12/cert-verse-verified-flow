
import React from 'react';
import { Shield, FileText, Users, CheckCircle, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-teal-400" />
              <span className="text-2xl font-bold text-white">DeCertify</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
              <a href="#verify" className="text-white/80 hover:text-white transition-colors">Verify</a>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Decentralized
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Certificate{" "}
            </span>
            Verification
          </h1>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Secure, immutable, and instantly verifiable certificates powered by blockchain technology. 
            Build trust in digital credentials with our decentralized verification system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
              <Upload className="mr-2 h-5 w-5" />
              Issue Certificate
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              <Search className="mr-2 h-5 w-5" />
              Verify Certificate
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose DeCertify?</h2>
          <p className="text-xl text-white/70">Built for the future of digital credentials</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Shield className="h-12 w-12 text-teal-400 mb-4" />
              <CardTitle className="text-white">Immutable Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">
                Certificates stored on blockchain cannot be altered, forged, or lost. Guaranteed authenticity forever.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
              <CardTitle className="text-white">Instant Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">
                Verify any certificate in seconds without contacting the issuing institution. Global accessibility.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Decentralized Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">
                No single point of failure. Trust is distributed across the network, ensuring reliability.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white/5 backdrop-blur-sm py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-white/70">Simple steps to secure digital credentials</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Issue Certificate</h3>
              <p className="text-white/70">
                Educational institutions or organizations upload and mint certificates on the blockchain
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2. Blockchain Storage</h3>
              <p className="text-white/70">
                Certificate data is securely stored on the blockchain with immutable proof of authenticity
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Instant Verification</h3>
              <p className="text-white/70">
                Anyone can verify certificate authenticity by searching the certificate ID or hash
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-white/70 mb-12">
            Join the future of digital credentials. Issue, store, and verify certificates on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-teal-400" />
                <span className="text-xl font-bold text-white">DeCertify</span>
              </div>
              <p className="text-white/60">
                Revolutionizing digital credential verification through blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Issue Certificates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Verify Certificates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 DeCertify. All rights reserved. Built with ❤️ for the future of education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
