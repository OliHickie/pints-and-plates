'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from "bcrypt";
import { Button } from "@/components/core/Button";


export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '', passwordCheck: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.passwordCheck) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border border-primary" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border border-primary" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border border-primary" />
        <input type="password" name="passwordCheck" placeholder="Retype Password" onChange={handleChange} required className="w-full p-2 border border-primary" />
        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" variant="primary" size="normal" className="w-full">
          Sign Up
        </Button>
        <div className="flex space-x-2">
          <Button href="/login" variant="secondary" size="normal" className="w-1/2">
          Login
        </Button>
        <Button href="/" variant="ghost" size="normal" className="w-1/2">
          Back to Home
        </Button>
        </div>
        

      </form>
    </div>
  );
}
