import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface UseEmailFormReturn {
  sendEmail: (data: EmailFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useEmailForm = (
  serviceId: string,
  templateId: string,
  publicKey: string
): UseEmailFormReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (data: EmailFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        project_type: data.projectType,
        message: data.message,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue l\'envoi');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendEmail,
    isLoading,
    error,
  };
}; 