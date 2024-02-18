import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

export const useAuth = () => {
    const auth = useContext(AuthContext);

    return auth;
};
