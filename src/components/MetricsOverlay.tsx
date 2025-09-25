import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';

interface MetricsOverlayProps {
  metrics: {
    totalSaved: number;
    timeSaved: number;
    liquidityFreed: number;
    optimizationGain: number;
  };
  isOptimized: boolean;
}

export const MetricsOverlay = ({ metrics, isOptimized }: MetricsOverlayProps) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `€${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const metricsData = [
    {
      icon: DollarSign,
      label: 'Cost Savings',
      value: formatCurrency(metrics.totalSaved),
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+99.95%',
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: metrics.timeSaved > 0 ? `${metrics.timeSaved} days` : '0 days',
      color: 'text-treasury-blue',
      bgColor: 'bg-treasury-blue/10',
      change: 'Instant vs T+2',
    },
    {
      icon: TrendingUp,
      label: 'Liquidity Freed',
      value: formatCurrency(metrics.liquidityFreed),
      color: 'text-treasury-teal',
      bgColor: 'bg-treasury-teal/10',
      change: '+Capital Efficiency',
    },
    {
      icon: Zap,
      label: 'Optimization Gain',
      value: `${metrics.optimizationGain.toFixed(1)}%`,
      color: 'text-treasury-purple',
      bgColor: 'bg-treasury-purple/10',
      change: 'Rail Selection',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metricsData.map((metric, index) => (
        <Card key={index} className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                {isOptimized && (
                  <div className="text-xs text-success font-medium">
                    {metric.change}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{metric.label}</span>
              {isOptimized && (
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              )}
            </div>
            {!isOptimized && (
              <div className="mt-2 text-xs text-muted-foreground">
                Enable optimization mode to see gains
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};