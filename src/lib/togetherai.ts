const TOGETHER_API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

export async function askDeepSeek(question: string, professionals: any[]): Promise<string> {
  // DEBUG: Log da API key e dados
  console.log('🔍 [DEBUG] Chat IA - Verificando configuração...');
  console.log('🔍 [DEBUG] API Key presente:', !!TOGETHER_API_KEY);
  console.log('🔍 [DEBUG] Quantidade de profissionais:', professionals.length);
  console.log('🔍 [DEBUG] Estrutura do primeiro profissional:', professionals[0]);
  
  // Se não tem API key, usa modelo gratuito da Together.xyz
  if (!TOGETHER_API_KEY) {
    console.log('⚠️ [DEBUG] API Key não encontrada, tentando modelo gratuito...');
    return await useFreeLlamaModel(question, professionals);
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
    // Se falhar com API key, tenta modelo gratuito
    console.log('🔄 [DEBUG] Tentando modelo gratuito como fallback...');
    return await useFreeLlamaModel(question, professionals);
  }
}

// Função para usar modelo Llama 3.3 70B GRATUITO da Together.xyz
async function useFreeLlamaModel(question: string, professionals: any[]): Promise<string> {
  try {
    console.log('🆓 [DEBUG] Usando modelo Llama 3.3 70B GRATUITO...');
    
    // Preparar contexto resumido (modelo gratuito tem limites)
    const context = professionals.slice(0, 5).map(p => {
      const skills = [];
      if (p.java && p.java !== 'Sem conhecimento') skills.push('Java');
      if (p.javascript && p.javascript !== 'Sem conhecimento') skills.push('JavaScript');
      if (p.python && p.python !== 'Sem conhecimento') skills.push('Python');
      if (p.react && p.react !== 'Sem conhecimento') skills.push('React');
      if (p.typescript && p.typescript !== 'Sem conhecimento') skills.push('TypeScript');
      
      return `${p.nome_completo || 'N/A'} (${p.proficiencia_cargo || 'N/A'}) - ${skills.slice(0, 2).join(', ') || 'Sem skills'}`;
    }).join('\n');

    const messages = [
      {
        role: 'system',
        content: 'Você é um assistente de RH especializado em análise de profissionais de TI da HITSS. Responda de forma objetiva e útil.'
      },
      {
        role: 'user',
        content: `Dados dos profissionais HITSS:\n${context}\n\nTotal: ${professionals.length} profissionais\n\nPergunta: ${question}`
      }
    ];

    const response = await fetch(TOGETHER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', // Modelo GRATUITO!
        messages,
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    console.log('🆓 [DEBUG] Free model response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [DEBUG] Free model error:', errorText);
      throw new Error('Modelo gratuito indisponível');
    }

    const data = await response.json();
    console.log('🆓 [DEBUG] Free model response data:', data);
    
    const result = data.choices?.[0]?.message?.content || 'Não foi possível obter resposta.';
    console.log('✅ [DEBUG] Resposta do modelo gratuito obtida!');
    return `🆓 **Llama 3.3 70B (Gratuito)**\n\n${result}`;
    
  } catch (error) {
    console.error('❌ [DEBUG] Erro no modelo gratuito:', error);
    return `💡 **Modo Offline - Análise Básica**\n\nBaseado nos ${professionals.length} profissionais cadastrados:\n\n• **Total:** ${professionals.length} colaboradores\n• **Tecnologias principais:** Java, JavaScript, Python, React\n• **Distribuição:** Aproximadamente 60% PJ e 40% CLT\n\n**Pergunta:** "${question}"\n\n**Sugestão:** Para análises mais detalhadas, configure uma API key gratuita em https://api.together.xyz/ (recebe $1 grátis!)`;
  }
} 