import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import UploadArea from './components/UploadArea';
import FileProcessor from './components/FileProcessor';
import { DatabaseIcon, GoogleIcon } from './components/icons';
import type { ViewType, FileState, OutputFormat } from './types';

const LoginPage: React.FC<{ onLoginSuccess: () => void; }> = ({ onLoginSuccess }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (email === 'administrador@test.com' && password === 'test123') {
            onLoginSuccess();
        } else {
            setError('Invalid email or password.');
        }
    };
    
    const handleGoogleLogin = () => {
        console.log('Simulating Google Sign-In...');
        onLoginSuccess();
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically validate and submit registration data.
        // For now, it is a placeholder.
        alert('Registration functionality is not yet implemented.');
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-indigo-600 to-blue-500 items-center justify-center p-12 text-white relative">
                <div className="text-center">
                    <div className="inline-block bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                        <DatabaseIcon className="w-16 h-16" />
                    </div>
                    <h1 className="text-5xl font-bold mb-3">DataFlow</h1>
                    <p className="text-xl opacity-80">Your complete data conversion solution.</p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    {isLoginView ? (
                        <div key="login-view">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                            <p className="text-gray-600 mb-8">Please enter your details to sign in.</p>
                            <form onSubmit={handleLogin} noValidate>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required aria-required="true" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required aria-required="true" />
                                </div>
                                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                                <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Sign In</button>
                            </form>
                             <div className="my-6 flex items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-4 text-sm text-gray-500">OR</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <GoogleIcon className="w-5 h-5 mr-2" />
                                Sign in with Google
                            </button>
                            <p className="text-center text-sm text-gray-600 mt-8">
                                Don't have an account? <button onClick={() => setIsLoginView(false)} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</button>
                            </p>
                        </div>
                    ) : (
                        <div key="register-view">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
                            <p className="text-gray-600 mb-8">Get started with DataFlow today.</p>
                             <form onSubmit={handleRegister} noValidate>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="firstName"className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName"className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="reg-email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required aria-required="true" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="reg-password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input type="password" id="reg-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required aria-required="true" />
                                </div>
                                 <div className="mb-6">
                                    <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required aria-required="true" />
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Create Account</button>
                            </form>
                            <p className="text-center text-sm text-gray-600 mt-8">
                                Already have an account? <button onClick={() => setIsLoginView(true)} className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('upload');
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    conversionState: 'idle',
    outputFormat: null,
    progress: 0,
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleFileSelect = (file: File) => {
    setFileState({
      file,
      conversionState: 'idle',
      outputFormat: null,
      progress: 0,
    });
  };

  const handleReset = useCallback(() => {
    setFileState({
      file: null,
      conversionState: 'idle',
      outputFormat: null,
      progress: 0,
    });
  }, []);

  const handleConversion = (format: OutputFormat) => {
    if(!format) return;
    setFileState(prev => ({ ...prev, conversionState: 'converting', outputFormat: format, progress: 0 }));
    
    // Simulate conversion progress
    const interval = setInterval(() => {
      setFileState(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return { ...prev, conversionState: 'success' };
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 200);
  };

  const handleDownload = () => {
    if (fileState.file) {
      const blob = new Blob([fileState.file], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const extension = fileState.outputFormat?.toLowerCase() || 'bin';
      a.href = url;
      a.download = `${fileState.file.name.split('.').slice(0, -1).join('.')}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log(`Simulating download for ${a.download}`);
    }
  };

  const renderContent = () => {
    if (currentView === 'upload') {
      if (!fileState.file) {
        return <UploadArea onFileSelect={handleFileSelect} />;
      } else {
        return <FileProcessor 
                  fileState={fileState} 
                  onConvert={handleConversion} 
                  onDownload={handleDownload}
                  onReset={handleReset} 
               />;
      }
    }
    // Placeholder for other views
    return (
        <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl text-gray-400 font-medium">Coming Soon</h1>
        </div>
    );
  };
  
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;