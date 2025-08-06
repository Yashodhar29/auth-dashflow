import { createContext, useContext, useState, useEffect } from 'react';

// Mock user data with predefined roles
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: 2,
    email: 'editor@company.com',
    password: 'editor123',
    role: 'editor',
    name: 'Editor User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor'
  },
  {
    id: 3,
    email: 'viewer@company.com',
    password: 'viewer123',
    role: 'viewer',
    name: 'Viewer User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer'
  }
];

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, captchaValue, expectedCaptcha) => {
    // Validate captcha
    if (captchaValue !== expectedCaptcha) {
      throw new Error('Invalid captcha. Please try again.');
    }

    // Find user by email and password
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password.');
    }

    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = foundUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    const permissions = {
      admin: ['import', 'view', 'edit', 'save', 'summary'],
      editor: ['view', 'edit', 'save', 'summary'],
      viewer: ['view', 'summary']
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    loading,
    mockUsers: MOCK_USERS.map(({ password, ...user }) => user) // For demo purposes
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};