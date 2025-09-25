import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Coins, PiggyBank, ArrowUpRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface YieldPoolProps {
  deployedCapital: number;
  isOptimized: boolean;
  onYieldGeneration?: (amount: number) => void;
}

export const YieldPool = ({ deployedCapital, isOptimized, onYieldGeneration }: YieldPoolProps) => {
  const [totalYieldEarned, setTotalYieldEarned] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const dailyYield = (deployedCapital * 0.045) / 365; // 4.5% APY
  const monthlyYield = (deployedCapital * 0.045) / 12;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stablecoinPools = [
    { name: 'USDC Pool', allocation: 60, apy: 4.8, amount: deployedCapital * 0.6 },
    { name: 'USDT Pool', allocation: 25, apy: 4.2, amount: deployedCapital * 0.25 },
    { name: 'DAI Pool', allocation: 15, apy: 4.5, amount: deployedCapital * 0.15 },
  ];

  const simulateYieldGeneration = () => {
    setIsGenerating(true);
    let accumulated = 0;
    const interval = setInterval(() => {
      accumulated += dailyYield;
      setTotalYieldEarned(prev => prev + dailyYield);
      if (onYieldGeneration) {
        onYieldGeneration(dailyYield);
      }
      if (accumulated >= monthlyYield) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 100);
  };

  useEffect(() => {
    if (isOptimized && deployedCapital > 0) {
      // Auto-start with some baseline yield
      setTotalYieldEarned(35625); // 1 month of yield
    } else {
      setTotalYieldEarned(0);
    }
  }, [isOptimized, deployedCapital]);

  if (!isOptimized || deployedCapital === 0) {
    return (
      <Card className="bg-gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <PiggyBank className="h-5 w-5" />
            Yield Generation Pool
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-muted-foreground">
            <PiggyBank className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Enable optimization mode to deploy excess capital to yield-generating stablecoin pools</p>
            <div className="mt-4 text-xs">
              <span className="font-medium text-destructive">€0 earning potential</span> in traditional banking
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-treasury-green">
          <PiggyBank className="h-5 w-5" />
          Stablecoin Yield Pool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deployed Capital Overview */}
        <div className="text-center p-6 bg-gradient-success rounded-lg text-white">
          <div className="text-2xl font-bold mb-1">
            {formatCurrency(deployedCapital)}
          </div>
          <div className="text-sm opacity-90 mb-3">Deployed Capital</div>
          <Badge className="bg-white/20 text-white border-white/30">
            4.5% APY Average
          </Badge>
        </div>

        {/* Yield Performance */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-treasury-green/10 rounded-lg">
            <div className="text-lg font-bold text-treasury-green">
              {formatCurrency(totalYieldEarned)}
            </div>
            <div className="text-xs text-muted-foreground">Total Yield Earned</div>
          </div>
          <div className="text-center p-4 bg-treasury-blue/10 rounded-lg">
            <div className="text-lg font-bold text-treasury-blue">
              {formatCurrency(dailyYield)}
            </div>
            <div className="text-xs text-muted-foreground">Daily Yield</div>
          </div>
        </div>

        {/* Pool Distribution */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Pool Distribution</h4>
          <div className="space-y-3">
            {stablecoinPools.map((pool) => (
              <div key={pool.name} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-treasury-teal" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{pool.name}</div>
                    <div className="text-xs text-muted-foreground">{pool.allocation}% • {pool.apy}% APY</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {formatCurrency(pool.amount)}
                  </div>
                  <div className="text-xs text-success">
                    +{formatCurrency((pool.amount * pool.apy) / 100 / 365)}/day
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yield Generation Button */}
        <Button 
          onClick={simulateYieldGeneration}
          disabled={isGenerating}
          className="w-full bg-treasury-green hover:bg-treasury-green/90 text-white"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Yield...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Simulate Monthly Yield
            </div>
          )}
        </Button>

        {/* Performance Metrics */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly Projection</span>
            <span className="font-semibold text-success">+{formatCurrency(monthlyYield)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Annual Projection</span>
            <span className="font-semibold text-success">+{formatCurrency(deployedCapital * 0.045)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Vs Traditional Banking</span>
            <div className="flex items-center gap-1 text-success">
              <ArrowUpRight className="h-3 w-3" />
              <span className="font-semibold">+{formatCurrency(deployedCapital * 0.045)}/year</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          <Badge className="bg-gradient-success text-white">
            <TrendingUp className="h-3 w-3 mr-1" />
            Actively Earning Yield
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};