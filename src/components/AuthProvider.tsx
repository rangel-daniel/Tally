import { PropsWithChildren, ReactNode, createContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/authRequests';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from '../api/requests';

export type JwtData = {
    uid: string;
    isAuth: boolean;
    isVerified?: boolean;
};

type Auth = {
    user?: User | null;
    accessToken?: string | null;
    refresh?: () => Promise<void>;
    auth?: JwtData | null;
};

export const AuthContext = createContext<Auth>({});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [content, setContent] = useState<ReactNode | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [decoded, setDecoded] = useState<JwtData | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [persist] = useState(localStorage.getItem('persist') === 'true');

    const initRefresh = async () => {
        const { error, data } = await refresh();
        if (error) {
            setAccessToken(null);
            console.error(error);
        } else {
            const { accessToken: token } = data;
            setAccessToken(token);
        }
    };

    const [auth, setAuth] = useState<Auth>({
        refresh: initRefresh,
        auth: decoded,
        user,
        accessToken,
    });

    const {
        data: tokenRes,
        error: tokenErr,
        refetch: refresh,
    } = useQuery({
        queryFn: () => refreshAccessToken(),
        queryKey: ['Refresh'],
        retry: false,
        enabled: persist || !!accessToken,
        refetchInterval: 29 * 60 * 1000,
    });

    const { data: userRes, error: userErr } = useQuery({
        queryFn: () => getUser(accessToken || ''),
        queryKey: ['User'],
        retry: false,
        enabled: !!decoded?.isAuth,
        refetchInterval: 29 * 60 * 1000,
    });

    useEffect(() => {
        if (content === null) {
            if (!persist) {
                setContent(children);
            } else if (tokenErr || decoded) {
                setContent(children);
            }
        }
    }, [content, persist, children, tokenErr, decoded]);

    useEffect(() => {
        if (tokenErr) {
            setAccessToken(null);
            console.error(tokenErr);
        } else if (tokenRes) {
            setAccessToken(tokenRes.accessToken);
        }
    }, [tokenErr, tokenRes]);

    useEffect(() => {
        setAuth((prevAuth) => ({
            ...prevAuth,
            auth: decoded,
            user,
            accessToken,
        }));
    }, [decoded, user, accessToken]);

    useEffect(() => {
        if (accessToken) {
            const data = jwtDecode<JwtData>(accessToken);
            setDecoded(data);
        } else {
            setDecoded(null);
        }
    }, [accessToken]);

    useEffect(() => {
        if (userErr) {
            console.error(userErr);
        } else if (userRes) {
            const { user } = userRes;
            setUser(user);
        }
    }, [userRes, userErr]);

    return <AuthContext.Provider value={auth}>{content}</AuthContext.Provider>;
}
