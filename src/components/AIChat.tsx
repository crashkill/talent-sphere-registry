import React, { useState, useRef } from 'react';
import { askDeepSeek } from '../lib/togetherai';

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
    const cached = messages.find(m => m.question === input.trim());
    if (cached) {
      setMessages([...messages, cached]);
      setInput('');
      return;
    }
    setLoading(true);
    try {
      const answer = await askDeepSeek(input.trim(), professionals);
      const newMsg = { question: input.trim(), answer };
      const newMessages = [...messages, newMsg];
      setMessages(newMessages);
      saveCache(newMessages);
      setInput('');
      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (e) {
      // Em caso de erro, mostra uma mensagem de erro como resposta da IA
      const errorMsg = { 
        question: input.trim(), 
        answer: '❌ **Erro inesperado**\n\nOcorreu um erro inesperado. Tente novamente em alguns instantes.' 
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
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: '#6366f1',
          color: 'white',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          border: 'none',
          fontSize: 28,
          cursor: 'pointer',
        }}
        aria-label="Abrir chat IA"
      >
        💬
      </button>
      {/* Chat lateral */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: 360,
            height: '100vh',
            background: 'white',
            boxShadow: '-2px 0 16px rgba(0,0,0,0.10)',
            zIndex: 1100,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: 16, borderBottom: '1px solid #eee', fontWeight: 600, fontSize: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            IA Profissionais
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>×</button>
          </div>
          <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {messages.length === 0 && <div style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>Faça uma pergunta sobre os profissionais…</div>}
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 500, color: '#6366f1', marginBottom: 4 }}>Você:</div>
                <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 8, marginBottom: 8 }}>{msg.question}</div>
                <div style={{ fontWeight: 500, color: '#10b981', marginBottom: 4 }}>IA:</div>
                <div style={{ background: '#e0f2fe', borderRadius: 8, padding: 8 }}>{msg.answer}</div>
              </div>
            ))}
            {loading && <div style={{ color: '#888', textAlign: 'center' }}>Aguarde, consultando IA…</div>}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid #eee', display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte sobre os profissionais…"
              style={{ flex: 1, border: '1px solid #ddd', borderRadius: 8, padding: 8, fontSize: 16 }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, padding: '0 16px', fontSize: 16, cursor: 'pointer', height: 40 }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}; 