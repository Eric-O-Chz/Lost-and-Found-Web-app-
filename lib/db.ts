import { MongoClient,Db,Collection,Document } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.CONNECTIONSTRING) {
  throw new Error("Please add your MongoDB URI to the .env file")
}

const uri:string = process.env.CONNECTIONSTRING as string;
const options = {}
declare global {
  // allow global `var` in TypeScript
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the MongoClient instance is not recreated.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

async function getDatabase(dbName?: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName)
}

// export async function getCollection(collectionName) {
//   const db = await getDatabase()
//   return db.collection(collectionName)
// }

export async function getCollection<T extends Document = Document>(
  collectionName: string,
  dbName?: string
): Promise<Collection<T>> {
  const db = await getDatabase(dbName);
  return db.collection<T>(collectionName);
}

export default getDatabase