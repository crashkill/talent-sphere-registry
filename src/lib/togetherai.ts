const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

export async function askDeepSeek(question: string, professionals: any[]): Promise<string> {
  if (!TOGETHER_API_KEY) throw new Error('Chave da API do Together AI não configurada');

  // Resumo dos profissionais para contexto (ajustar conforme necessário)
  const context = professionals.map(p => `${p.nome} (${p.skills?.join(', ')})`).join('\n');

  const messages = [
    {
      role: 'system',
      content: 'Você é um assistente especializado em análise de profissionais de TI. Responda apenas com base nos dados fornecidos.'
    },
    {
      role: 'user',
      content: `Contexto dos profissionais:\n${context}\n\nPergunta: ${question}`
    }
  ];

  const response = await fetch(TOGETHER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao consultar a IA: ' + response.statusText);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Não foi possível obter resposta da IA.';
} 