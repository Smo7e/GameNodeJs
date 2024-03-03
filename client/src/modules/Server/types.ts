export type TError = {
    code: number;
    text: string;
};

export type TUserFull = {
    id: number;
    name: string;
    token: string;
};

export type TUser = {
    id: number;
    name: string;
};

export type TMessage = {
    message: string;
    name: string;
};

export type TMessages = {
    messages: Array<TMessage>;
    hash: string;
};

export type TFriend = {
    id: number;
    name: string;
};

export type TGamer = {
    name: string;
    person_id: number;
    status: string;
    x: number;
    y: number;
    direction: string;
    hp: number;
};
export type TMobs = {
    id: number;
    x: number;
    y: number;
    status: string;
    hp: number;
};

export type TScene = {
    gamers: Array<TGamer> | null;
    items: Array<TMobs> | null;
    mobs: null;
    map: null;
    hashGamers?: string;
    hashMobs?: string;
};
