import { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import KPICard from '@/components/KPICard';

interface PredictionData {
  id: string;
  trainName: string;
  type: 'express' | 'local' | 'freight';
  currentDelay: number;
  predictedDelay: number;
  confidence: number;
  factors: string[];
  nextStation: string;
  eta: string;
  status: 'on-time' | 'delayed' | 'critical';
}

const DelayPrediction = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('4h');

  const predictions: PredictionData[] = [
    {
      id: '1',
      trainName: 'Rajdhani 12001',
      type: 'express',
      currentDelay: 0,
      predictedDelay: 2,
      confidence: 85,
      factors: ['Weather conditions', 'Track congestion'],
      nextStation: 'New Delhi',
      eta: '14:30',
      status: 'on-time',
    },
    {
      id: '2',
      trainName: 'Local 90134',
      type: 'local',
      currentDelay: 3,
      predictedDelay: 8,
      confidence: 92,
      factors: ['Signal delays', 'Passenger boarding time', 'Previous delays'],
      nextStation: 'Andheri',
      eta: '14:45',
      status: 'delayed',
    },
    {
      id: '3',
      trainName: 'Freight 56789',
      type: 'freight',
      currentDelay: 0,
      predictedDelay: 12,
      confidence: 78,
      factors: ['Track maintenance', 'Priority conflicts'],
      nextStation: 'Jaipur Junction',
      eta: '16:20',
      status: 'critical',
    },
    {
      id: '4',
      trainName: 'Shatabdi 12002',
      type: 'express',
      currentDelay: 1,
      predictedDelay: 1,
      confidence: 95,
      factors: ['Minimal impact factors'],
      nextStation: 'Bhopal',
      eta: '15:15',
      status: 'on-time',
    },
    {
      id: '5',
      trainName: 'Express 12003',
      type: 'express',
      currentDelay: 5,
      predictedDelay: 7,
      confidence: 88,
      factors: ['Route congestion', 'Crew change delay'],
      nextStation: 'Chennai Central',
      eta: '17:45',
      status: 'delayed',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'delayed':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getTrainTypeColor = (type: string) => {
    switch (type) {
      case 'express':
        return 'bg-express-train';
      case 'local':
        return 'bg-local-train';
      case 'freight':
        return 'bg-freight-train';
      default:
        return 'bg-muted';
    }
  };

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '8h', label: '8 Hours' },
    { value: '24h', label: '24 Hours' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Delay Prediction</h1>
          <p className="text-muted-foreground">AI-powered delay forecasting and analysis</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="text-sm font-medium text-foreground">Prediction Timeframe:</label>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-card border border-control-border rounded-md px-3 py-2 text-sm"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Prediction Accuracy"
          value="89.3"
          unit="%"
          trend="up"
          trendValue="2.1%"
          description="Last 30 days"
        />
        
        <KPICard
          title="Trains Monitored"
          value={predictions.length}
          unit="active"
          description="Real-time tracking"
        />
        
        <KPICard
          title="Critical Predictions"
          value={predictions.filter(p => p.status === 'critical').length}
          unit="alerts"
          trend="down"
          trendValue="2"
        />
        
        <KPICard
          title="Avg Confidence"
          value="87.6"
          unit="%"
          trend="up"
          trendValue="1.4%"
        />
      </div>

      {/* Predictions Table */}
      <div className="control-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <TrendingUp className="h-5 w-5 text-primary mr-2" />
            Train Delay Predictions
          </h3>
          
          <button className="btn-control text-sm">
            Export Data
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-control-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Train</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Current Delay</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Predicted Delay</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Confidence</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Next Station</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">ETA</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction) => (
                <tr key={prediction.id} className="border-b border-timeline-grid hover:bg-control-bg">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getTrainTypeColor(prediction.type)}`}></div>
                      <span className="font-medium text-foreground">{prediction.trainName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize text-muted-foreground">{prediction.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${prediction.currentDelay > 0 ? 'text-destructive' : 'text-success'}`}>
                      {prediction.currentDelay > 0 ? `+${prediction.currentDelay}m` : 'On time'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${prediction.predictedDelay > 5 ? 'text-destructive' : prediction.predictedDelay > 2 ? 'text-warning' : 'text-success'}`}>
                      {prediction.predictedDelay > 0 ? `+${prediction.predictedDelay}m` : 'On time'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-control-bg rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{prediction.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{prediction.nextStation}</td>
                  <td className="py-3 px-4 font-mono text-foreground">{prediction.eta}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(prediction.status)}
                      <span className={`status-${prediction.status} capitalize`}>
                        {prediction.status.replace('-', ' ')}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prediction Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Key Prediction Factors
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <span className="text-foreground">Weather Conditions</span>
              <span className="text-sm text-muted-foreground">High Impact</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <span className="text-foreground">Track Congestion</span>
              <span className="text-sm text-muted-foreground">Medium Impact</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <span className="text-foreground">Signal Delays</span>
              <span className="text-sm text-muted-foreground">Medium Impact</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <span className="text-foreground">Passenger Load</span>
              <span className="text-sm text-muted-foreground">Low Impact</span>
            </div>
          </div>
        </div>
        
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Model Performance
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Express Trains</span>
                <span className="text-muted-foreground">92% accuracy</span>
              </div>
              <div className="w-full bg-control-bg rounded-full h-2">
                <div className="bg-express-train h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Local Trains</span>
                <span className="text-muted-foreground">87% accuracy</span>
              </div>
              <div className="w-full bg-control-bg rounded-full h-2">
                <div className="bg-local-train h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">Freight Trains</span>
                <span className="text-muted-foreground">84% accuracy</span>
              </div>
              <div className="w-full bg-control-bg rounded-full h-2">
                <div className="bg-freight-train h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelayPrediction;