import { useState } from 'react';
import { Play, Plus, RotateCcw, Zap } from 'lucide-react';
import GanttChart from '@/components/GanttChart';
import KPICard from '@/components/KPICard';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  delayInjections: DelayInjection[];
}

interface DelayInjection {
  id: string;
  trainId: string;
  trainName: string;
  delayAmount: number;
  reason: string;
  timestamp: string;
}

const Simulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('scenario1');
  const [delayInjections, setDelayInjections] = useState<DelayInjection[]>([]);
  const [newDelay, setNewDelay] = useState({ trainId: '', amount: 5, reason: 'Signal failure' });

  const scenarios: SimulationScenario[] = [
    {
      id: 'scenario1',
      name: 'Normal Operations',
      description: 'Standard traffic flow with minimal delays',
      delayInjections: [],
    },
    {
      id: 'scenario2',
      name: 'Weather Impact',
      description: 'Heavy rain causing moderate delays',
      delayInjections: [
        {
          id: '1',
          trainId: '1',
          trainName: 'Rajdhani 12001',
          delayAmount: 10,
          reason: 'Weather conditions',
          timestamp: '14:30',
        },
      ],
    },
    {
      id: 'scenario3',
      name: 'Signal Failure',
      description: 'Major signal failure affecting multiple trains',
      delayInjections: [
        {
          id: '1',
          trainId: '1',
          trainName: 'Rajdhani 12001',
          delayAmount: 15,
          reason: 'Signal failure',
          timestamp: '14:30',
        },
        {
          id: '2',
          trainId: '2',
          trainName: 'Local 90134',
          delayAmount: 8,
          reason: 'Signal failure',
          timestamp: '14:45',
        },
      ],
    },
  ];

  // Sample train data with simulation adjustments
  const [baseTrains] = useState([
    {
      id: '1',
      name: 'Rajdhani 12001',
      type: 'express' as const,
      priority: 1,
      startTime: '06:30',
      endTime: '07:15',
      platform: 1,
      status: 'on-time' as const,
    },
    {
      id: '2',
      name: 'Local 90134',
      type: 'local' as const,
      priority: 3,
      startTime: '07:00',
      endTime: '07:45',
      platform: 2,
      status: 'on-time' as const,
    },
    {
      id: '3',
      name: 'Freight 56789',
      type: 'freight' as const,
      priority: 5,
      startTime: '08:15',
      endTime: '09:30',
      platform: 3,
      status: 'on-time' as const,
    },
    {
      id: '4',
      name: 'Shatabdi 12002',
      type: 'express' as const,
      priority: 2,
      startTime: '09:00',
      endTime: '09:45',
      platform: 1,
      status: 'on-time' as const,
    },
  ]);

  // Apply delays to trains based on current scenario and injections
  const getSimulatedTrains = () => {
    const currentScenario = scenarios.find(s => s.id === selectedScenario);
    const allDelays = [...(currentScenario?.delayInjections || []), ...delayInjections];
    
    return baseTrains.map(train => {
      const delays = allDelays.filter(d => d.trainId === train.id);
      const totalDelay = delays.reduce((sum, delay) => sum + delay.delayAmount, 0);
      
      return {
        ...train,
        delay: totalDelay > 0 ? totalDelay : undefined,
        status: totalDelay > 0 ? ('delayed' as const) : train.status,
      };
    });
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    // Simulate running for a few seconds
    setTimeout(() => {
      setIsSimulating(false);
    }, 3000);
  };

  const handleInjectDelay = () => {
    if (!newDelay.trainId) return;
    
    const injection: DelayInjection = {
      id: Date.now().toString(),
      trainId: newDelay.trainId,
      trainName: baseTrains.find(t => t.id === newDelay.trainId)?.name || '',
      delayAmount: newDelay.amount,
      reason: newDelay.reason,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setDelayInjections([...delayInjections, injection]);
    setNewDelay({ trainId: '', amount: 5, reason: 'Signal failure' });
  };

  const handleResetSimulation = () => {
    setDelayInjections([]);
    setSelectedScenario('scenario1');
  };

  const trainOptions = baseTrains.map(train => ({
    value: train.id,
    label: train.name,
  }));

  const reasonOptions = [
    'Signal failure',
    'Weather conditions',
    'Track maintenance',
    'Passenger incident',
    'Technical issue',
    'Crew delay',
  ];

  const simulatedTrains = getSimulatedTrains();
  const totalDelayedTrains = simulatedTrains.filter(t => t.delay && t.delay > 0).length;
  const avgDelay = simulatedTrains.reduce((sum, t) => sum + (t.delay || 0), 0) / simulatedTrains.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">What-if Simulation</h1>
          <p className="text-muted-foreground">Test delay scenarios and optimization strategies</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className={`btn-control flex items-center space-x-2 ${
              isSimulating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Play className="h-4 w-4" />
            <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
          </button>
          
          <button
            onClick={handleResetSimulation}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md font-medium transition-colors shadow-sm flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="control-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Simulation Scenario</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedScenario === scenario.id
                  ? 'border-primary bg-primary/5'
                  : 'border-control-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <h4 className="font-semibold text-foreground mb-2">{scenario.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{scenario.description}</p>
              <div className="text-xs text-muted-foreground">
                {scenario.delayInjections.length} pre-configured delays
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delay Injection */}
      <div className="control-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Zap className="h-5 w-5 text-primary mr-2" />
          Inject Custom Delays
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Select Train
            </label>
            <select
              value={newDelay.trainId}
              onChange={(e) => setNewDelay({ ...newDelay, trainId: e.target.value })}
              className="w-full bg-card border border-control-border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Choose train...</option>
              {trainOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Delay Amount (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={newDelay.amount}
              onChange={(e) => setNewDelay({ ...newDelay, amount: parseInt(e.target.value) || 5 })}
              className="w-full bg-card border border-control-border rounded-md px-3 py-2 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Reason
            </label>
            <select
              value={newDelay.reason}
              onChange={(e) => setNewDelay({ ...newDelay, reason: e.target.value })}
              className="w-full bg-card border border-control-border rounded-md px-3 py-2 text-sm"
            >
              {reasonOptions.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <button
              onClick={handleInjectDelay}
              disabled={!newDelay.trainId}
              className="btn-warning w-full flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Inject Delay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulation Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Affected Trains"
          value={totalDelayedTrains}
          unit="trains"
          description="With delays"
        />
        
        <KPICard
          title="Average Delay"
          value={avgDelay.toFixed(1)}
          unit="minutes"
          trend={avgDelay > 5 ? 'up' : avgDelay > 0 ? 'neutral' : 'down'}
          trendValue={`${avgDelay.toFixed(1)}m`}
        />
        
        <KPICard
          title="Schedule Impact"
          value={totalDelayedTrains > 0 ? 'High' : 'Low'}
          description="System disruption"
        />
        
        <KPICard
          title="Recovery Time"
          value="~45"
          unit="minutes"
          description="Est. normalization"
        />
      </div>

      {/* Simulated Timeline */}
      <GanttChart
        trains={simulatedTrains}
        onTrainClick={(train) => console.log('Simulated train clicked:', train)}
      />

      {/* Active Delays */}
      {delayInjections.length > 0 && (
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Delay Injections</h3>
          
          <div className="space-y-2">
            {delayInjections.map((injection) => (
              <div
                key={injection.id}
                className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="font-medium text-foreground">{injection.trainName}</span>
                    <span className="text-muted-foreground ml-2">
                      +{injection.delayAmount} minutes - {injection.reason}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Injected at {injection.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulation;