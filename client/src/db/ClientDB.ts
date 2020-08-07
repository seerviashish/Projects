import Dexie from "dexie";
import { Client, IClient } from "./models/Client";

export class ClientDB extends Dexie {
  client: Dexie.Table<IClient, string>;
  constructor() {
    super("ClientDB");
    var cdb = this;
    cdb.version(1).stores({
      client: "&key",
    });
    cdb.open().catch((err) => {
      throw new Error("Client database not able to open.");
    });
    this.client = this.table("client");
    cdb.client.mapToClass(Client);
  }
}

export var cdb = new ClientDB();
