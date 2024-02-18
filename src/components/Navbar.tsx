import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { UserNavOpts } from './auth/UserNavOpts';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [opts, setOpts] = useState<ReactNode | null>(null);

    const _default = useMemo(
        () => (
            <span>
                <span onClick={() => navigate('/signin')}>Sign in</span>

                <span onClick={() => navigate('/signup')}>Sign up</span>
            </span>
        ),
        [navigate],
    );

    useEffect(() => {
        if (auth && auth.isAuth) {
            setOpts(<UserNavOpts />);
        } else {
            setOpts(_default);
        }
    }, [auth, _default]);

    return (
        <nav
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    width: '170px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                }}
            >
                <h1 id="home" onClick={() => navigate('/')}>
                    Tally
                </h1>
                <NavLink to="/create">Create poll</NavLink>
            </div>

            {opts}
        </nav>
    );
};

export default Navbar;
