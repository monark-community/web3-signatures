
import { Button } from '@/components/ui/button';
import { Shield, FileText, Check } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Secure Document Signing
          <span className="text-blue-600 block">On the Blockchain</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          SignChain provides a decentralized, tamper-proof way to sign and verify documents 
          using blockchain technology. No intermediaries, complete transparency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-3">
            Start Signing
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3">
            Verify Document
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload & Hash</h3>
            <p className="text-gray-600">Generate cryptographic hash of your document for verification</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sign Securely</h3>
            <p className="text-gray-600">Use your blockchain wallet to create an immutable signature</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Check className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verify Anytime</h3>
            <p className="text-gray-600">Anyone can verify the authenticity and timestamp of signatures</p>
          </div>
        </div>
      </div>
    </section>
  );
};
