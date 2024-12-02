import { UserStrategy, TaxStep, TimelinePhase } from '../types/strategy';
import { ClientInformation, FinancialInfo, PersonalInfo } from '../types/client';

// Input validation helpers
export const validateInput = {
  text: (value: any): string => {
    if (value === undefined || value === null) return '';
    return String(value).trim();
  },

  number: (value: any, defaultValue = 0): number => {
    if (value === undefined || value === null || isNaN(Number(value))) {
      return defaultValue;
    }
    return Number(value);
  },

  boolean: (value: any): boolean => {
    return Boolean(value);
  },

  date: (value: any): Date | null => {
    if (!value) return null;
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  },

  array: <T>(value: T[] | undefined | null, defaultValue: T[] = []): T[] => {
    return Array.isArray(value) ? value : defaultValue;
  },

  object: <T extends object>(value: T | undefined | null, defaultValue: T): T => {
    return value || defaultValue;
  },

  email: (value: any): string => {
    const email = String(value || '').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? email : '';
  },

  phone: (value: any): string => {
    const phone = String(value || '').replace(/\D/g, '');
    return phone || '';
  }
};

// Form data sanitization
export const sanitizeFormData = <T extends object>(data: T, defaultValues: T): T => {
  const sanitized = { ...defaultValues };

  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      sanitized[key] = validateInput.array(value);
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeFormData(value, defaultValues[key]);
    } else {
      switch (typeof defaultValues[key]) {
        case 'string':
          sanitized[key] = validateInput.text(value);
          break;
        case 'number':
          sanitized[key] = validateInput.number(value);
          break;
        case 'boolean':
          sanitized[key] = validateInput.boolean(value);
          break;
        default:
          sanitized[key] = value;
      }
    }
  });

  return sanitized;
};

// Form error handling
export const validateForm = (data: any, rules: Record<string, (value: any) => string | null>): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach(field => {
    const validationFn = rules[field];
    const error = validationFn(data[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Default validation rules
export const defaultValidationRules = {
  required: (value: any) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }
    return null;
  },

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value: string) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit phone number';
    }
    return null;
  },

  minLength: (length: number) => (value: string) => {
    if (String(value).length < length) {
      return `Must be at least ${length} characters`;
    }
    return null;
  },

  maxLength: (length: number) => (value: string) => {
    if (String(value).length > length) {
      return `Must be no more than ${length} characters`;
    }
    return null;
  },

  min: (min: number) => (value: number) => {
    if (Number(value) < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },

  max: (max: number) => (value: number) => {
    if (Number(value) > max) {
      return `Must be no more than ${max}`;
    }
    return null;
  }
};

// Input masking
export const masks = {
  phone: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  },

  currency: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(numbers) / 100);
  },

  percentage: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    const percent = Math.min(100, Number(numbers));
    return `${percent}%`;
  }
};

// Form state management
export const createFormState = <T extends object>(
  initialData: T,
  validationRules: Record<string, (value: any) => string | null>
) => {
  return {
    data: sanitizeFormData(initialData, initialData),
    errors: {} as Record<string, string>,
    touched: {} as Record<string, boolean>,
    
    validate() {
      this.errors = validateForm(this.data, validationRules);
      return Object.keys(this.errors).length === 0;
    },

    setFieldValue(field: keyof T, value: any) {
      this.data[field] = value;
      this.touched[field] = true;
      const validationFn = validationRules[field as string];
      if (validationFn) {
        const error = validationFn(value);
        if (error) {
          this.errors[field as string] = error;
        } else {
          delete this.errors[field as string];
        }
      }
    },

    reset() {
      this.data = sanitizeFormData(initialData, initialData);
      this.errors = {};
      this.touched = {};
    }
  };
};