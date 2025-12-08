import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const CREATE_PARTY = "INSERT INTO party (name) VALUES (?)";
export function CreateParty(partyname: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(CREATE_PARTY, [partyname], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

export const GET_PARTY_NAME = "SELECT name FROM party LIMIT 1";
export function GetPartyName(): Promise<string> {
  return new Promise((resolve, reject) => {
    db.get(GET_PARTY_NAME, [], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve("");
      resolve((row as { name: string }).name);
    });
  });
}
