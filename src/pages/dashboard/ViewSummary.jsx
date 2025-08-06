import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Database,
  Activity,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

const ViewSummary = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('last30days');
  const [department, setDepartment] = useState('all');

  // Mock summary data
  const summaryStats = [
    {
      title: 'Total Records',
      value: '2,543',
      change: '+12%',
      trend: 'up',
      icon: Database,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Users',
      value: '128',
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Avg. Response Time',
      value: '1.2s',
      change: '-8%',
      trend: 'down',
      icon: Activity,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Data Quality Score',
      value: '98.5%',
      change: '+2%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  // Mock department breakdown
  const departmentData = [
    { name: 'Sales', users: 45, records: 1250, percentage: 35 },
    { name: 'Marketing', users: 32, records: 890, percentage: 25 },
    { name: 'IT', users: 28, records: 654, percentage: 18 },
    { name: 'HR', users: 18, records: 432, percentage: 12 },
    { name: 'Finance', users: 15, records: 317, percentage: 10 }
  ];

  // Mock activity timeline
  const recentActivity = [
    {
      id: 1,
      action: 'Data Import',
      description: 'sales_data_2024.xlsx imported successfully',
      user: 'Admin User',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'User Update',
      description: '15 user records modified',
      user: 'Editor User',
      timestamp: '4 hours ago',
      status: 'success'
    },
    {
      id: 3,
      action: 'System Backup',
      description: 'Automated backup completed',
      user: 'System',
      timestamp: '6 hours ago',
      status: 'success'
    },
    {
      id: 4,
      action: 'Data Export',
      description: 'Monthly report generated',
      user: 'Admin User',
      timestamp: '1 day ago',
      status: 'success'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getStatusBadge = (status) => {
    return (
      <Badge variant={status === 'success' ? 'default' : 'destructive'}>
        {status}
      </Badge>
    );
  };

  const isReadOnly = user?.role === 'viewer';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Summary Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your data and system performance.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" disabled={isReadOnly}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-48">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last90days">Last 90 days</SelectItem>
                  <SelectItem value="lastyear">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:w-48">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => {
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
                    <div className="flex items-center space-x-1 mt-1">
                      {getTrendIcon(stat.trend)}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department breakdown */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
            <CardDescription>
              Distribution of users and records by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {dept.users} users • {dept.records} records
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest system activities and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{activity.action}</p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance metrics */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            System performance and usage statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-success">1.2s</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent">15.2GB</div>
              <div className="text-sm text-muted-foreground">Data Storage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isReadOnly && (
        <Card className="shadow-soft border-warning">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-warning">
              <Activity className="w-5 h-5" />
              <span className="font-medium">
                You have read-only access to this summary. Contact an administrator for editing permissions.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ViewSummary;