import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Database,
  Save,
  BarChart3,
  Users,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react';

const DashboardHome = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Import Data',
      description: 'Upload and import Excel spreadsheets',
      icon: Upload,
      action: () => navigate('/dashboard/import'),
      permission: 'import',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      title: 'View Data',
      description: 'Browse and analyze your data',
      icon: Database,
      action: () => navigate('/dashboard/data'),
      permission: 'view',
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      title: 'Save Changes',
      description: 'Save your modifications',
      icon: Save,
      action: () => navigate('/dashboard/save'),
      permission: 'save',
      color: 'text-success',
      bg: 'bg-success/10'
    },
    {
      title: 'View Summary',
      description: 'See data insights and reports',
      icon: BarChart3,
      action: () => navigate('/dashboard/summary'),
      permission: 'summary',
      color: 'text-warning',
      bg: 'bg-warning/10'
    }
  ];

  const stats = [
    {
      title: 'Total Records',
      value: '2,543',
      change: '+12%',
      icon: Database,
      color: 'text-primary'
    },
    {
      title: 'Active Users',
      value: '128',
      change: '+5%',
      icon: Users,
      color: 'text-accent'
    },
    {
      title: 'Data Quality',
      value: '98.5%',
      change: '+2%',
      icon: Shield,
      color: 'text-success'
    },
    {
      title: 'System Load',
      value: '23%',
      change: '-8%',
      icon: Activity,
      color: 'text-warning'
    }
  ];

  const availableActions = quickActions.filter(action => 
    !action.permission || hasPermission(action.permission)
  );

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-destructive text-destructive-foreground',
      editor: 'bg-warning text-warning-foreground',
      viewer: 'bg-secondary text-secondary-foreground'
    };
    return colors[role] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mb-4">
              Here's what's happening with your data today.
            </p>
            <Badge className={getRoleColor(user?.role)}>
              {user?.role?.toUpperCase()} USER
            </Badge>
          </div>
          <div className="hidden md:block">
            <TrendingUp className="w-16 h-16 text-primary/30" />
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-success">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all cursor-pointer group"
                onClick={action.action}
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 ${action.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-success-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Data import completed</p>
                <p className="text-sm text-muted-foreground">2,543 records processed</p>
              </div>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Save className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Changes saved successfully</p>
                <p className="text-sm text-muted-foreground">Updates applied to database</p>
              </div>
              <p className="text-sm text-muted-foreground">4 hours ago</p>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Summary report generated</p>
                <p className="text-sm text-muted-foreground">Monthly analytics ready</p>
              </div>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;