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

  // Calculate baseline metrics for optimized mode
  const baselineMetrics = isOptimized ? {
    totalSaved: metrics.totalSaved + 156000, // Annual baseline savings
    timeSaved: metrics.timeSaved + 24, // Days saved per month
    liquidityFreed: metrics.liquidityFreed + 9500000, // Capital not trapped
    optimizationGain: metrics.optimizationGain + 28, // Efficiency uplift
  } : metrics;

  const metricsData = [
    {
      icon: DollarSign,
      label: 'Cost Savings',
      value: formatCurrency(baselineMetrics.totalSaved),
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+99.95%',
      baseline: isOptimized ? '€156K baseline + transactions' : 'Enable optimization',
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: baselineMetrics.timeSaved > 0 ? `${baselineMetrics.timeSaved} days` : '0 days',
      color: 'text-treasury-blue',
      bgColor: 'bg-treasury-blue/10',
      change: 'Instant vs T+2',
      baseline: isOptimized ? '24 days/month baseline' : 'Enable optimization',
    },
    {
      icon: TrendingUp,
      label: 'Liquidity Freed',
      value: formatCurrency(baselineMetrics.liquidityFreed),
      color: 'text-treasury-teal',
      bgColor: 'bg-treasury-teal/10',
      change: '+Capital Efficiency',
      baseline: isOptimized ? '€9.5M not trapped in settlement' : 'Enable optimization',
    },
    {
      icon: Zap,
      label: 'Optimization Gain',
      value: `${baselineMetrics.optimizationGain.toFixed(1)}%`,
      color: 'text-treasury-purple',
      bgColor: 'bg-treasury-purple/10',
      change: 'Yield + Efficiency',
      baseline: isOptimized ? '28% baseline efficiency gain' : 'Enable optimization',
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
                 <div className="text-xs font-medium">
                   {isOptimized ? (
                     <span className="text-success">{metric.change}</span>
                   ) : (
                     <span className="text-muted-foreground">{metric.baseline}</span>
                   )}
                 </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{metric.label}</span>
              {isOptimized && (
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="mt-2 text-xs">
              {isOptimized ? (
                <span className="text-success font-medium">Active: Earning & Saving</span>
              ) : (
                <span className="text-muted-foreground">Enable optimization to activate</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};