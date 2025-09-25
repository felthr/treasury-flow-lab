import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, X, Check, Clock, Zap } from 'lucide-react';

interface ComparisonModeProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ComparisonMode = ({ isVisible, onClose }: ComparisonModeProps) => {
  if (!isVisible) return null;

  const comparisons = [
    {
      category: "Settlement Speed",
      traditional: { value: "T+2 Days", icon: Clock, color: "text-destructive" },
      optimized: { value: "Instant", icon: Zap, color: "text-success" },
    },
    {
      category: "Transaction Fees",
      traditional: { value: "€20-50", icon: X, color: "text-destructive" },
      optimized: { value: "€0.01", icon: Check, color: "text-success" },
    },
    {
      category: "Idle Capital Yield",
      traditional: { value: "0% APY", icon: X, color: "text-destructive" },
      optimized: { value: "4.5% APY", icon: Check, color: "text-success" },
    },
    {
      category: "Operating Hours",
      traditional: { value: "9-5 Banking", icon: Clock, color: "text-destructive" },
      optimized: { value: "24/7/365", icon: Check, color: "text-success" },
    },
    {
      category: "Liquidity Efficiency",
      traditional: { value: "67%", icon: X, color: "text-destructive" },
      optimized: { value: "95%", icon: Check, color: "text-success" },
    },
    {
      category: "Trapped Settlement Capital",
      traditional: { value: "€9.5M", icon: X, color: "text-destructive" },
      optimized: { value: "€0", icon: Check, color: "text-success" },
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-background">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Traditional vs Optimized Comparison</CardTitle>
            <button onClick={onClose} className="p-2 hover:bg-accent rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Headers */}
            <div></div>
            <div className="text-center">
              <Badge variant="destructive" className="mb-2">Traditional Banking</Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-success text-white mb-2">Stablecoin Optimization</Badge>
            </div>

            {/* Comparisons */}
            {comparisons.map((comp, index) => (
              <div key={index} className="contents">
                <div className="flex items-center font-medium text-foreground py-3">
                  {comp.category}
                </div>
                <div className="flex items-center justify-center gap-2 py-3 bg-destructive/10 rounded">
                  <comp.traditional.icon className={`h-4 w-4 ${comp.traditional.color}`} />
                  <span className={comp.traditional.color}>{comp.traditional.value}</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-3 bg-success/10 rounded">
                  <comp.optimized.icon className={`h-4 w-4 ${comp.optimized.color}`} />
                  <span className={comp.optimized.color}>{comp.optimized.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gradient-primary p-6 rounded-lg text-white text-center">
            <h3 className="text-lg font-bold mb-2">Annual Impact</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold">€427,500</div>
                <div className="text-sm opacity-90">Additional Yield Income</div>
              </div>
              <div>
                <div className="text-2xl font-bold">€156,000</div>
                <div className="text-sm opacity-90">Transaction Cost Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24 Days</div>
                <div className="text-sm opacity-90">Faster Average Settlement</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};