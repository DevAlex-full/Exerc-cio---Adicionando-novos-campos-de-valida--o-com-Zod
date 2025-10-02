// src/index.ts
import { z } from 'zod';

// Schema de validação completo
const userSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  
  password: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
  
  // NOVO CAMPO: Telefone
  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .max(11, 'Telefone deve ter no máximo 11 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

// Tipo TypeScript inferido do schema
type UserFormData = z.infer<typeof userSchema>;

// ========================================
// TESTES DO SCHEMA
// ========================================

console.log('=== TESTANDO VALIDAÇÕES ===\n');

// Teste 1: Dados válidos
console.log('📋 Teste 1 - Dados válidos:');
try {
  const validData = userSchema.parse({
    email: 'usuario@email.com',
    password: 'senha123',
    confirmPassword: 'senha123',
    telefone: '11987654321' // 11 dígitos válidos
  });
  console.log('✅ Validação passou!');
  console.log('Dados:', validData);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('❌ Erros:', error.issues);
  }
}

console.log('\n---\n');

// Teste 2: Telefone muito curto (9 dígitos)
console.log('📋 Teste 2 - Telefone com 9 dígitos (inválido):');
try {
  userSchema.parse({
    email: 'usuario@email.com',
    password: 'senha123',
    confirmPassword: 'senha123',
    telefone: '119876543' // 9 dígitos - INVÁLIDO
  });
  console.log('✅ Validação passou!');
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('❌ Erros encontrados:');
    error.issues.forEach((err: z.ZodIssue) => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
}

console.log('\n---\n');

// Teste 3: Telefone com letras
console.log('📋 Teste 3 - Telefone com letras (inválido):');
try {
  userSchema.parse({
    email: 'usuario@email.com',
    password: 'senha123',
    confirmPassword: 'senha123',
    telefone: '1198765abc1' // Contém letras - INVÁLIDO
  });
  console.log('✅ Validação passou!');
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('❌ Erros encontrados:');
    error.issues.forEach((err: z.ZodIssue) => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
}

console.log('\n---\n');

// Teste 4: Telefone muito longo (12 dígitos)
console.log('📋 Teste 4 - Telefone com 12 dígitos (inválido):');
try {
  userSchema.parse({
    email: 'usuario@email.com',
    password: 'senha123',
    confirmPassword: 'senha123',
    telefone: '119876543210' // 12 dígitos - INVÁLIDO
  });
  console.log('✅ Validação passou!');
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('❌ Erros encontrados:');
    error.issues.forEach((err: z.ZodIssue) => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
}

console.log('\n---\n');

// Teste 5: Telefone com 10 dígitos (válido)
console.log('📋 Teste 5 - Telefone com 10 dígitos (válido):');
try {
  const validData = userSchema.parse({
    email: 'usuario@email.com',
    password: 'senha123',
    confirmPassword: 'senha123',
    telefone: '1187654321' // 10 dígitos - VÁLIDO
  });
  console.log('✅ Validação passou!');
  console.log('Telefone:', validData.telefone);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('❌ Erros:', error.issues);
  }
}

console.log('\n---\n');

// Teste 6: Múltiplos erros
console.log('📋 Teste 6 - Múltiplos erros:');
try {
  userSchema.parse({
    email: 'email-invalido',
    password: '123', // Muito curta
    confirmPassword: '456', // Não coincide
    telefone: 'abc' // Inválido
  });
  console.log('✅ Validação passou!');
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('❌ Erros encontrados:');
    error.issues.forEach((err: z.ZodIssue) => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  }
}

// Exportar o schema para uso em outros módulos
export { userSchema, type UserFormData };