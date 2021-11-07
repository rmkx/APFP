const core = require('@actions/core');
const { writeFileSync } = require('fs');
const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGODB_URI)

async function read(query, type = "uid") {
    await client.connect();
    const res = await client.db("apfp").collection("apfp").find(query ? { [type]: query } : {}).toArray();
    await client.close()
    return res.length > 1 ? res : res[0]
}

const data = await read()
writeFileSync("./dist/usrbg.json", JSON.stringify(data))
