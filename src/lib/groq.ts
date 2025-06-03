const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function askGroq(question: string, professionals: any[]): Promise<string> {
  console.log('⚡ [DEBUG] Groq IA - Iniciando consulta...');
  console.log('⚡ [DEBUG] Groq API Key presente:', !!GROQ_API_KEY);
  
  if (!GROQ_API_KEY) {
    console.log('❌ [DEBUG] Groq API Key não encontrada');
    return 'ℹ️ **Groq IA Indisponível**\n\nPara usar o Groq (IA super rápida e gratuita):\n\n1. Crie conta grátis em: https://console.groq.com/\n2. Gere sua API Key\n3. Adicione `VITE_GROQ_API_KEY` nos GitHub Secrets\n\n**Vantagens do Groq:** Velocidade insanamente rápida! 🚀';
  }

  try {
    // Contexto otimizado para velocidade do Groq
    const context = professionals.slice(0, 8).map(p => {
      const skills = [];
      if (p.java && p.java !== 'Sem conhecimento') skills.push('Java');
      if (p.javascript && p.javascript !== 'Sem conhecimento') skills.push('JS');
      if (p.python && p.python !== 'Sem conhecimento') skills.push('Python');
      if (p.react && p.react !== 'Sem conhecimento') skills.push('React');
      if (p.typescript && p.typescript !== 'Sem conhecimento') skills.push('TS');
      
      return `${p.nome_completo || 'N/A'} | ${p.proficiencia_cargo || 'N/A'} | ${skills.join(',')}`;
    }).join('\n');

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile', // Modelo rápido do Groq
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente de RH da HITSS especializado em análise de talentos tech. Seja direto e útil.'
          },
          {
            role: 'user',
            content: `DADOS HITSS (${professionals.length} profissionais):\n${context}\n\nPERGUNTA: ${question}`
          }
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    console.log('⚡ [DEBUG] Groq response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] Groq error:', errorText);
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || 'Sem resposta do Groq.';
    
    console.log('✅ [DEBUG] Groq resposta obtida com sucesso!');
    return `⚡ **Groq Llama 3.1 70B (Ultra Rápido)**\n\n${result}`;

  } catch (error) {
    console.error('❌ [DEBUG] Erro no Groq:', error);
    return `❌ **Groq Temporariamente Indisponível**\n\nErro: ${error}\n\n**Alternativa:** Use o modelo Together.xyz gratuito que está funcionando no chat.`;
  }
}

export async function testGroq(): Promise<boolean> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: 'Test' }],
        max_tokens: 10,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
} 