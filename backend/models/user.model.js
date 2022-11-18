import Open from "../config.js";

let data = [];

const passport = () => {
  let sql = ``;
  const result = Open(sql, [], false);
  data = result;

  return data;
};

const createUser = (sql) => {
  const result = Open(sql, [], false);
  data = result;

  return data;
};

const dropRole = (NAME) => {
  let sql = `DROP ROLE ${NAME}`;
  const result = Open(sql, [], false);
  data = result;

  return data;
};

const addRole = (NAME, PASSWORD) => {
  let sql = `CREATE ROLE ${NAME}`;
  if (PASSWORD && PASSWORD !== "") {
    sql = `CREATE ROLE ${NAME} IDENTIFIED BY ${PASSWORD}`;
  }
  const result = Open(sql, [], false);
  data = result;

  return data;
};

export const userModel = {
  passport,
};
