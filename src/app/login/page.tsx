'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/core/Button";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);
    if (res?.error) {
      setError('Invalid email or password');
    } else {
      
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border border-primary" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border border-primary" />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-3 flex-col-reverse sm:flex-row">
          <Button href="/" variant="secondary" size="normal" className="w-full sm:w-1/2">
            Back to Home
          </Button>
          <Button type="submit" variant="primary" size="normal" className="w-full sm:w-1/2" loading={loading}>
            Log in
          </Button>
        </div>
        <p className='text-center'>
          Don't have an account?
          <Link href="/signup" className='underline hover:text-primary-muted ml-1.5'>
            Sign up
          </Link>
        </p>

      </form>
    </div>
  );
}
