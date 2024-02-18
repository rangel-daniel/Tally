export type Settings = {
    deadline: Date | undefined;
    reqSignin: boolean;
    reqNames: boolean;
    allowEdit: boolean;
    allowMultiple: boolean;
};

export type PollSettings = {
    deadline: string | undefined;
    reqSignin: boolean;
    reqNames: boolean;
    allowEdit: boolean;
    allowMultiple: boolean;
};

export type PollFields = {
    question: string;
    opts: {
        opt: string;
    }[];
    settings: PollSettings;
};
