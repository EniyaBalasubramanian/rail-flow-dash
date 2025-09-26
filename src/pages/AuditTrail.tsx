import { useState } from 'react';
import { FileText, Search, Filter, Download, User, Clock, Edit } from 'lucide-react';

interface AuditEntry {
  id: string;
  timestamp: string;
  controller: string;
  action: string;
  target: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
  impact: 'low' | 'medium' | 'high';
  category: 'schedule' | 'platform' | 'delay' | 'route' | 'system';
}

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const auditEntries: AuditEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:32:15',
      controller: 'Controller Singh',
      action: 'Platform Assignment Changed',
      target: 'Rajdhani Express 12001',
      oldValue: 'Platform 2',
      newValue: 'Platform 1',
      reason: 'Conflict resolution with incoming freight train',
      impact: 'medium',
      category: 'platform',
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:28:45',
      controller: 'Controller Patel',
      action: 'Schedule Override',
      target: 'Local Train 90134',
      oldValue: '14:30 departure',
      newValue: '14:35 departure',
      reason: 'Passenger safety - overcrowding',
      impact: 'low',
      category: 'schedule',
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:15:22',
      controller: 'System Auto',
      action: 'Route Optimization',
      target: 'Freight 56789',
      oldValue: 'Route A',
      newValue: 'Route B',
      reason: 'Automatic optimization for efficiency',
      impact: 'high',
      category: 'route',
    },
    {
      id: '4',
      timestamp: '2024-01-15 13:45:18',
      controller: 'Controller Kumar',
      action: 'Delay Compensation Added',
      target: 'Shatabdi 12002',
      oldValue: 'No buffer',
      newValue: '5 minute buffer',
      reason: 'Weather-related precaution',
      impact: 'medium',
      category: 'delay',
    },
    {
      id: '5',
      timestamp: '2024-01-15 13:22:33',
      controller: 'Controller Singh',
      action: 'Emergency Stop Override',
      target: 'Express 12003',
      oldValue: 'Scheduled stop',
      newValue: 'Emergency brake applied',
      reason: 'Signal failure at junction',
      impact: 'high',
      category: 'system',
    },
    {
      id: '6',
      timestamp: '2024-01-15 12:58:41',
      controller: 'Controller Patel',
      action: 'Priority Adjustment',
      target: 'Local Train 90135',
      oldValue: 'Priority 4',
      newValue: 'Priority 2',
      reason: 'VIP passenger accommodation',
      impact: 'medium',
      category: 'schedule',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'schedule', label: 'Schedule Changes' },
    { value: 'platform', label: 'Platform Assignment' },
    { value: 'delay', label: 'Delay Management' },
    { value: 'route', label: 'Route Changes' },
    { value: 'system', label: 'System Overrides' },
  ];

  const timeframes = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-destructive bg-destructive/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'schedule':
        return <Clock className="h-4 w-4" />;
      case 'platform':
        return <Edit className="h-4 w-4" />;
      case 'system':
        return <User className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = entry.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.controller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Trail</h1>
          <p className="text-muted-foreground">Track all manual overrides and system changes</p>
        </div>
        
        <button className="btn-control flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filters */}
      <div className="control-panel">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by train, controller, or action..."
                className="w-full bg-card border border-control-border rounded-md pl-10 pr-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-card border border-control-border rounded-md px-3 py-2 text-sm"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Time Range
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full bg-card border border-control-border rounded-md px-3 py-2 text-sm"
            >
              {timeframes.map((timeframe) => (
                <option key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn-control w-full flex items-center justify-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="kpi-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Entries</h3>
          <span className="text-2xl font-bold text-foreground">{filteredEntries.length}</span>
        </div>
        
        <div className="kpi-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">High Impact Actions</h3>
          <span className="text-2xl font-bold text-destructive">
            {filteredEntries.filter(e => e.impact === 'high').length}
          </span>
        </div>
        
        <div className="kpi-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Controllers Active</h3>
          <span className="text-2xl font-bold text-foreground">
            {new Set(filteredEntries.map(e => e.controller)).size}
          </span>
        </div>
        
        <div className="kpi-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">System Actions</h3>
          <span className="text-2xl font-bold text-primary">
            {filteredEntries.filter(e => e.controller.includes('System')).length}
          </span>
        </div>
      </div>

      {/* Audit Entries */}
      <div className="control-panel">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <FileText className="h-5 w-5 text-primary mr-2" />
          Audit Entries ({filteredEntries.length})
        </h3>
        
        <div className="space-y-3">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="border border-control-border rounded-lg p-4 hover:bg-control-bg/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(entry.category)}
                      <span className="font-medium text-foreground">{entry.action}</span>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getImpactColor(entry.impact)}`}>
                      {entry.impact} impact
                    </span>
                    
                    <span className="text-xs text-muted-foreground capitalize">
                      {entry.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Target:</span>
                      <span className="text-sm text-foreground font-medium ml-2">{entry.target}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Controller:</span>
                      <span className="text-sm text-foreground ml-2">{entry.controller}</span>
                    </div>
                  </div>
                  
                  {(entry.oldValue || entry.newValue) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {entry.oldValue && (
                        <div>
                          <span className="text-sm text-muted-foreground">Previous:</span>
                          <span className="text-sm text-foreground ml-2">{entry.oldValue}</span>
                        </div>
                      )}
                      
                      {entry.newValue && (
                        <div>
                          <span className="text-sm text-muted-foreground">Updated to:</span>
                          <span className="text-sm text-primary font-medium ml-2">{entry.newValue}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {entry.reason && (
                    <div className="mb-2">
                      <span className="text-sm text-muted-foreground">Reason:</span>
                      <span className="text-sm text-foreground ml-2">{entry.reason}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-foreground font-mono">{entry.timestamp.split(' ')[1]}</div>
                  <div className="text-xs text-muted-foreground">{entry.timestamp.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEntries.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No audit entries match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;