import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  User,
  Mail,
  Shield,
  Key,
  Save,
  Edit,
  CheckCircle,
  Camera,
  Calendar,
  Activity
} from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Mock save operation
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    // Mock password change
    setPasswordData({ current: '', new: '', confirm: '' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-destructive text-destructive-foreground',
      editor: 'bg-warning text-warning-foreground',
      viewer: 'bg-secondary text-secondary-foreground'
    };
    return colors[role] || 'bg-muted text-muted-foreground';
  };

  const getRolePermissions = (role) => {
    const permissions = {
      admin: ['Import Data', 'View Data', 'Edit Data', 'Save Changes', 'View Summary', 'User Management'],
      editor: ['View Data', 'Edit Data', 'Save Changes', 'View Summary'],
      viewer: ['View Data', 'View Summary (Read-only)']
    };
    return permissions[role] || [];
  };

  // Mock activity log
  const activityLog = [
    {
      id: 1,
      action: 'Login',
      timestamp: '2024-01-15 14:30:00',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: 2,
      action: 'Data Export',
      timestamp: '2024-01-15 13:45:00',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: 3,
      action: 'Profile Update',
      timestamp: '2024-01-15 12:30:00',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: 4,
      action: 'Login',
      timestamp: '2024-01-15 09:15:00',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and account preferences.
        </p>
      </div>

      {saved && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
      )}

      {/* Profile information */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="gradient-primary text-white text-lg">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
              <Badge className={getRoleColor(user?.role)}>
                {user?.role?.toUpperCase()} USER
              </Badge>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editing}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            {editing ? (
              <>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role and permissions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Role & Permissions</span>
          </CardTitle>
          <CardDescription>
            Your current role and associated permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Role</p>
                <p className="text-sm text-muted-foreground">
                  Assigned by system administrator
                </p>
              </div>
              <Badge className={getRoleColor(user?.role)} variant="outline">
                {user?.role?.toUpperCase()}
              </Badge>
            </div>
            
            <div>
              <p className="font-medium mb-2">Permissions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getRolePermissions(user?.role).map((permission, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password change */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              placeholder="Confirm new password"
            />
          </div>
          <Button onClick={handlePasswordChange} variant="outline">
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>
            Your recent account activity and login history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.device} • {activity.ip}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="shadow-soft border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sign out from all devices</p>
              <p className="text-sm text-muted-foreground">
                This will sign you out from all devices and require you to log in again.
              </p>
            </div>
            <Button variant="destructive" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;