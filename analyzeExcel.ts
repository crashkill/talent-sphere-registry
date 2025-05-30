import * as XLSX from 'xlsx';
import * as fs from 'fs'; // Usaremos para verificar se o arquivo existe

const filePath = '/Users/fabriciocardosodelima/Desktop/gestao-profissionais/Cadastro Colaboradores - FSW São Paulo(1-85).xlsx';

function analyzeExcelFile(path: string) {
  try {
    // Verifica se o arquivo existe antes de tentar lê-lo
    if (!fs.existsSync(path)) {
      console.error(`ERRO: Arquivo não encontrado em: ${path}`);
      return;
    }

    // Lê o arquivo Excel
    const workbook = XLSX.readFile(path);

    // Pega o nome de todas as planilhas no arquivo
    const sheetNames = workbook.SheetNames;
    console.log('Planilhas encontradas no arquivo:', sheetNames);

    // Itera sobre cada planilha
    sheetNames.forEach(sheetName => {
      console.log(`\n--- Conteúdo da Planilha: ${sheetName} ---`);
      const worksheet = workbook.Sheets[sheetName];
      
      // Converte a planilha para JSON
      // header: 1 para obter um array de arrays, útil para ver a estrutura crua.
      // Para objetos JSON (onde a primeira linha é o cabeçalho), remova { header: 1 }
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 
      
      if (jsonData.length > 0) {
        console.log('Cabeçalhos:', jsonData[0]); // Mostra os cabeçalhos
        console.log('Dados (primeiras 5 linhas, se houver):');
        for (let i = 1; i < Math.min(jsonData.length, 6); i++) {
          console.log(jsonData[i]);
        }
        if (jsonData.length > 6) {
          console.log(`... e mais ${jsonData.length - 6} linhas.`);
        }
      } else {
        console.log('Planilha vazia.');
      }
    });

  } catch (error) {
    console.error('Ocorreu um erro ao analisar o arquivo Excel:', error);
  }
}

// Executa a função de análise
analyzeExcelFile(filePath);
