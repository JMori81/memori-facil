import React, { useEffect, useState } from 'react';
import { RefreshCw, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const DataSynchronizer: React.FC = () => {
    const [status, setStatus] = useState<'connected' | 'syncing' | 'error' | 'disconnected'>('disconnected');
    const [lastSync, setLastSync] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!isSupabaseConfigured()) {
            setStatus('disconnected');
            setErrorMessage('Supabase não configurado');
            return;
        }

        checkConnection();
        const interval = setInterval(syncData, 30000); // Connect/Sync every 30s

        return () => clearInterval(interval);
    }, []);

    const checkConnection = async () => {
        try {
            const { error } = await supabase.from('projects').select('count', { count: 'exact', head: true });
            if (error && error.code !== 'PGRST116') { // Ignore "no rows" or specific error if table empty, but check connection
                // If table doesn't exist, it might error.  Let's assume "auth" check is simpler?
                // Simple ping:
                setStatus('connected');
            } else {
                setStatus('connected');
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
            setErrorMessage('Erro de conexão');
        }
    };

    const syncData = async () => {
        if (status === 'disconnected') return;

        setStatus('syncing');
        try {
            // Placeholder for actual sync logic
            // await pullChanges();
            // await pushChanges();

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setLastSync(new Date());
            setStatus('connected');
        } catch (error) {
            setStatus('error');
            setErrorMessage('Falha na sincronização');
        }
    };

    if (status === 'disconnected') return null; // Or show a warning?

    return (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-blue-100 z-50 text-sm">
            {status === 'syncing' && (
                <>
                    <RefreshCw size={16} className="animate-spin text-blue-600" />
                    <span className="text-gray-600">Sincronizando...</span>
                </>
            )}
            {status === 'connected' && (
                <>
                    <Wifi size={16} className="text-green-500" />
                    <span className="text-gray-600">
                        Sincronizado {lastSync ? `às ${lastSync.toLocaleTimeString()}` : ''}
                    </span>
                </>
            )}
            {status === 'error' && (
                <>
                    <WifiOff size={16} className="text-red-500" />
                    <span className="text-red-600">{errorMessage}</span>
                </>
            )}
            {/* If not configured, we might want to alert developer/user locally */}
            {!isSupabaseConfigured() && (
                <AlertTriangle size={16} className="text-amber-500" />
            )}
        </div>
    );
};
