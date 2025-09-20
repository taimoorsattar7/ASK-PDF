# Ask PDF - AI-Powered Document Analysis

A modern web application that enables users to upload multiple PDF documents and ask questions about their content using advanced AI technology. Get instant, intelligent answers from your documents with a clean, minimalist interface.

## 🚀 Features

- **Multi-PDF Upload**: Upload and analyze multiple PDF documents simultaneously
- **AI-Powered Q&A**: Ask natural language questions about your document content
- **Instant Answers**: Get intelligent responses powered by advanced AI models
- **Clean Interface**: Minimalist design with #EBEBEB color scheme for optimal readability
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **SEO Optimized**: Fully optimized for search engines with proper meta tags and structured data
- **Secure Processing**: Documents are processed securely using Supabase edge functions

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Backend**: Supabase (Edge Functions, Database)
- **Build Tool**: Vite
- **AI Integration**: Custom AI API for document analysis
- **File Processing**: PDF text extraction via Supabase functions

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │  Supabase Edge   │    │   AI Service    │
│                 │    │    Functions     │    │                 │
│ • File Upload   ├────┤                  ├────┤ • Text Analysis │
│ • Q&A Interface │    │ • PDF Processing │    │ • Answer Gen    │
│ • Results Display│    │ • Text Extract   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ask-pdf
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   VITE_SUPABASE_PROJECT_ID=your_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Deploy the `extract-text-pdf` edge function
3. Configure CORS settings for your domain
4. Update environment variables with your project credentials

### AI Service Configuration

The app integrates with an external AI service for document analysis. Ensure the AI endpoint is properly configured and accessible.

## 📱 Usage

1. **Upload PDFs**: Click the file input to select one or more PDF documents
2. **Ask Questions**: Type your question about the document content in the textarea
3. **Get Answers**: Click "Submit Question" to process your request
4. **View Results**: The AI-generated answer will appear below the form
5. **Copy Results**: Use the copy button to save answers to your clipboard

## 🎨 Design System

The application uses a minimal design approach with:

- **Primary Color**: #EBEBEB and its variations
- **Background**: Clean white (#FFFFFF)
- **Typography**: System fonts with proper contrast ratios
- **Components**: Semantic HTML with ARIA labels for accessibility
- **Responsive**: Mobile-first design with breakpoints for all devices

## 🔒 Security & Privacy

- PDF processing happens on secure Supabase edge functions
- No documents are permanently stored on our servers
- All communications are encrypted in transit
- User data is processed according to privacy best practices

## 📊 SEO Features

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Structured Data**: JSON-LD markup for search engines
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Performance**: Optimized loading and Core Web Vitals
- **Mobile-Friendly**: Responsive design with proper viewport settings

## 🚀 Deployment

### Using Lovable Platform

1. Connect your GitHub repository to Lovable
2. Click the "Publish" button in the Lovable editor
3. Your app will be deployed automatically

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Netlify: Connect GitHub repository and deploy
   - Vercel: Import project and configure build settings
   - AWS S3/CloudFront: Upload build files to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🔄 Changelog

### v1.0.0 (Latest)
- Initial release with PDF upload and AI Q&A functionality
- Minimalist design with #EBEBEB color scheme
- SEO optimization and accessibility features
- Supabase integration for backend services

---

**Built with ❤️ using React, Supabase, and AI technology**