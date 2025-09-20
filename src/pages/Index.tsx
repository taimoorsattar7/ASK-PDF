import { useState } from 'react';
import { Copy, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoImage from '@/assets/logo.png';
const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please select only PDF files.",
        variant: "destructive"
      });
      return;
    }
    setSelectedFiles(pdfFiles);
    toast({
      title: `${pdfFiles.length} PDF${pdfFiles.length > 1 ? 's' : ''} selected`,
      description: "Ready to ask questions about your documents."
    });
  };
  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one PDF file.",
        variant: "destructive"
      });
      return;
    }
    if (!question.trim()) {
      toast({
        title: "No question provided",
        description: "Please enter a question about your documents.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('file', file);
      });
      const {
        data,
        error
      } = await supabase.functions.invoke('extract-text-pdf', {
        body: formData
      });
      if (error) {
        throw error;
      }
      const pdfText = JSON.stringify(data);
      const response = await fetch('https://cmfspyd53pg0823qu9fdad3fi.agent.a.smyth.ai/api/answer_pdf_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pdf_text: pdfText,
          question: question
        })
      });
      if (!response.ok) {
        throw new Error('Failed to get answer from AI service');
      }
      const aiResponse = await response.json();
      setResult(aiResponse.answer || 'No answer returned');
      toast({
        title: "Analysis complete",
        description: "Your PDF analysis is ready."
      });
    } catch (error) {
      console.error('Error calling function:', error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard."
    });
  };
  return <main className="min-h-screen bg-background p-6 border border-border">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo and Header */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-4">
            <img src={logoImage} alt="Ask PDF Logo" className="h-16 w-auto" />
          </div>
          
          <div className="space-y-2">
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload multiple PDF documents and ask questions to get instant, intelligent answers about their content using advanced AI technology.
            </p>
          </div>
        </header>

        {/* Main Form */}
        <section>
          <Card className="p-8 space-y-6 border border-border">
            {/* PDF Upload */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Select PDF Files
              </label>
              <div className="flex items-center gap-4">
                <Input type="file" multiple accept=".pdf" onChange={handleFileSelect} className="flex-1" aria-label="Upload PDF files" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" />
                  {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                </div>
              </div>
            </div>

            {/* Question Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Ask a Question
              </label>
              <Textarea placeholder="What would you like to know about your PDF documents?" value={question} onChange={e => setQuestion(e.target.value)} className="min-h-[100px]" aria-label="Question about PDF documents" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button onClick={handleSubmit} disabled={loading || selectedFiles.length === 0} className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-medium border border-border" variant="outline">
                {loading ? 'Processing...' : 'Submit Question'}
              </Button>
            </div>
          </Card>
        </section>

        {/* Results */}
        {result && <section>
            <Card className="p-6 space-y-4 border border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Analysis Result</h2>
                <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground border border-border" aria-label="Copy result to clipboard">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{result}</p>
              </div>
            </Card>
          </section>}
      </div>
    </main>;
};
export default Index;