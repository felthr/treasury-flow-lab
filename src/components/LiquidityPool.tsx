import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Droplets, Zap, Clock } from 'lucide-react';
import type { Subsidiary } from './TreasuryDashboard';

interface LiquidityPoolProps {
  totalLiquidity: number;
  subsidiaries: Subsidiary[];
  isOptimized: boolean;
}

export const LiquidityPool = ({ totalLiquidity, subsidiaries, isOptimized }: LiquidityPoolProps) => {
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDistribution = () => {
    return subsidiaries.map(sub => ({
      ...sub,
      percentage: (sub.balance / totalLiquidity) * 100
    }));
  };

  const efficiency = isOptimized ? 95 : 67;
  const idleLiquidity = isOptimized ? totalLiquidity * 0.15 : totalLiquidity * 0.35;

  return (
    <Card className="bg-gradient-card border-0 shadow-lg h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-treasury-teal">
          <Droplets className="h-5 w-5" />
          Central Liquidity Pool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Liquidity */}
        <div className="text-center p-6 bg-gradient-primary rounded-lg text-white">
          <div className="text-3xl font-bold mb-2">
            {formatBalance(totalLiquidity)}
          </div>
          <div className="text-sm opacity-90">Total Available Liquidity</div>
        </div>

        {/* Distribution Chart */}
        <div>
          <h4 className="font-semibold mb-3 text-foreground">Distribution by Subsidiary</h4>
          <div className="space-y-3">
            {getDistribution().map((sub) => (
              <div key={sub.id} className="flex items-center gap-3">
                <div className="text-lg">{sub.flag}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{sub.name}</span>
                    <span className="text-muted-foreground">{sub.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-treasury-blue to-treasury-teal transition-all duration-500"
                      style={{ width: `${sub.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-foreground">Pool Efficiency</span>
            </div>
            <Badge 
              variant={efficiency > 90 ? "default" : "secondary"}
              className={efficiency > 90 ? "bg-success text-white" : "bg-warning text-white"}
            >
              {efficiency}%
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
            <div className="flex items-center gap-2">
              {isOptimized ? (
                <Zap className="h-4 w-4 text-treasury-green" />
              ) : (
                <Clock className="h-4 w-4 text-warning" />
              )}
              <span className="text-sm font-medium text-foreground">Settlement Speed</span>
            </div>
            <Badge 
              variant={isOptimized ? "default" : "secondary"}
              className={isOptimized ? "bg-treasury-green text-white" : "bg-warning text-white"}
            >
              {isOptimized ? 'Instant' : 'T+2 Days'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-treasury-blue" />
              <span className="text-sm font-medium text-foreground">Idle Liquidity</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                {formatBalance(idleLiquidity)}
              </div>
              <div className="text-xs text-muted-foreground">
                {((idleLiquidity / totalLiquidity) * 100).toFixed(1)}% locked
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="text-center">
          <Badge 
            variant={isOptimized ? "default" : "destructive"}
            className={isOptimized ? "bg-gradient-success text-white" : "bg-destructive text-white"}
          >
            {isOptimized ? 'Optimized Pool Active' : 'Traditional Banking'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};