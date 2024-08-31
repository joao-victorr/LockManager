import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verifica se o usuário admin já existe
  const existingAdmin = await prisma.usersWeb.findUnique({
    where: { email: 'admin@gmail.com' },
  });

  if (!existingAdmin) {
    // Cria um usuário admin padrão
    const hashedPassword = await bcrypt.hash('admin', 10); // Criptografa a senha

    await prisma.usersWeb.create({
      data: {
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
      },
    });

    console.log('Usuário admin criado com sucesso');
  } else {
    console.log('Usuário admin já existe');
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
