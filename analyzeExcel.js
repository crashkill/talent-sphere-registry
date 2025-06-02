const XLSX = require('xlsx');
const fs = require('fs');

const filePath = 'C:\Users\fabricio.lima\OneDrive - HITSS DO BRASIL SERVIÇOS TECNOLOGICOS LTDA\Área de Trabalho - Antiga\Profissionais-HITSS\talent-sphere-registry\Cadastro Colaboradores - FSW São Paulo(1-97) - Detalhada.xlsx';

function analyzeExcelFile(path) {
  try {
    if (!fs.existsSync(path)) {
      console.error(`ERRO: Arquivo não encontrado em: ${path}`);
      return;
    }

    const workbook = XLSX.readFile(path);
    const sheetNames = workbook.SheetNames;
    console.log('Planilhas encontradas no arquivo:', sheetNames);

    sheetNames.forEach(sheetName => {
      console.log(`\n--- Conteúdo da Planilha: ${sheetName} ---`);
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length > 0) {
        console.log('Cabeçalhos:', jsonData[0]);
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

analyzeExcelFile(filePath);
