// src/Components/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import useAuthStore from '../App/loginAuth';
import ThemeToggle from './ThemeToggle';
import countryList from '../data/countries.json';

const phoneSchema = z.object({
  country: z.string().min(1, 'Select country'),
  phone: z.string().regex(/^\d{6,14}$/, 'Enter a valid number (6–14 digits)'),
});

export default function Login() {
  const setPhone = useAuthStore(s => s.setPhone);
  const setOTP = useAuthStore(s => s.setOTP);
  const login = useAuthStore(s => s.login);
  const navigate = useNavigate();

  const [step, setStep] = useState('phone');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [localOTP, setLocalOTP] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(countryList);
  }, []);

  const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(phoneSchema) });

  const sendOTP = ({ country, phone }) => {
    setPhone(`${country}${phone}`);
    const code = generateOTP();
    setGeneratedOTP(code);
    toast.success(`OTP sent: ${code}`);
    setStep('otp');
  };

  const verifyOTP = () => {
    if (localOTP !== generatedOTP) {
      toast.error(`Wrong OTP, it was ${generatedOTP}`);
      return;
    }
    setOTP(localOTP);
    login();
    toast.success('Welcome!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100 dark:bg-[#1E201E]">
      <Toaster position="top-center" />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className="mb-8 text-3xl font-normal text-center text-gray-700 dark:text-gray-200">
        Welcome
      </h1>

      <div className="w-full max-w-sm p-8 border rounded-lg shadow-sm text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1c2123ff]">
        {step === 'phone' ? (
          <form onSubmit={handleSubmit(sendOTP)} className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-normal text-center text-gray-800 dark:text-gray-100">
                Sign in
              </h2>
              <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-400">
                Enter your phone number to continue
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country
                </label>
                <select
                  {...register('country')}
                  className="w-full px-3 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                >
                  <option value="">Choose your country</option>
                  {countries.map(c => (
                    <option key={c.code + c.name} value={c.code}>
                      {c.code} – {c.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="9876543210"
                  className="w-full px-3 py-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-normal text-center text-gray-800 dark:text-gray-100">
                Verify your phone
              </h2>
              <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-400">
                Enter the 4-digit code we sent
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Verification Code
              </label>
              <input
                type="text"
                value={localOTP}
                onChange={e => setLocalOTP(e.target.value)}
                placeholder="1234"
                maxLength={4}
                className="w-full px-3 py-3 text-sm border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>

            <button
              onClick={verifyOTP}
              className="w-full py-3 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Verify & Continue
            </button>

            <button
              onClick={() => setStep('phone')}
              className="w-full py-2 text-sm text-center text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              ← Back to phone number
            </button>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-center text-gray-500 dark:text-gray-400">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}