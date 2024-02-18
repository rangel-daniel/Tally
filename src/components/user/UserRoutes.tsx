import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { guestSignin } from '../../api/requests';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoutes = () => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const { auth, refresh } = useAuth();

    const { mutate } = useMutation({
        mutationFn: () => guestSignin(),
        mutationKey: ['signin'],
        onSuccess: async () => {
            if (refresh) {
                localStorage.setItem('persist', 'true');
                await refresh();
            }
            setContent(<Outlet />);
        },
        onError: (error) => {
            console.error(error);
            setContent(<Navigate to={'/'} replace />);
        },
    });

    useEffect(() => {
        if (!auth) mutate();
        else setContent(<Outlet />);
    }, [auth, mutate]);

    return content;
};

export default UserRoutes;
