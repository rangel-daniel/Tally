import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Dashboard from './auth/Dashboard';
import Landing from './guest/Landing';
import Pending from './auth/Pending';

const Root = () => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const { auth } = useAuth();
    useEffect(() => {
        if (auth && auth.isAuth) {
            if (auth.isVerified) {
                setContent(<Dashboard />);
            } else {
                setContent(<Pending />);
            }
        } else {
            setContent(<Landing />);
        }
    }, [auth]);

    return content;
};

export default Root;
