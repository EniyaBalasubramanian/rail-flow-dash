import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, Clock, TrendingUp, Activity, FileText } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Train },
    { path: '/scheduler', label: 'Scheduler', icon: Clock },
    { path: '/delay-prediction', label: 'Delay Prediction', icon: TrendingUp },
    { path: '/simulation', label: 'What-if Simulation', icon: Activity },
    { path: '/audit-trail', label: 'Audit Trail', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-control-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Train className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Rail Scheduler</h1>
                <p className="text-sm text-muted-foreground">Indian Railways Traffic Control System</p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              System Status: <span className="text-success font-medium">Operational</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-control-bg border-b border-control-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center space-x-2 ${isActive ? 'active' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;