import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to read .env manually since we are in a raw node script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');

function loadEnv() {
    try {
        const data = fs.readFileSync(envPath, 'utf8');
        const env = {};
        data.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.trim();
            }
        });
        return env;
    } catch (e) {
        console.error("Erro ao ler arquivo .env:", e.message);
        return {};
    }
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

console.log("Testando conexão com Supabase...");
console.log(`URL: ${supabaseUrl}`);
// Mask key for security in logs
console.log(`Key: ${supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'NÃO ENCONTRADA'}`);

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ ERRO: Credenciais não encontradas no arquivo .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        // Try to fetch something simple. Even if table doesn't exist, looking for 'error' structure tells us we touched the server.
        const { data, error } = await supabase.from('projects').select('count', { count: 'exact', head: true });

        if (error) {
            console.log("\n⚠️  Conectou ao Supabase, mas retornou erro (o que é esperado se a tabela não existir):");
            console.log(`Código: ${error.code}`);
            console.log(`Mensagem: ${error.message}`);

            if (error.code === 'PGRST200' || error.code === '42P01') {
                console.log("\n✅ SUCESSO! A conexão foi estabelecida (o erro confirma que falamos com o servidor).");
            } else {
                // Check for bad URL/Key errors
                if (error.message.includes('FetchError') || error.message.includes('network')) {
                    console.error("\n❌ ERRO DE REDE: Não foi possível alcançar o servidor. Verifique a URL.");
                } else if (error.code === 'PGRST301' || error.message.includes('JWT')) {
                    console.error("\n❌ ERRO DE AUTENTICAÇÃO: Verifique sua chave API (Anon Key).");
                } else {
                    console.log("\n✅ SUCESSO! Conexão estabelecida.");
                }
            }
        } else {
            console.log("\n✅ SUCESSO TOTAL! Conexão estabelecida e tabela encontrada.");
        }

    } catch (e) {
        console.error("\n❌ ERRO CRÍTICO:", e);
    }
}

testConnection();
