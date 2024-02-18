import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthRoutes = () => {
    const { auth } = useAuth();
    const allowed = auth && auth.isAuth;

    return allowed ? <Outlet /> : <Navigate to={'/'} replace />;
};

export default AuthRoutes;
