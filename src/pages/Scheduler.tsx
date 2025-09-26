import { useState } from 'react';
import { Play, Square, RotateCcw, Settings } from 'lucide-react';
import GanttChart from '@/components/GanttChart';
import KPICard from '@/components/KPICard';

const Scheduler = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('normal');

  // Sample train data
  const [trains] = useState([
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
      delay: 3,
      status: 'delayed' as const,
    },
    {
      id: '3',
      name: 'Freight 56789',
      type: 'freight' as const,
      priority: 5,
      startTime: '08:15',
      endTime: '09:30',
      platform: 3,
      delay: 5,
      status: 'predicted-delay' as const,
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
    {
      id: '5',
      name: 'Local 90135',
      type: 'local' as const,
      priority: 4,
      startTime: '10:30',
      endTime: '11:15',
      platform: 4,
      status: 'on-time' as const,
    },
    {
      id: '6',
      name: 'Express 12003',
      type: 'express' as const,
      priority: 2,
      startTime: '12:00',
      endTime: '12:45',
      platform: 2,
      status: 'on-time' as const,
    },
  ]);

  const handleRunScheduler = () => {
    setIsRunning(!isRunning);
    // Simulate scheduler running
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  const handleResetSchedule = () => {
    // Reset schedule logic
    console.log('Resetting schedule...');
  };

  const scenarios = [
    { value: 'normal', label: 'Normal Operations' },
    { value: 'peak', label: 'Peak Hours' },
    { value: 'freight', label: 'Freight Block' },
    { value: 'incident', label: 'Incident Response' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Train Scheduler</h1>
          <p className="text-muted-foreground">Manage and optimize train schedules in real-time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Scenario Selection */}
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="bg-card border border-control-border rounded-md px-3 py-2 text-sm"
          >
            {scenarios.map((scenario) => (
              <option key={scenario.value} value={scenario.value}>
                {scenario.label}
              </option>
            ))}
          </select>
          
          {/* Control Buttons */}
          <button
            onClick={handleRunScheduler}
            disabled={isRunning}
            className={`btn-control flex items-center space-x-2 ${
              isRunning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isRunning ? (
              <>
                <Square className="h-4 w-4" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Run Scheduler</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleResetSchedule}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md font-medium transition-colors shadow-sm flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Trains Scheduled"
          value={trains.length}
          unit="active"
        />
        
        <KPICard
          title="Platform Utilization"
          value="75"
          unit="%"
          trend="up"
          trendValue="5%"
        />
        
        <KPICard
          title="Schedule Efficiency"
          value="92.4"
          unit="%"
          trend="up"
          trendValue="1.2%"
        />
        
        <KPICard
          title="Conflicts Resolved"
          value="3"
          unit="today"
          description="Automatic resolution"
        />
      </div>

      {/* Gantt Chart */}
      <GanttChart
        trains={trains}
        onTrainClick={(train) => console.log('Train clicked:', train)}
      />

      {/* Additional Controls and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Settings className="h-5 w-5 text-primary mr-2" />
            Schedule Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Buffer Time (minutes)
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full bg-card border border-control-border rounded-md px-3 py-2 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Priority Threshold
              </label>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="3"
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="auto-optimize"
                defaultChecked
                className="rounded border-control-border"
              />
              <label htmlFor="auto-optimize" className="text-sm text-foreground">
                Enable auto-optimization
              </label>
            </div>
          </div>
        </div>
        
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Schedule Changes
          </h3>
          
          <div className="space-y-3">
            <div className="text-sm">
              <div className="text-foreground font-medium">Platform reassignment</div>
              <div className="text-muted-foreground">Train 12001 moved from Platform 2 to Platform 1</div>
              <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
            </div>
            
            <div className="text-sm">
              <div className="text-foreground font-medium">Delay compensation</div>
              <div className="text-muted-foreground">Added 3-minute buffer for Local 90134</div>
              <div className="text-xs text-muted-foreground mt-1">8 minutes ago</div>
            </div>
            
            <div className="text-sm">
              <div className="text-foreground font-medium">Route optimization</div>
              <div className="text-muted-foreground">Freight 56789 rescheduled to avoid conflicts</div>
              <div className="text-xs text-muted-foreground mt-1">15 minutes ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;