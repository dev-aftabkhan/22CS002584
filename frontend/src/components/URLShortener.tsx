import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, Calendar, Zap } from "lucide-react";
import axios from "axios";

interface ShortURLResult {
  originalUrl: string;
  shortUrl: string;
  shortcode: string;
  expiryDate?: string;
}

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShortcode, setCustomShortcode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [result, setResult] = useState<ShortURLResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(originalUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4141/api/url/", {
        url: originalUrl,
        validity: expiryDate ? parseInt(expiryDate) : undefined,
        shortcode: customShortcode.trim() || undefined,
      });

      const { url, shortLink, shortcode, expiry } = response.data;
      const result: ShortURLResult = {
        originalUrl: url,
        shortUrl: shortLink,
        shortcode,
        expiryDate: expiry || undefined,
      };

      setResult(result);
      toast({
        title: "Success!",
        description: "Your shortened URL has been created",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shortened URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Zap className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Create Shortened URL
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Transform long URLs into short, shareable links
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl" className="text-sm font-medium flex items-center gap-2">
              <Link className="w-4 h-4" />
              Original URL *
            </Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com/very-long-url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customShortcode" className="text-sm font-medium">
              Custom Shortcode (optional)
            </Label>
            <Input
              id="customShortcode"
              type="text"
              placeholder="my-link"
              value={customShortcode}
              onChange={(e) => setCustomShortcode(e.target.value)}
              className="transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Expiry Date (in minutes, optional)
            </Label>
            <Input
              id="expiryDate"
              type="number"
              placeholder="30"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Shorten URL"}
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gradient-secondary rounded-lg border">
            <h3 className="font-semibold text-foreground mb-3">Your Shortened URL</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card rounded-md border">
                <code className="text-sm text-primary font-medium">{result.shortUrl}</code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result.shortUrl)}
                  className="ml-2 transition-smooth"
                >
                  Copy
                </Button>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Original URL:</strong> {result.originalUrl}</p>
                <p><strong>Shortcode:</strong> {result.shortcode}</p>
                {result.expiryDate && (
                  <p><strong>Expires:</strong> {new Date(result.expiryDate).toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default URLShortener;