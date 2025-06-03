import React, { useState, useRef } from 'react';
import { askSmartAI } from '../lib/smartai';

interface Message {
  question: string;
  answer: string;
}

interface AIChatProps {
  professionals: any[];
}

const CACHE_KEY = 'ai_chat_cache';

function loadCache(): Message[] {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCache(messages: Message[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(messages));
}

export const AIChat: React.FC<AIChatProps> = ({ professionals }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(loadCache());
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Verificar cache primeiro
    const cached = messages.find(m => m.question === input.trim());
    if (cached) {
      setMessages([...messages, cached]);
      setInput('');
      return;
    }
    
    setLoading(true);
    try {
      console.log('🚀 [AI CHAT] Iniciando consulta ao Smart AI...');
      const answer = await askSmartAI(input.trim(), professionals);
      const newMsg = { question: input.trim(), answer };
      const newMessages = [...messages, newMsg];
      setMessages(newMessages);
      saveCache(newMessages);
      setInput('');
      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (e) {
      console.error('❌ [AI CHAT] Erro inesperado:', e);
      // Fallback para análise offline se tudo falhar
      const errorMsg = { 
        question: input.trim(), 
        answer: `💡 **Análise Básica (Offline)**\n\nBaseado nos ${professionals.length} profissionais cadastrados na HITSS:\n\n**Sua pergunta:** "${input.trim()}"\n\n**Dados disponíveis:**\n• Total de colaboradores: ${professionals.length}\n• Tecnologias principais: Java, JavaScript, Python, React\n• Mix de contratos: CLT e PJ\n\n**Para análises IA avançadas:**\n• Configure API gratuita: https://api.together.xyz/\n• Ou use Groq: https://console.groq.com/\n\n*Sistema funcionando em modo básico*` 
      };
      const newMessages = [...messages, errorMsg];
      setMessages(newMessages);
      setInput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante com indicador de IA ativa */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
          color: 'white',
          borderRadius: '50%',
          width: 64,
          height: 64,
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
          border: 'none',
          fontSize: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}
        aria-label="Abrir chat IA inteligente"
        title="Chat IA Inteligente - Múltiplas opções gratuitas!"
      >
        🧠
      </button>

      {/* Chat lateral */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 380,
            height: '100vh',
            background: 'white',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
            zIndex: 1100,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header melhorado */}
          <div style={{ 
            padding: 20, 
            borderBottom: '1px solid #e5e7eb', 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 18 }}>🧠 IA Inteligente</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>Múltiplas opções gratuitas</div>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  border: 'none', 
                  color: 'white',
                  borderRadius: '6px',
                  width: 32,
                  height: 32,
                  fontSize: 18, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >×</button>
            </div>
          </div>

          {/* Status das IAs */}
          <div style={{ 
            padding: 12, 
            background: '#f8fafc', 
            borderBottom: '1px solid #e5e7eb',
            fontSize: 11,
            color: '#64748b'
          }}>
            🆓 Together.xyz Gratuito • ⚡ Groq • 🔑 APIs Pagas • 💡 Análise Offline
          </div>

          {/* Área de mensagens */}
          <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {messages.length === 0 && (
              <div style={{ 
                color: '#6b7280', 
                textAlign: 'center', 
                marginTop: 32,
                padding: 20,
                background: '#f9fafb',
                borderRadius: 12,
                border: '2px dashed #d1d5db'
              }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>🤖</div>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>Chat IA Inteligente</div>
                <div style={{ fontSize: 13 }}>Pergunte sobre os profissionais da HITSS</div>
                <div style={{ fontSize: 11, marginTop: 8, color: '#9ca3af' }}>
                  Sistema testa automaticamente múltiplas IAs gratuitas
                </div>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 500, color: '#6366f1', marginBottom: 6, fontSize: 14 }}>👤 Você:</div>
                <div style={{ 
                  background: '#f3f4f6', 
                  borderRadius: 12, 
                  padding: 12, 
                  marginBottom: 12,
                  fontSize: 14,
                  lineHeight: 1.5
                }}>{msg.question}</div>
                
                <div style={{ fontWeight: 500, color: '#10b981', marginBottom: 6, fontSize: 14 }}>🧠 IA:</div>
                <div style={{ 
                  background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)', 
                  borderRadius: 12, 
                  padding: 12,
                  fontSize: 14,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                  border: '1px solid #bae6fd'
                }}>{msg.answer}</div>
              </div>
            ))}
            
            {loading && (
              <div style={{ 
                color: '#6366f1', 
                textAlign: 'center',
                padding: 20,
                background: '#f8fafc',
                borderRadius: 12,
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: 16, marginBottom: 8 }}>🧠</div>
                <div style={{ fontWeight: 500 }}>IA Analisando...</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Testando múltiplas opções</div>
              </div>
            )}
          </div>

          {/* Input area melhorada */}
          <div style={{ 
            padding: 16, 
            borderTop: '1px solid #e5e7eb', 
            background: '#fafafa'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                placeholder="Ex: Quantos desenvolvedores Java temos?"
                style={{ 
                  flex: 1, 
                  border: '1px solid #d1d5db', 
                  borderRadius: 8, 
                  padding: 12, 
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                disabled={loading}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{ 
                  background: loading || !input.trim() ? '#9ca3af' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '0 16px', 
                  fontSize: 14, 
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  minWidth: 70
                }}
              >
                {loading ? '...' : 'Enviar'}
              </button>
            </div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 6, textAlign: 'center' }}>
              Sistema inteligente com fallbacks gratuitos
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 