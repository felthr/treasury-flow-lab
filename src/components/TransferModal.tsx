import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Zap, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TransferData } from './TreasuryDashboard';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  transfer: TransferData | null;
}

export const TransferModal = ({ isOpen, onClose, transfer }: TransferModalProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && transfer?.type === 'instant') {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOpen, transfer]);

  if (!transfer) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = () => {
    if (transfer.status === 'confirmed') return <CheckCircle className="h-5 w-5 text-success" />;
    if (transfer.type === 'instant') return <Zap className="h-5 w-5 text-treasury-blue" />;
    return <Clock className="h-5 w-5 text-warning" />;
  };

  const getStatusColor = () => {
    if (transfer.status === 'confirmed') return 'bg-success text-white';
    if (transfer.type === 'instant') return 'bg-treasury-blue text-white';
    return 'bg-warning text-white';
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Transfer {transfer.type === 'instant' ? 'Processing' : 'Submitted'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transfer Details */}
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-treasury-blue">
              {formatCurrency(transfer.amount)}
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="text-center">
                <div className="text-lg font-semibold">{transfer.from}</div>
                <div className="text-sm text-muted-foreground">From</div>
              </div>
              <ArrowRight className="h-5 w-5 text-treasury-teal" />
              <div className="text-center">
                <div className="text-lg font-semibold">{transfer.to}</div>
                <div className="text-sm text-muted-foreground">To</div>
              </div>
            </div>
          </div>

          {/* Status and Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Badge className={getStatusColor()}>
                {transfer.status === 'confirmed' ? 'Confirmed' : 
                 transfer.type === 'instant' ? 'Processing on Blockchain' : 'Pending SWIFT Processing'}
              </Badge>
            </div>

            {transfer.type === 'instant' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Blockchain Confirmation</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <div className="text-xs text-center text-muted-foreground">
                  {progress < 100 ? 'Mining block...' : 'Transaction confirmed!'}
                </div>
              </div>
            )}

            {transfer.type === 'swift' && (
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">
                  Expected settlement: <strong>2 business days</strong>
                </div>
                <div className="text-xs text-muted-foreground">
                  Processing through traditional banking rails
                </div>
              </div>
            )}
          </div>

          {/* Transaction Details */}
          <div className="bg-accent/20 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transaction Fee</span>
              <span className={transfer.fee < 1 ? 'text-success font-semibold' : 'text-destructive'}>
                €{transfer.fee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Settlement Time</span>
              <span className={transfer.type === 'instant' ? 'text-success' : 'text-warning'}>
                {transfer.type === 'instant' ? '~2 minutes' : '2 business days'}
              </span>
            </div>
            {transfer.txHash && (
              <div className="flex justify-between text-sm">
                <span>Transaction Hash</span>
                <span className="font-mono text-xs text-treasury-teal">
                  {transfer.txHash.slice(0, 10)}...
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Timestamp</span>
              <span>{transfer.timestamp.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Comparison */}
          {transfer.type === 'instant' && (
            <div className="bg-success/10 rounded-lg p-4">
              <div className="text-sm font-semibold text-success mb-2">
                Savings vs Traditional SWIFT
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-muted-foreground">Time Saved</div>
                  <div className="font-semibold text-success">~2 days</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Cost Saved</div>
                  <div className="font-semibold text-success">€19.99</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};