import { useState } from 'react';
import { TreasuryDashboard } from '@/components/TreasuryDashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Clock, TrendingUp, Shield } from 'lucide-react';
import stableTreasuryLogo from '@/assets/stable-treasury-logo.png';

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <TreasuryDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <img 
              src={stableTreasuryLogo} 
              alt="StableTreasury Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            StableTreasury
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-foreground">
            Automated Treasury Optimization
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience instant cross-border transfers, automated rebalancing, and programmable payouts 
            with stablecoin-powered treasury management.
          </p>
          <Button 
            onClick={() => setShowDemo(true)}
            size="lg"
            className="bg-gradient-primary text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5" />
            Launch Interactive Demo
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-treasury-blue">Instant Settlement</h3>
            <p className="text-sm text-muted-foreground">T+0 vs T+2 days</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-treasury-teal">99% Cost Reduction</h3>
            <p className="text-sm text-muted-foreground">€0.01 vs €20+ fees</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-treasury-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-treasury-purple">24/7 Operations</h3>
            <p className="text-sm text-muted-foreground">No banking hours</p>
          </Card>

          <Card className="p-6 text-center bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-treasury-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-treasury-orange">Automated Rules</h3>
            <p className="text-sm text-muted-foreground">Programmable logic</p>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Built for enterprise treasury teams managing multi-subsidiary liquidity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;