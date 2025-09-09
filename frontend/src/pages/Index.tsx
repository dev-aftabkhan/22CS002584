import URLShortener from "@/components/URLShortener";
import URLStats from "@/components/URLStats";
import heroImage from "@/assets/hero-image.jpg";
import { Link as LinkIcon, Zap, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-black/10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <LinkIcon className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="mb-6 text-5xl font-bold text-primary-foreground md:text-6xl">
              Short.ly
            </h1>
            
            <p className="mb-8 text-xl text-primary-foreground/90 md:text-2xl">
              Transform long URLs into powerful, trackable short links
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Instant shortening</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Detailed analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <span>Custom links</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* URL Shortener Section */}
          <section>
            <URLShortener />
          </section>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-border" />
            <div className="mx-4 rounded-full bg-muted p-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="h-px w-24 bg-border" />
          </div>

          {/* URL Stats Section */}
          <section>
            <URLStats />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 text-xl font-semibold">
              <LinkIcon className="h-6 w-6 text-primary" />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Short.ly</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            A modern URL shortening service with analytics
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;