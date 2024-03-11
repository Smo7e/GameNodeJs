class ORM {
    constructor(db) {
        this.db = db;
    }

    async get(table, params = {}, fields = '*', operand = 'AND') {
        let keys = [];
        const values = [];
        Object.keys(params).forEach((key, index) => {
            keys.push(`${key}=$${index + 1}`);
            values.push(params[key]);
        });
        const query = `
            SELECT ${fields} 
            FROM ${table} 
            WHERE ${keys.join(` ${operand}`)}
        `;
        const res = await this.db.query(query, values);
        return res.rows ? res.rows[0] : null;
    }

    all() {}

    update() {}

    insert() {}

    delete() {}
}

module.exports = ORM;