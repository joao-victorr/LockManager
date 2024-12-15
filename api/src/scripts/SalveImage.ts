import crypto from 'crypto';
import fs from 'fs';
import path from 'node:path';
import sharp from 'sharp';

// Função para salvar a imagem com verificação do diretório
const saveImageUser = async (image: Buffer, userId: number): Promise<string> => {
  const timestamp = Date.now().toString();

  // Combina o timestamp e o ID do usuário
  const dataToHash = timestamp + userId;

  // Cria um hash SHA-256
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

  // Define o nome do arquivo
  const fileName = `${hash}.png`;
  
  // Define o caminho do diretório onde a imagem será salva e o nome do arquivo
  const dirPath = path.resolve(__dirname, "../../images"); // Caminho do diretório onde a imagem será salva
  const filePath = path.join(dirPath, fileName); // Caminho completo do arquivo

  try {
    // Verifica se o diretório existe
    if (!fs.existsSync(dirPath)) {
      // Se não existir, cria o diretório
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Usando o sharp para salvar a imagem recebida
    await sharp(image)
      .toFile(filePath); // Converte e salva a imagem no caminho especificado

    return fileName; // Retorna o nome do arquivo salvo
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save image");
  }
};

export default saveImageUser;
