import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';
import {
  Save,
  Database,
  CheckCircle,
  Clock,
  AlertTriangle,
  History,
  Download
} from 'lucide-react';

const SaveData = () => {
  const { hasPermission } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [lastSaved, setLastSaved] = useState('2024-01-15 14:30:00');

  const handleSave = async () => {
    if (!hasPermission('save')) return;

    setSaving(true);
    setSaveProgress(0);

    // Simulate save progress
    const interval = setInterval(() => {
      setSaveProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSaving(false);
          setLastSaved(new Date().toLocaleString());
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  // Mock pending changes
  const pendingChanges = [
    {
      id: 1,
      type: 'update',
      table: 'users',
      record: 'John Doe (ID: 123)',
      field: 'email',
      oldValue: 'john.old@example.com',
      newValue: 'john.new@example.com',
      timestamp: '2024-01-15 14:25:00'
    },
    {
      id: 2,
      type: 'update',
      table: 'users',
      record: 'Jane Smith (ID: 124)',
      field: 'department',
      oldValue: 'Sales',
      newValue: 'Marketing',
      timestamp: '2024-01-15 14:22:00'
    },
    {
      id: 3,
      type: 'insert',
      table: 'users',
      record: 'New User',
      field: '-',
      oldValue: '-',
      newValue: 'Complete record',
      timestamp: '2024-01-15 14:20:00'
    }
  ];

  // Mock save history
  const saveHistory = [
    {
      id: 1,
      timestamp: '2024-01-15 13:45:00',
      changes: 15,
      status: 'success',
      duration: '2.3s'
    },
    {
      id: 2,
      timestamp: '2024-01-15 12:30:00',
      changes: 8,
      status: 'success',
      duration: '1.8s'
    },
    {
      id: 3,
      timestamp: '2024-01-15 11:15:00',
      changes: 23,
      status: 'success',
      duration: '3.1s'
    },
    {
      id: 4,
      timestamp: '2024-01-15 10:00:00',
      changes: 5,
      status: 'failed',
      duration: '0.5s'
    }
  ];

  const getChangeTypeColor = (type) => {
    const colors = {
      update: 'bg-warning/10 text-warning border-warning/20',
      insert: 'bg-success/10 text-success border-success/20',
      delete: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return colors[type] || colors.update;
  };

  const getStatusBadge = (status) => {
    return status === 'success' ? (
      <Badge className="bg-success text-success-foreground">Success</Badge>
    ) : (
      <Badge variant="destructive">Failed</Badge>
    );
  };

  const canSave = hasPermission('save');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Save Data</h1>
        <p className="text-muted-foreground">
          Review and save your pending changes to the database.
        </p>
      </div>

      {/* Save status */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Database Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-medium">{pendingChanges.length} Pending Changes</p>
                <p className="text-sm text-muted-foreground">Ready to save</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium">Last Saved</p>
                <p className="text-sm text-muted-foreground">{lastSaved}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Connection</p>
                <p className="text-sm text-success">Stable</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending changes */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Pending Changes</span>
            </div>
            <Button 
              onClick={handleSave} 
              disabled={saving || !canSave || pendingChanges.length === 0}
              className="gradient-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save All Changes'}
            </Button>
          </CardTitle>
          <CardDescription>
            {pendingChanges.length} changes ready to be saved to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!canSave && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You don't have permission to save changes. Contact an administrator.
              </AlertDescription>
            </Alert>
          )}

          {saving && (
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Saving changes...</span>
                <span>{Math.round(saveProgress)}%</span>
              </div>
              <Progress value={saveProgress} className="w-full" />
            </div>
          )}

          <div className="space-y-3">
            {pendingChanges.map((change) => (
              <div key={change.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getChangeTypeColor(change.type)}>
                        {change.type.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{change.table}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{change.record}</span>
                    </div>
                    
                    {change.type !== 'insert' && (
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Field:</span>
                          <span>{change.field}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Old:</span>
                          <span className="text-muted-foreground">{change.oldValue}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">New:</span>
                          <span className="text-success">{change.newValue}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {change.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pendingChanges.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <p className="text-lg font-medium">No pending changes</p>
              <p className="text-muted-foreground">All changes have been saved to the database.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save history */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Save History</span>
          </CardTitle>
          <CardDescription>
            Recent save operations and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {saveHistory.map((save) => (
              <div key={save.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">{save.timestamp}</p>
                    <p className="text-sm text-muted-foreground">
                      {save.changes} changes • {save.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(save.status)}
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaveData;