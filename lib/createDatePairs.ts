export const getDateFieldPairs = (fields: SchemaDefinition[]) => {

    const pairs = [];

    fields.forEach(field => {
        if (field.name.endsWith('_issued_at')) {
            const prefix = field.name.split('_issued_at')[0];
            const expiryField = fields.find(f => f.name === `${prefix}_expires_at`);
            if (expiryField) {
                pairs.push({ issue: field.name, expiry: expiryField.name });
            }
        }
    });

    // console.log(pairs, "PAIRS")
    return pairs;
};