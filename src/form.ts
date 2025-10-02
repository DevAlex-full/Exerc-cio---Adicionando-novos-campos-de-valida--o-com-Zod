// src/form.ts
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
  
  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .max(11, 'Telefone deve ter no máximo 11 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números')
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type UserFormData = z.infer<typeof userSchema>;

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm') as HTMLFormElement;
  const successMessage = document.getElementById('successMessage') as HTMLDivElement;

  // Função para limpar erros
  function clearErrors(): void {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="email"], input[type="password"], input[type="tel"]');
    
    errorMessages.forEach(msg => {
      msg.classList.remove('show');
      msg.textContent = '';
    });
    
    inputs.forEach(input => {
      input.classList.remove('error');
    });
    
    successMessage.classList.remove('show');
  }

  // Função para mostrar erros
  function showError(fieldName: string, message: string): void {
    const input = document.getElementById(fieldName) as HTMLInputElement;
    const errorElement = document.getElementById(fieldName + 'Error') as HTMLDivElement;
    
    if (input && errorElement) {
      input.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  // Evento de submit
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    clearErrors();

    const formData: UserFormData = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      telefone: (document.getElementById('telefone') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      confirmPassword: (document.getElementById('confirmPassword') as HTMLInputElement).value
    };

    try {
      // Validar com Zod
      const validData = userSchema.parse(formData);
      
      // Sucesso!
      successMessage.classList.add('show');
      form.reset();
      
      console.log('✅ Dados validados com sucesso:', validData);
      
      // Esconder mensagem após 3 segundos
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 3000);
      
    } catch (error: unknown) {
      // Mostrar erros
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue: z.ZodIssue) => {
          const fieldName = issue.path[0] as string;
          showError(fieldName, issue.message);
        });
        
        console.log('❌ Erros de validação:', error.issues);
      }
    }
  });

  // Remover erro ao digitar
  const inputs = document.querySelectorAll<HTMLInputElement>('input[type="email"], input[type="password"], input[type="tel"]');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorElement = document.getElementById(input.id + 'Error');
      if (errorElement) {
        errorElement.classList.remove('show');
      }
    });
  });
});