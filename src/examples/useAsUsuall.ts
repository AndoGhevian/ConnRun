import { ConnRun } from '../'

const MONGODBURI = 'mongodb://localhost:8000'

export default async () => {
        const client = await ConnRun({ url: MONGODBURI }, ({ client }) => () => client)
        // // Do Some stuff...

        // // 1. For example:
        // const db = client.db('mydb')
        // const collection = db.collection('mycollection')
        // // and soo on...

        // // 2. Or call your own functions
        // await myfunction(client, ...args)

        await client.close()
}