type TEVENT = {
    [key: string]: string;
};

type TParams = {
    EVENTS: TEVENT;
    TRIGGERS: TEVENT;
};

type TFunction = <T>(data: any) => T | void | null;

type TEvents = {
    [key: string]: Array<TFunction>;
};

type TTriggers = {
    [key: string]: TFunction;
};

export default class Mediator {
    private events: TEvents;
    private EVENTS: TEVENT;
    private triggers: TTriggers;
    private TRIGGERS: TEVENT;

    constructor(params: TParams) {
        const { EVENTS, TRIGGERS } = params;
        this.EVENTS = EVENTS;
        this.TRIGGERS = TRIGGERS;
        this.events = {};
        Object.keys(EVENTS).forEach((key) => (this.events[key] = []));
        this.triggers = {};
        Object.keys(TRIGGERS).forEach(
            (key) =>
                (this.triggers[key] = () => {
                    return null;
                })
        );
    }

    /***************/
    /* Про события */
    /***************/
    getEventTypes() {
        return this.EVENTS;
    }

    subscribe(name: string, func: TFunction): void {
        if (name && this.events[name] && func instanceof Function) {
            this.events[name].push(func);
        }
    }

    unsubscribe(name: string, func: TFunction): void {
        if (name && this.events[name] && func instanceof Function) {
            this.events[name] = this.events[name].filter((handler) => handler !== func);
        }
    }

    call<T>(name: string, data: T | null = null): void {
        if (name && this.events[name]) {
            this.events[name].forEach((func) => func instanceof Function && func(data));
        }
    }

    /****************/
    /* Про триггеры */
    /****************/
    getTriggerTypes() {
        return this.TRIGGERS;
    }

    set(name: string, func: TFunction): void {
        if (name && this.triggers[name] && func instanceof Function) {
            this.triggers[name] = func;
        }
    }

    get<T>(name: string, data: any = null): T | null {
        if (name && this.triggers[name] && this.triggers[name] instanceof Function) {
            return this.triggers[name](data) as T;
        }
        return null;
    }
}
