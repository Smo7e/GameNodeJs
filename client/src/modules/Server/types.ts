export type TError = {
    code: number;
    text: string;
};

export type TUserFull = {
    id: number;
    name: string;
    token: string;
};

// export type TUser = {
//     id: number;
//     name: string;
// };

export type TMessage = {
    message: string;
    name: string;
};

export type TMessages = {
    messages: Array<TMessage>;
};

export type TFriend = {
    id: number;
    name: string;
};

export type TGamer = {
    user_id: number;
    name: string;
    person_id: number;
    x: number;
    y: number;
    hp: number;
    post: string;
};
export type TMobs = {
    id: number;
    x: number;
    y: number;
    hp: number;
    damage: number;
};

export type TAnswer<T> = {
    result: "ok" | "error";
    data?: T;
    error?: {
        code: number;
        text: string;
    };
};
export type TInvites = {
    friendsId: number[];
    lobbyName: string;
};
export type TQuestion = {
    id: number;
    question: string;
    answer_1: string;
    answer_2: string;
    answer_3: string;
    answer_4: string;
    correct_answer: number;
};
export type TArrBullet = number[][];
