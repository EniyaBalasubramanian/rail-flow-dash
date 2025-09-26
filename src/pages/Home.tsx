import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Activity, FileText, Train, Users, Zap } from 'lucide-react';
import KPICard from '@/components/KPICard';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-lg p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Rail Scheduler Control Center
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Intelligent train scheduling system for Indian Railways traffic controllers.
            Optimize routes, predict delays, and ensure seamless operations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Link to="/scheduler" className="group">
              <div className="control-panel text-center hover:bg-primary/5 transition-colors">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Scheduler</h3>
                <p className="text-sm text-muted-foreground">View & manage train schedules</p>
              </div>
            </Link>
            
            <Link to="/delay-prediction" className="group">
              <div className="control-panel text-center hover:bg-primary/5 transition-colors">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Delay Prediction</h3>
                <p className="text-sm text-muted-foreground">AI-powered delay forecasting</p>
              </div>
            </Link>
            
            <Link to="/simulation" className="group">
              <div className="control-panel text-center hover:bg-primary/5 transition-colors">
                <Activity className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">What-if Simulation</h3>
                <p className="text-sm text-muted-foreground">Test scenarios & optimizations</p>
              </div>
            </Link>
            
            <Link to="/audit-trail" className="group">
              <div className="control-panel text-center hover:bg-primary/5 transition-colors">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Audit Trail</h3>
                <p className="text-sm text-muted-foreground">Track manual overrides</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Real-time KPIs */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Zap className="h-5 w-5 text-primary mr-2" />
          Real-time Performance Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Average Delay"
            value="4.2"
            unit="minutes"
            trend="down"
            trendValue="0.8m"
            description="Last 24 hours"
          />
          
          <KPICard
            title="Punctuality Rate"
            value="87.3"
            unit="%"
            trend="up"
            trendValue="2.1%"
            description="Trains on time"
          />
          
          <KPICard
            title="Throughput"
            value="148"
            unit="trains"
            trend="up"
            trendValue="12"
            description="Today's total"
          />
          
          <KPICard
            title="ML Predictions"
            value="23"
            unit="active"
            trend="neutral"
            trendValue="5"
            description="Delay alerts"
          />
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Train className="h-5 w-5 text-primary mr-2" />
            Active Trains
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-express-train rounded-full"></div>
                <span className="font-medium">Rajdhani Express 12001</span>
              </div>
              <span className="status-on-time">On Time</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-local-train rounded-full"></div>
                <span className="font-medium">Mumbai Local 90134</span>
              </div>
              <span className="status-delayed">+3 min</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-control-bg rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-freight-train rounded-full"></div>
                <span className="font-medium">Freight 56789</span>
              </div>
              <span className="status-predicted">Predicted +5 min</span>
            </div>
          </div>
        </div>
        
        <div className="control-panel">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Users className="h-5 w-5 text-primary mr-2" />
            Controller Actions
          </h3>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Controller Singh</span> manually adjusted platform for Train 12001
              <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Controller Patel</span> applied delay compensation to Route 3
              <div className="text-xs text-muted-foreground mt-1">15 minutes ago</div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">System</span> predicted delay for Train 90134
              <div className="text-xs text-muted-foreground mt-1">22 minutes ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;