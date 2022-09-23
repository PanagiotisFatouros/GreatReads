import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({
    host: 'great-reads.mysql.database.azure.com',
    user: 'team0',
    password: 'EvXg91q6%Xc0', // Hide this
    database: 'testdb'
});

// @ts-ignore
// Takes 3 arguments: table we want ROW to be inserted into, fields of that table in the form of 
// "(field1, field2...)", and values for each field in the form of "(value1, value2...)" and returns the Id of the
// createdRow in the table 
export async function createNewEntity(table, fields, values) {
    let idOfCreatedEntity;
    const queryString = `INSERT INTO ${table} ${fields} Values ${values}`
    const queryResponse = await mysqlconn.query(queryString)
    console.log(queryResponse)

    idOfCreatedEntity = typeof queryResponse == undefined? null : queryResponse[0].insertId
    return idOfCreatedEntity
}

// @ts-ignore
export async function retrieveOneEntity(table, field, value) {
    let queryString = `SELECT * from ${table} where ${field} = '${value}';`
    let targetEntity = await mysqlconn.query(queryString)
        .then(function ([rows, fields]) {
            // console.log(rows);
            let rowArray = JSON.parse(JSON.stringify(rows));
            return rowArray.length == 0 ? null : rowArray[0];
        }).catch((err) => console.log(err));
    return targetEntity
}

// @ts-ignore
export async function getAllRows(table, conditions?, values?) {
    let queryString: string = `SELECT * from ${table}`
    if (typeof conditions !== 'undefined' && typeof values !== 'undefined') {
        queryString += " where"
        let firstCondition = conditions.at(0)
        conditions.shift()
        let firstValue = values.at(0)
        values.shift()
        let conditionalString: string = ` ${firstCondition} = ${firstValue}`


        if (conditions?.length == values?.length) {
            conditions.forEach((nextCondition, index) => {
                let nextValue = values.at(index)
                conditionalString += ` and ${nextCondition} = ${nextValue}`
            })
        }
        else {
            console.log("conditions or values array are empty")
        }
        queryString += conditionalString
        // console.log(queryString)
    }

    let targetRows = await mysqlconn.query(queryString)
        .then(function ([rows, fields]) {
            // console.log(rows);
            let rowArray = JSON.parse(JSON.stringify(rows));
            return rowArray
        }).catch((err) => console.log(err));

    // console.log("testSQL")
    // console.log(targetRows)
    return targetRows
}