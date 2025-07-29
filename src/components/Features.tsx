import { Shield, FileText, Users, Clock, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable signatures stored on blockchain with cryptographic proof of authenticity."
    },
    {
      icon: FileText,
      title: "Document Hashing", 
      description: "Generate cryptographic hashes to verify document integrity without exposing content."
    },
    {
      icon: Users,
      title: "Multi-Signer Support",
      description: "Enable multiple parties to sign the same document with individual wallet signatures."
    },
    {
      icon: Clock,
      title: "Timestamping",
      description: "Automatic blockchain timestamping provides legal proof of when documents were signed."
    },
    {
      icon: Globe,
      title: "Decentralized Storage",
      description: "Optional IPFS integration for decentralized document storage and retrieval."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "No centralized custody - your documents remain private while signatures stay verifiable."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose SignChain?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of digital signatures with blockchain technology, 
            ensuring security, transparency, and decentralization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Signing?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the decentralized document signing revolution. Connect your wallet 
              and experience secure, tamper-proof digital signatures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};