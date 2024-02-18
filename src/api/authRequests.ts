import { PollFields } from '../types/Polls';
import { URL } from './requests';

const genHeaders = (token: string) => {
    return {
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
        },
    };
};

export const getUser = async (token: string) => {
    const response = await fetch(URL + '/user', {
        method: 'GET',
        ...genHeaders(token),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error(JSON.stringify(response));
    }

    return data;
};

export const createPoll = async (token: string, poll: PollFields) => {
    const response = await fetch(URL + '/poll', {
        method: 'POST',
        ...genHeaders(token),
        body: JSON.stringify(poll),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error(JSON.stringify(response));
    }

    return data;
};
