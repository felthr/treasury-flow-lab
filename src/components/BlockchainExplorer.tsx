import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Copy, Clock } from 'lucide-react';
import { useState } from 'react';
import type { TransferData } from './TreasuryDashboard';

interface BlockchainExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  transfer: TransferData | null;
}

export const BlockchainExplorer = ({ isOpen, onClose, transfer }: BlockchainExplorerProps) => {
  const [copied, setCopied] = useState(false);

  if (!transfer?.txHash) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const mockBlockData = {
    blockNumber: 18542891,
    blockHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef123456789012345678901234',
    gasUsed: '21,000',
    gasPrice: '15 gwei',
    confirmations: 12,
    timestamp: new Date().toISOString(),
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Blockchain Transaction Explorer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Status */}
          <Card className="bg-success/10 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-semibold text-success">Transaction Confirmed</span>
                </div>
                <Badge className="bg-success text-white">
                  {mockBlockData.confirmations} Confirmations
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Hash */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Transaction Hash</label>
            <div className="flex items-center gap-2 p-3 bg-accent/20 rounded-lg">
              <code className="flex-1 text-sm font-mono text-treasury-blue break-all">
                {transfer.txHash}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(transfer.txHash!)}
                className="hover:bg-accent"
              >
                {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Transfer Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold text-treasury-blue">
                      {formatCurrency(transfer.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-semibold">{transfer.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-semibold">{transfer.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-semibold text-success">€{transfer.fee.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Block Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Number</span>
                    <span className="font-semibold text-treasury-teal">
                      #{mockBlockData.blockNumber.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Used</span>
                    <span className="font-semibold">{mockBlockData.gasUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Price</span>
                    <span className="font-semibold">{mockBlockData.gasPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmations</span>
                    <span className="font-semibold text-success">{mockBlockData.confirmations}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 text-foreground">Transaction Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Transaction Submitted</div>
                    <div className="text-sm text-muted-foreground">
                      {transfer.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Included in Block</div>
                    <div className="text-sm text-muted-foreground">
                      Block #{mockBlockData.blockNumber.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Confirmed</div>
                    <div className="text-sm text-muted-foreground">
                      {mockBlockData.confirmations} network confirmations
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Highlight */}
          <Card className="bg-gradient-primary/10 border-primary/20">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-primary">Blockchain Benefits Realized</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-success">~2 min</div>
                  <div className="text-muted-foreground">Settlement Time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">€19.99</div>
                  <div className="text-muted-foreground">Fees Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-success">24/7</div>
                  <div className="text-muted-foreground">Availability</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open(`https://etherscan.io/tx/${transfer.txHash}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Etherscan
            </Button>
            <Button onClick={onClose} className="flex-1 bg-gradient-primary text-white">
              Close Explorer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};