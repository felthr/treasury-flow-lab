import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import type { Subsidiary } from './TreasuryDashboard';

interface SubsidiaryCardProps {
  subsidiary: Subsidiary;
  isOptimized: boolean;
}

export const SubsidiaryCard = ({ subsidiary, isOptimized }: SubsidiaryCardProps) => {
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subsidiary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getUtilizationColor = (balance: number) => {
    const utilizationRate = balance / 15000000; // Assuming max capacity of 15M
    if (utilizationRate > 0.8) return 'text-destructive';
    if (utilizationRate > 0.6) return 'text-warning';
    return 'text-success';
  };

  const getUtilizationBg = (balance: number) => {
    const utilizationRate = balance / 15000000;
    if (utilizationRate > 0.8) return 'bg-destructive/10';
    if (utilizationRate > 0.6) return 'bg-warning/10';
    return 'bg-success/10';
  };

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-md ${getUtilizationBg(subsidiary.balance)}`}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{subsidiary.flag}</div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{subsidiary.name}</h3>
              <p className="text-sm text-muted-foreground">{subsidiary.location}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getUtilizationColor(subsidiary.balance)}`}>
              {formatBalance(subsidiary.balance)}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              Available Liquidity
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant={isOptimized ? "default" : "secondary"}
              className={isOptimized ? "bg-success text-white" : "bg-muted text-muted-foreground"}
            >
              {isOptimized ? 'Real-time' : 'T+2 Settlement'}
            </Badge>
            {isOptimized && (
              <Badge variant="outline" className="border-treasury-teal text-treasury-teal">
                Optimized
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            {subsidiary.balance > 10000000 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-warning" />
            )}
            <span className={subsidiary.balance > 10000000 ? 'text-success' : 'text-warning'}>
              {subsidiary.balance > 10000000 ? 'High Liquidity' : 'Rebalance Needed'}
            </span>
          </div>
        </div>

        {/* Progress bar for liquidity utilization */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Liquidity Utilization</span>
            <span>{Math.round((subsidiary.balance / 15000000) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                subsidiary.balance / 15000000 > 0.8 ? 'bg-destructive' :
                subsidiary.balance / 15000000 > 0.6 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min((subsidiary.balance / 15000000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};