import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Eye, EyeOff, RefreshCw, Shield, Users, Database } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [expectedCaptcha, setExpectedCaptcha] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user, mockUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Generate random captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setExpectedCaptcha(num1 + num2);
    return { num1, num2 };
  };

  const [captchaNums, setCaptchaNums] = useState(() => generateCaptcha());

  const refreshCaptcha = () => {
    setCaptchaNums(generateCaptcha());
    setCaptchaValue('');
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, parseInt(captchaValue), expectedCaptcha);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (userRole) => {
    const user = mockUsers.find(u => u.role === userRole);
    if (user) {
      setEmail(user.email);
      // For demo purposes, we'll use the known passwords
      const passwords = {
        admin: 'admin123',
        editor: 'editor123',
        viewer: 'viewer123'
      };
      setPassword(passwords[userRole]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-accent-light/20 p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                Dashboard Pro
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Secure role-based access control system with advanced permissions management.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span>Multi-role user management</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Database className="w-5 h-5 text-primary" />
              <span>Advanced data operations</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto shadow-medium">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha">Security Check</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="bg-muted px-3 py-2 rounded-md font-mono text-sm">
                      {captchaNums.num1} + {captchaNums.num2} = ?
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={refreshCaptcha}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  id="captcha"
                  type="number"
                  value={captchaValue}
                  onChange={(e) => setCaptchaValue(e.target.value)}
                  placeholder="Enter the result"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Demo Credentials:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('admin')}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('editor')}
                  className="text-xs"
                >
                  Editor
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials('viewer')}
                  className="text-xs"
                >
                  Viewer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;