class Mediator {
    constructor(params) {
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

    subscribe(name, func) {
        if (name && this.events[name] && func instanceof Function) {
            this.events[name].push(func);
        }
    }

    unsubscribe(name, func) {
        if (name && this.events[name] && func instanceof Function) {
            this.events[name] = this.events[name].filter((handler) => handler !== func);
        }
    }

    call(name, data = null) {
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

    set(name, func) {
        if (name && this.triggers[name] && func instanceof Function) {
            this.triggers[name] = func;
        }
    }

    get(name, data = null) {
        if (name && this.triggers[name] && this.triggers[name] instanceof Function) {
            return this.triggers[name](data);
        }
        return null;
    }
}
module.exports = Mediator;
