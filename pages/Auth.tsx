import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, FileText, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';

interface AuthPageProps {
  type: 'login' | 'register';
  onAuthSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ type, onAuthSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const isLogin = type === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    setTimeout(() => {
      onAuthSuccess();
    }, 500);
  };

  const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      {isLogin ? (
         // Login Header
         <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
            <div className="mx-auto h-12 w-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <FileText size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">MeMori Fácil</h2>
            <p className="mt-2 text-sm text-gray-600">
             Entre com suas credenciais para acessar
            </p>
         </div>
      ) : (
         // Register Header
         <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
            <div className="flex items-center gap-2 mb-4">
                 <div className="bg-red-600 p-1.5 rounded text-white">
                    <FileText size={20} />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900">MeMori Fácil</h2>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Crie sua conta</h2>
            <p className="mt-2 text-gray-600">
             Comece a criar memoriais descritivos com facilidade e rapidez.
            </p>
         </div>
      )}

      <div className={`sm:mx-auto sm:w-full sm:max-w-md ${isLogin ? '' : 'sm:max-w-[480px]'}`}>
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-100 sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder={isLogin ? "Seu email" : "seu@email.com"}
              icon={Mail}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Senha</label>
                {isLogin && (
                    <a href="#" className="text-sm font-medium text-red-600 hover:text-red-500">
                    Esqueci minha senha?
                    </a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                </div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Sua senha" : "........"}
                    className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
              </div>
            </div>

            {!isLogin && (
                 <Input
                 label="Confirmar Senha"
                 type="password"
                 placeholder="........"
                 icon={CheckCircle}
                 required
               />
            )}

            <Button type="submit" fullWidth>
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? 'Não tem uma conta?' : 'OU'}
                </span>
              </div>
            </div>
            
            {isLogin ? (
                <div className="mt-6 text-center">
                     <Link to="/register" className="font-bold text-red-600 hover:text-red-500">
                        Cadastre-se
                     </Link>
                </div>
            ) : (
                <>
                <div className="mt-6">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                    >
                        <GoogleIcon />
                        Continuar com Google
                    </button>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-bold text-red-600 hover:text-red-500">
                        Faça login
                    </Link>
                </div>
                </>
            )}

          </div>
        </div>

        {!isLogin && (
            <p className="text-center text-xs text-gray-500 mt-6 max-w-sm mx-auto">
                Ao se cadastrar, você concorda com nossos <a href="#" className="underline">Termos de Serviço</a> e <a href="#" className="underline">Política de Privacidade</a>.
            </p>
        )}
        
        {isLogin && (
            <p className="text-center text-xs text-gray-400 mt-8">
             © 2023 MeMori Fácil. Todos os direitos reservados.
            </p>
        )}

      </div>
    </div>
  );
};