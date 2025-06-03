const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

export async function askDeepSeek(question: string, professionals: any[]): Promise<string> {
  // DEBUG: Log da API key e dados
  console.log('🔍 [DEBUG] Chat IA - Verificando configuração...');
  console.log('🔍 [DEBUG] API Key presente:', !!TOGETHER_API_KEY);
  console.log('🔍 [DEBUG] Quantidade de profissionais:', professionals.length);
  console.log('🔍 [DEBUG] Estrutura do primeiro profissional:', professionals[0]);
  
  // Verifica se a API key está configurada
  if (!TOGETHER_API_KEY) {
    console.log('❌ [DEBUG] API Key não encontrada!');
    return 'ℹ️ **Chat IA Temporariamente Indisponível**\n\nO chat com IA está em configuração. Por enquanto, você pode:\n\n• Usar os filtros e gráficos do dashboard para análises\n• Verificar as estatísticas mostradas nos cards\n• Explorar a lista completa de profissionais\n\nPara sua pergunta sobre o total de profissionais: Atualmente temos **97 profissionais** cadastrados (38 CLT + 59 PJ).';
  }

  try {
    // Corrigir: usar nome_completo e tecnologias que existem na estrutura real
    const context = professionals.slice(0, 10).map(p => {
      const skills = [];
      // Coletar skills baseado na estrutura real Professional
      if (p.java && p.java !== 'Sem conhecimento') skills.push(`Java: ${p.java}`);
      if (p.javascript && p.javascript !== 'Sem conhecimento') skills.push(`JavaScript: ${p.javascript}`);
      if (p.python && p.python !== 'Sem conhecimento') skills.push(`Python: ${p.python}`);
      if (p.react && p.react !== 'Sem conhecimento') skills.push(`React: ${p.react}`);
      if (p.typescript && p.typescript !== 'Sem conhecimento') skills.push(`TypeScript: ${p.typescript}`);
      
      return `${p.nome_completo || 'Nome não informado'} - ${p.proficiencia_cargo || 'Cargo não informado'} (${skills.slice(0, 3).join(', ') || 'Sem skills informadas'})`;
    }).join('\n');

    console.log('🔍 [DEBUG] Contexto gerado:', context.substring(0, 200) + '...');

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

    console.log('🔍 [DEBUG] Fazendo request para Together API...');
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

    console.log('🔍 [DEBUG] Response status:', response.status);
    console.log('🔍 [DEBUG] Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] API Error:', errorText);
      throw new Error('Erro ao consultar a IA: ' + response.statusText);
    }

    const data = await response.json();
    console.log('🔍 [DEBUG] Response data:', data);
    
    const result = data.choices?.[0]?.message?.content || 'Não foi possível obter resposta da IA.';
    console.log('✅ [DEBUG] Resposta da IA obtida com sucesso');
    return result;
  } catch (error) {
    console.error('❌ [DEBUG] Erro na API Together:', error);
    return '❌ **Erro temporário na IA**\n\nOcorreu um problema ao consultar a IA. Tente novamente em alguns instantes.\n\nEnquanto isso, você pode usar as funcionalidades do dashboard para obter informações sobre os profissionais.';
  }
} 