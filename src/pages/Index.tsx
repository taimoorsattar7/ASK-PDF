import { useState } from 'react';
import { FileText, MessageSquare, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PDFUpload } from '@/components/PDFUpload';
import { ChatInterface } from '@/components/ChatInterface';
import heroImage from '@/assets/hero-illustration.jpg';

interface UploadedPDF {
  id: string;
  name: string;
  size: number;
  file: File;
}

const Index = () => {
  const [uploadedPDFs, setUploadedPDFs] = useState<UploadedPDF[]>([]);

  const features = [
    {
      icon: FileText,
      title: 'Multiple PDF Support',
      description: 'Upload and analyze multiple PDF documents simultaneously for comprehensive insights.'
    },
    {
      icon: MessageSquare,
      title: 'Intelligent Q&A',
      description: 'Ask natural language questions and get precise answers from your document content.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Advanced AI processes your documents quickly to provide immediate responses.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents are processed securely with privacy protection built-in.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-background/10" />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Ask Anything About Your
                <span className="block gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary-glow to-accent-glow">
                  PDF Documents
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                Upload multiple PDFs and get instant, intelligent answers to any questions about their content using advanced AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="glass" size="xl" className="text-lg">
                  Get Started Free
                </Button>
                <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-glow rounded-3xl blur-3xl opacity-30" />
              <img 
                src={heroImage} 
                alt="PDF Q&A Application" 
                className="relative w-full h-auto rounded-3xl shadow-elevated border border-primary-foreground/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Document Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of document interaction with our AI-powered platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center shadow-card bg-surface/50 border-border/50 hover:shadow-elevated transition-smooth hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Application Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Try It Now
            </h2>
            <p className="text-xl text-muted-foreground">
              Upload your PDFs and start asking questions immediately
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* PDF Upload Section */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                1. Upload Your Documents
              </h3>
              <PDFUpload onPDFsProcessed={setUploadedPDFs} />
            </div>
            
            {/* Chat Interface Section */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                2. Ask Questions
              </h3>
              <ChatInterface hasDocuments={uploadedPDFs.length > 0} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PDF Q&A</span>
          </div>
          <p className="text-muted-foreground">
            Powered by advanced AI • Built with modern web technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;