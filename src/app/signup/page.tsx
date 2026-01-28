'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/core/Button";
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', name: '', passwordCheck: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.passwordCheck) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    setLoading(false);

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

        <div className="flex gap-3 flex-col-reverse sm:flex-row">

          <Button href="/" variant='secondary' size="normal" className="w-full sm:w-1/2">
            Back to Home
          </Button>
          <Button type="submit" variant="primary" size="normal" loading={loading} className="w-full sm:w-1/2">
            Sign Up
          </Button>
        </div>
        <p className='text-center'>
          Already have an account?
          <Link href="/login" className='underline hover:text-primary-muted ml-1.5'>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
