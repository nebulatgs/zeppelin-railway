// get the client
import { createConnection } from "mysql2";

// create the connection to database
const connection = createConnection(process.env.MYSQL_URL);
const zep_psw = process.env.DB_PASSWORD;
const logResults = (err, results, fields) => {
  err ? console.log(err) : null;
  results ? console.log(results) : null; // results contains rows returned by server
  fields ? console.log(fields) : null; // fields contains extra meta data about results, if available
};
// const queries = [
//   `CREATE USER IF NOT EXISTS \'zeppelin\'@\'localhost\' IDENTIFIED BY \'${zep_psw}\';`,
//   `grant all on *.* to \'root\'@\'localhost\' with grant option;`,
//   `grant all on zeppelin.* to \'zeppelin\'@\'localhost\' identified by \'${zep_psw}\' with grant option;`,
//   `flush privileges;`,
//   `create database if not exists zeppelin;`
// ]

const srvid = process.env.SERVER_ID;
const srvname = process.env.SERVER_NAME;
const owrid = process.env.OWNER_ID;
const accid = process.env.ACCOUNT_ID;

const queries = [
  `INSERT INTO allowed_guilds (id, name, icon, owner_id) VALUES ("${srvid}", "${srvname}", null, "${owrid}");`,
  `INSERT INTO configs (id, \`key\`, config, is_active, edited_by)
   VALUES (1, "global", "{\\"prefix\\": \\"!\\", \\"owners\\": [\\"${accid}\\"]}", true, "${accid}");`,
  `INSERT INTO configs (id, \`key\`, config, is_active, edited_by)
   VALUES (2, "guild-${srvid}", "{\\"prefix\\": \\"!\\", \\"levels\\": {\\"${accid}\\": 100}, \\"plugins\\": { \\"utility\\": {}}}", true, "${accid}");`,
  `INSERT INTO api_permissions (guild_id, target_id, type, permissions) VALUES (${srvid}, ${accid}, "USER", "OWNER");`,
  `SET GLOBAL time_zone = '+0:00';`,
];

const promises = queries.map((q) =>
  new Promise((res, rej) => {
    const r = connection.query(q, logResults);
    r.on("result", (row, i) => res(row, i));
    r.on("end", res());
  })
);
await Promise.all(promises);
