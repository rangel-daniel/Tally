export const URL = 'http://localhost:3000';

type SigninFields = {
    email: string;
    password: string;
};

type SignupFields = SigninFields & { name: string };

export const signup = async (credentials: SignupFields) => {
    const response = await fetch(URL + '/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(data));
    }

    return data;
};

export const signin = async (credentials: SigninFields) => {
    const response = await fetch(URL + '/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(data));
    }

    return data;
};

export const guestSignin = async () => {
    const response = await fetch(URL + '/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(data));
    }

    return data;
};

export const refreshAccessToken = async () => {
    const response = await fetch(URL + '/auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(data));
    }

    return data;
};

export const signOut = async () => {
    const response = await fetch(URL + '/auth', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw Error(JSON.stringify(data));
    }

    return data;
};
