import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { signup } from '../../api/requests';
import { useAuth } from '../../hooks/useAuth';
import isEmail from 'validator/lib/isEmail';
import validPassword from 'validator/lib/isStrongPassword';
const Signup = () => {
    const { refresh } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutate, isPending, error } = useMutation({
        mutationFn: () => signup({ name, email, password }),
        mutationKey: ['signin'],
        onSettled: async () => {
            if (error) {
                console.error(error);
            } else if (refresh) {
                await refresh();
            }
        },
    });

    const isValid = (): boolean => {
        return isEmail(email) && validPassword(password);
    };

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (isValid()) mutate();
    };

    const form = (
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setName(name.trim())}
                minLength={3}
                maxLength={50}
                required
            />
            <br />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmail(email.trim())}
                required
            />
            <br />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />

            <input type="submit" placeholder="Sign up" />
            <br />
        </form>
    );
    return (
        <>
            <h2>Sign up</h2>
            {form}
            {isPending && 'Loading...'}
            {error && error.message}
        </>
    );
};

export default Signup;
