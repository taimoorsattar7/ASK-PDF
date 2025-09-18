import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface UploadedPDF {
  id: string;
  name: string;
  size: number;
  file: File;
}

interface PDFUploadProps {
  onPDFsProcessed: (pdfs: UploadedPDF[]) => void;
}

export const PDFUpload = ({ onPDFsProcessed }: PDFUploadProps) => {
  const [uploadedPDFs, setUploadedPDFs] = useState<UploadedPDF[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processPDFs(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processPDFs(files);
  }, []);

  const processPDFs = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please select only PDF files.",
        variant: "destructive",
      });
      return;
    }

    const newPDFs: UploadedPDF[] = pdfFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      file
    }));

    setUploadedPDFs(prev => {
      const updated = [...prev, ...newPDFs];
      onPDFsProcessed(updated);
      return updated;
    });

    toast({
      title: `${pdfFiles.length} PDF${pdfFiles.length > 1 ? 's' : ''} uploaded`,
      description: "Your documents are ready for analysis.",
    });
  };

  const removePDF = (id: string) => {
    setUploadedPDFs(prev => {
      const updated = prev.filter(pdf => pdf.id !== id);
      onPDFsProcessed(updated);
      return updated;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card 
        className={`border-2 border-dashed transition-smooth ${
          isDragOver 
            ? 'border-primary bg-primary/5 shadow-glow' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload PDF Documents</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your PDF files here, or click to browse
          </p>
          <label htmlFor="pdf-upload">
            <Button variant="premium" size="lg" className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Choose PDFs
            </Button>
          </label>
          <input
            id="pdf-upload"
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </Card>

      {uploadedPDFs.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Uploaded Documents ({uploadedPDFs.length})</h4>
          <div className="space-y-2">
            {uploadedPDFs.map((pdf) => (
              <Card key={pdf.id} className="p-4 bg-surface border-border/50 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground truncate max-w-64">
                        {pdf.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(pdf.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePDF(pdf.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};