import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  error,
  icon,
  className = '',
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">{icon}</div>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-lg
            glass-dark text-white placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
            transition-all duration-300
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  rows = 4,
  error,
  className = '',
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg
          glass-dark text-white placeholder:text-gray-500
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          transition-all duration-300 resize-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

interface SelectProps {
  label?: string;
  name?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  className = '',
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-lg
          glass-dark text-white
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          transition-all duration-300
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded accent-accent"
      />
      <span className="text-gray-300">{label}</span>
    </label>
  );
};

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, className = '' }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`space-y-6 ${className}`}
    >
      {children}
    </motion.form>
  );
};

interface ApplyFormProps {
  onSubmit?: (data: ApplyFormData) => void;
}

export interface ApplyFormData {
  fullName: string;
  email: string;
  year: string;
  domain: string;
  linkedIn: string;
}

export const ApplyForm: React.FC<ApplyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ApplyFormData>({
    fullName: '',
    email: '',
    year: '',
    domain: '',
    linkedIn: '',
  });

  const [errors, setErrors] = useState<Partial<ApplyFormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: Partial<ApplyFormData> = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.domain) newErrors.domain = 'Interested domain is required';

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'applications'), {
        fullName: formData.fullName,
        email: formData.email,
        year: formData.year,
        interestedDomain: formData.domain,
        linkedinId: formData.linkedIn,
        timestamp: serverTimestamp(),
      });

      setSuccessMessage('Application submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        year: '',
        domain: '',
        linkedIn: '',
      });
      setErrors({});
      onSubmit?.(formData);
    } catch (error) {
      console.error('Firestore submission error:', error);
      setSubmitError('Failed to submit application. Please try again later.');
      alert('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="max-w-2xl">
      {successMessage && (
        <p className="text-center text-sm text-green-400">{successMessage}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name *"
          placeholder="Your name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <Input
          label="Email ID *"
          placeholder="you@university.edu"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Select
          label="Year *"
          name="year"
          value={formData.year}
          onChange={handleChange}
          options={[
            { value: 'first', label: 'First Year' },
            { value: 'second', label: 'Second Year' },
            { value: 'third', label: 'Third Year' },
            { value: 'fourth', label: 'Fourth Year' },
            { value: 'other', label: 'Other' },
          ]}
          error={errors.year}
        />
        <Select
          label="Interested Domain *"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          options={[
            { value: 'tech', label: 'Tech' },
            { value: 'pr', label: 'PR & Outreach' },
            { value: 'media', label: 'Media & Design' },
            { value: 'hardware', label: 'Hardware' },
            { value: 'marketing', label: 'Marketing' },
          ]}
          error={errors.domain}
        />
      </div>

      <Input
        label="LinkedIn ID"
        placeholder="linkedin.com/in/yourprofile"
        name="linkedIn"
        value={formData.linkedIn}
        onChange={handleChange}
      />

      {submitError && (
        <p className="text-center text-sm text-red-400">{submitError}</p>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className={`w-full bg-gradient-to-r from-accent to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-glow-cyan-lg transition-all duration-300 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </motion.button>
    </Form>
  );
};
