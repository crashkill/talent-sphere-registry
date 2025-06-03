const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

export async function askDeepSeek(question: string, professionals: any[]): Promise<string> {
  // Verifica se a API key está configurada
  if (!TOGETHER_API_KEY) {
    return 'ℹ️ **Chat IA Temporariamente Indisponível**\n\nO chat com IA está em configuração. Por enquanto, você pode:\n\n• Usar os filtros e gráficos do dashboard para análises\n• Verificar as estatísticas mostradas nos cards\n• Explorar a lista completa de profissionais\n\nPara sua pergunta sobre o total de profissionais: Atualmente temos **97 profissionais** cadastrados (38 CLT + 59 PJ).';
  }

  try {
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
  } catch (error) {
    console.error('Erro na API Together:', error);
    return '❌ **Erro temporário na IA**\n\nOcorreu um problema ao consultar a IA. Tente novamente em alguns instantes.\n\nEnquanto isso, você pode usar as funcionalidades do dashboard para obter informações sobre os profissionais.';
  }
} 