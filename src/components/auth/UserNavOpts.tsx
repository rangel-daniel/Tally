import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signOut } from '../../api/requests';

export const UserNavOpts = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    const { mutate } = useMutation({
        mutationFn: signOut,
        onSettled: (data, error) => {
            localStorage.removeItem('persist');
            if (error) {
                console.error(error);
            } else if (data) {
                window.location.replace('/');
            }
        },
    });

    const evalToggle = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('#user-menu')) setIsVisible(false);
    };

    const settingsClick = () => {
        setIsVisible(false);
        navigate('/settings');
    };

    const signoutClick = () => {
        setIsVisible(false);
        mutate();
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('click', evalToggle);
        } else {
            document.removeEventListener('click', evalToggle);
        }

        return () => {
            document.removeEventListener('click', evalToggle);
        };
    }, [isVisible]);

    return (
        <div id="user-menu">
            <div id="menu-btn" onClick={() => setIsVisible((prev) => !prev)}>
                {user?.name}
            </div>
            {isVisible && (
                <div id="menu-sel">
                    <div className="menu-opt" onClick={settingsClick}>
                        Settings
                    </div>
                    <hr />
                    <div className="menu-opt" onClick={signoutClick}>
                        Sign out
                    </div>
                </div>
            )}
        </div>
    );
};
