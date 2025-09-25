import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubsidiaryCard } from './SubsidiaryCard';
import { LiquidityPool } from './LiquidityPool';
import { MetricsOverlay } from './MetricsOverlay';
import { TransferModal } from './TransferModal';
import { BlockchainExplorer } from './BlockchainExplorer';
import { ArrowLeft, ToggleLeft, ToggleRight, Zap, Clock, TrendingDown, AlertTriangle } from 'lucide-react';

export interface Subsidiary {
  id: string;
  name: string;
  location: string;
  balance: number;
  currency: 'EUR' | 'USD';
  flag: string;
}

export interface TransferData {
  from: string;
  to: string;
  amount: number;
  type: 'instant' | 'swift';
  status: 'pending' | 'confirmed' | 'completed';
  timestamp: Date;
  fee: number;
  txHash?: string;
}

export const TreasuryDashboard = () => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([
    { id: 'berlin', name: 'Berlin', location: 'Germany', balance: isOptimized ? 8500000 : 12000000, currency: 'EUR', flag: '🇩🇪' },
    { id: 'paris', name: 'Paris', location: 'France', balance: isOptimized ? 4200000 : 8000000, currency: 'EUR', flag: '🇫🇷' },
    { id: 'madrid', name: 'Madrid', location: 'Spain', balance: isOptimized ? 3300000 : 5000000, currency: 'EUR', flag: '🇪🇸' },
  ]);

  const [transfers, setTransfers] = useState<TransferData[]>([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<TransferData | null>(null);
  const [metrics, setMetrics] = useState({
    totalSaved: 0,
    timeSaved: 0,
    liquidityFreed: 0,
    optimizationGain: 0,
  });

  const totalLiquidity = subsidiaries.reduce((sum, sub) => sum + sub.balance, 0);

  const simulateInstantTransfer = () => {
    const newTransfer: TransferData = {
      from: 'Paris',
      to: 'Berlin',
      amount: 5000000,
      type: 'instant',
      status: 'pending',
      timestamp: new Date(),
      fee: 0.01,
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    };

    setTransfers(prev => [newTransfer, ...prev]);
    setSelectedTransfer(newTransfer);
    setShowTransferModal(true);

    // Simulate blockchain confirmation
    setTimeout(() => {
      setTransfers(prev => 
        prev.map(t => t === newTransfer ? { ...t, status: 'confirmed' } : t)
      );
      setShowExplorer(true);
      
      // Update balances
      setSubsidiaries(prev => prev.map(sub => {
        if (sub.name === 'Paris') return { ...sub, balance: sub.balance - 5000000 };
        if (sub.name === 'Berlin') return { ...sub, balance: sub.balance + 5000000 };
        return sub;
      }));

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        totalSaved: prev.totalSaved + 19.99,
        timeSaved: prev.timeSaved + 2,
        liquidityFreed: prev.liquidityFreed + 5000000,
      }));
    }, 2000);
  };

  const simulateSwiftTransfer = () => {
    const newTransfer: TransferData = {
      from: 'Paris',
      to: 'Berlin',
      amount: 5000000,
      type: 'swift',
      status: 'pending',
      timestamp: new Date(),
      fee: 20,
    };

    setTransfers(prev => [newTransfer, ...prev]);
    setSelectedTransfer(newTransfer);
    setShowTransferModal(true);
  };

  const triggerAutoRebalance = () => {
    // Simulate payroll event in Berlin
    setSubsidiaries(prev => prev.map(sub => 
      sub.name === 'Berlin' ? { ...sub, balance: sub.balance - 3000000 } : sub
    ));

    // Auto-rebalance from other subsidiaries
    setTimeout(() => {
      setSubsidiaries(prev => prev.map(sub => {
        if (sub.name === 'Paris') return { ...sub, balance: sub.balance - 1500000 };
        if (sub.name === 'Madrid') return { ...sub, balance: sub.balance - 1500000 };
        if (sub.name === 'Berlin') return { ...sub, balance: sub.balance + 3000000 };
        return sub;
      }));

      setMetrics(prev => ({
        ...prev,
        optimizationGain: prev.optimizationGain + 15.2,
        liquidityFreed: prev.liquidityFreed + 3000000,
      }));
    }, 1000);
  };

  const simulateProgrammablePayout = () => {
    // Simulate invoice approval triggering automatic payment
    const newTransfer: TransferData = {
      from: 'Madrid',
      to: 'Supplier (External)',
      amount: 1000000,
      type: 'instant',
      status: 'confirmed',
      timestamp: new Date(),
      fee: 0.01,
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    };

    setTransfers(prev => [newTransfer, ...prev]);
    setSubsidiaries(prev => prev.map(sub => 
      sub.name === 'Madrid' ? { ...sub, balance: sub.balance - 1000000 } : sub
    ));

    setMetrics(prev => ({
      ...prev,
      totalSaved: prev.totalSaved + 19.99,
      timeSaved: prev.timeSaved + 1,
    }));
  };

  useEffect(() => {
    // Update subsidiary balances when mode changes
    setSubsidiaries(prev => prev.map(sub => ({
      ...sub,
      balance: isOptimized ? 
        (sub.name === 'Berlin' ? 8500000 : sub.name === 'Paris' ? 4200000 : 3300000) :
        (sub.name === 'Berlin' ? 12000000 : sub.name === 'Paris' ? 8000000 : 5000000)
    })));
  }, [isOptimized]);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Treasury Control Center</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm ${!isOptimized ? 'font-semibold text-destructive' : 'text-muted-foreground'}`}>
              Traditional
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOptimized(!isOptimized)}
              className="p-0 h-auto hover:bg-transparent"
            >
              {isOptimized ? (
                <ToggleRight className="h-8 w-8 text-success" />
              ) : (
                <ToggleLeft className="h-8 w-8 text-muted-foreground" />
              )}
            </Button>
            <span className={`text-sm ${isOptimized ? 'font-semibold text-success' : 'text-muted-foreground'}`}>
              Optimized
            </span>
          </div>
          <Badge variant={isOptimized ? "default" : "secondary"} className="bg-gradient-primary text-white">
            {isOptimized ? 'Stablecoin Rails' : 'Traditional Banking'}
          </Badge>
        </div>
      </div>

      {/* Metrics Overview */}
      <MetricsOverlay metrics={metrics} isOptimized={isOptimized} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Subsidiaries */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-treasury-blue">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Global Subsidiaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {subsidiaries.map((subsidiary) => (
                  <SubsidiaryCard 
                    key={subsidiary.id} 
                    subsidiary={subsidiary}
                    isOptimized={isOptimized}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Pool */}
        <div>
          <LiquidityPool 
            totalLiquidity={totalLiquidity}
            subsidiaries={subsidiaries}
            isOptimized={isOptimized}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button 
          onClick={simulateInstantTransfer}
          className="h-20 bg-gradient-success text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <Zap className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm font-semibold">Instant Transfer</div>
            <div className="text-xs opacity-80">€5M Paris → Berlin</div>
          </div>
        </Button>

        <Button 
          onClick={simulateSwiftTransfer}
          variant="outline"
          className="h-20 border-destructive text-destructive hover:bg-destructive hover:text-white transition-all duration-300"
        >
          <div className="text-center">
            <Clock className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm font-semibold">SWIFT Transfer</div>
            <div className="text-xs opacity-80">T+2 days, €20 fee</div>
          </div>
        </Button>

        <Button 
          onClick={triggerAutoRebalance}
          className="h-20 bg-treasury-purple text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm font-semibold">Trigger Outflow</div>
            <div className="text-xs opacity-80">Berlin payroll €3M</div>
          </div>
        </Button>

        <Button 
          onClick={simulateProgrammablePayout}
          className="h-20 bg-treasury-orange text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <TrendingDown className="h-6 w-6 mx-auto mb-1" />
            <div className="text-sm font-semibold">Auto Payout</div>
            <div className="text-xs opacity-80">Invoice → €1M release</div>
          </div>
        </Button>
      </div>

      {/* Modals */}
      <TransferModal 
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        transfer={selectedTransfer}
      />

      <BlockchainExplorer 
        isOpen={showExplorer}
        onClose={() => setShowExplorer(false)}
        transfer={selectedTransfer}
      />
    </div>
  );
};