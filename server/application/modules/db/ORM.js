class ORM {
    constructor(db) {
        this.db = db;
    }

    async get(table, params = {}, fields = "*", operand = "AND") {
        let keys = [];
        const values = [];
        Object.keys(params).forEach((key, index) => {
            keys.push(`${key}=$${index + 1}`);
            values.push(params[key]);
        });
        const query = `
            SELECT ${fields} 
            FROM ${table} 
            WHERE ${keys.join(` ${operand} `)}
        `;
        console.log(query, values);
        const res = await this.db.query(query, values);
        return res.rows ? res.rows[0] : null;
    }

    async all(table, params = {}, fields = "*", terms = false, operand = "AND") {
        let keys = [];
        const values = [];

        Object.keys(params).forEach((key, index) => {
            keys.push(`${key}=$${index + 1}`);
            values.push(params[key]);
        });
        let termsQ = "";
        if (terms) {
            termsQ = ` WHERE ${keys.join(` ${operand} `)}`;
        }
        const query = `
            SELECT ${fields} 
            FROM ${table} 
            ${termsQ}
        `;

        const res = await this.db.query(query, values);
        return res.rows;
    }

    update(table, sets = {}, params = {}, operand = "AND") {
        let keys = [];
        let setsKeys = [];
        const values = [];
        let index = 1;

        Object.keys(sets).forEach((key) => {
            setsKeys.push(`${key}=$${index}`);
            values.push(sets[key]);
            index++;
        });

        Object.keys(params).forEach((key) => {
            keys.push(`${key}=$${index}`);
            values.push(params[key]);
            index++;
        });
        const query = `
            UPDATE ${table} 
            SET ${setsKeys.join(", ")}
            WHERE ${keys.join(` ${operand} `)}
        `;

        this.db.query(query, values);
    }

    async insert(table, params = {}) {
        const keys = [];
        const keys2 = [];
        const values = [];

        Object.keys(params).forEach((key, index) => {
            keys.push(`$${index + 1}`);
            keys2.push(key);
            values.push(params[key]);
        });
        const query = `
        INSERT INTO ${table} 
         (${keys2.join(`, `)})
         VALUES (${keys.join(`, `)})
    `;
        return await this.db.query(query, values);
    }

    delete(table) {
        const values = [];
        const query = `
        DELETE FROM ${table} 
    `;
        return this.db.query(query, values);
    }
}

module.exports = ORM;
