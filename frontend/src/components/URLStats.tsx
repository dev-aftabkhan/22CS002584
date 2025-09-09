import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, Search, Calendar, MousePointer, ExternalLink, Clock } from "lucide-react";
import axios from "axios";

interface URLStatistics {
  url: string;
  createdAt: string;
  expiry?: string;
  totalClicks: number;
  clicks: Array<{
    referrer: string;
    ip: string;
    location: string;
    timestamp: string;
  }>;
}

const URLStats = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState<URLStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shortcode.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a shortcode to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setStats(null);

    try {
      const response = await axios.get(`http://localhost:4141/api/url/${shortcode.trim()}`);
      setStats(response.data);
      toast({
        title: "Statistics Found",
        description: `Found statistics for shortcode: ${shortcode}`,
      });
    } catch (error) {
      setNotFound(true);
      toast({
        title: "Not Found",
        description: "No statistics found for this shortcode",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          URL Statistics
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          View detailed analytics for your shortened URLs
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shortcode" className="text-sm font-medium flex items-center gap-2">
              <Search className="w-4 h-4" />
              Shortcode *
            </Label>
            <div className="flex gap-2">
              <Input
                id="shortcode"
                type="text"
                placeholder="abc123"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
                required
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="submit"
                className="bg-gradient-primary hover:opacity-90 transition-smooth shrink-0"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Get Stats"}
              </Button>
            </div>
          </div>
        </form>

        {notFound && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No statistics found for this shortcode.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Make sure you entered the correct shortcode.
            </p>
          </div>
        )}

        {stats && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-secondary rounded-lg border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                URL Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Original URL</p>
                    <p className="text-sm text-foreground break-all">{stats.url}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created At</p>
                    <p className="text-sm text-foreground">{formatDate(stats.createdAt)}</p>
                  </div>

                  {stats.expiry && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Expiry</p>
                      <p className="text-sm text-foreground">{formatDate(stats.expiry)}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                    <p className="text-sm text-foreground">{stats.totalClicks}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Click Details</p>
                    <ul className="text-sm text-foreground space-y-2">
                      {stats.clicks.map((click, index) => (
                        <li key={index} className="border-b pb-2">
                          <p><strong>Referrer:</strong> {click.referrer}</p>
                          <p><strong>IP:</strong> {click.ip}</p>
                          <p><strong>Location:</strong> {click.location}</p>
                          <p><strong>Timestamp:</strong> {formatDate(click.timestamp)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default URLStats;