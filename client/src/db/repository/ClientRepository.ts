import { Client, IClient } from "../models/Client";
import { ClientDB } from "../ClientDB";

export const save = async (client: Client, db: ClientDB): Promise<any> => {
  return db.transaction("rw", db.client, () => {
    return db.client.put(client);
  });
};

export const getByKey = async (key: string, db: ClientDB): Promise<any> => {
  return db.transaction("r", db.client, () => {
    return db.client.get({ key });
  });
};

export const isKeyExist = async (
  key: string,
  db: ClientDB
): Promise<IClient | undefined> => {
  return db.client.get(key);
};
