import { useMutation } from '@tanstack/react-query';
import { signin } from '../../api/requests';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Signin = () => {
    const { refresh } = useAuth();

    const { mutate, data, isPending } = useMutation({
        mutationFn: () => signin({ email, password }),
        mutationKey: ['signin'],
        onSuccess: async () => {
            if (refresh) {
                await refresh();
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();

        mutate();
    };
    const handlePersist = async (e: ChangeEvent<HTMLInputElement>) => {
        setPersist(e.target.checked);
        localStorage.setItem('persist', JSON.stringify(e.target.checked));
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [persist, setPersist] = useState(false);

    const form = (
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="email"> Email</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@email.com"
                required
            />
            <br />

            <label htmlFor="password"> Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <br />

            <label htmlFor="persist">
                <input
                    type="checkbox"
                    name="persist"
                    checked={persist}
                    onChange={handlePersist}
                />
                Remember me
            </label>
            <br />

            <input type="submit" value="Sign in" disabled={isPending} />
        </form>
    );

    return (
        <>
            <h2>Sign in</h2>

            {form}
            {isPending && 'Loading...'}
            {data && JSON.stringify(data)}
        </>
    );
};

export default Signin;
