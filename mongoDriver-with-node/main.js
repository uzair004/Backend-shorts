const MongoClient = require('mongodb').MongoClient;
const Mongo = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {useUnifiedTopology: true} );

// promises way to interact with mongodb

// client.connect().then(result => {
//     const database = result.db('twitch');
//     const collection = database.collection('recipes');
// }, error => {
//     console.error(error);
// });

//async await way to interact
(async () => {
    await client.connect();
    const database = client.db('twitch');
    const collection = database.collection('recipes');

    //INSERT OPERATION

    // const result = await collection.insertOne({
    //     "name": "Choclate Cookies",
    //     "ingredients": ["eggs", "floor", "choclate chips"],
    // })
    // console.log(result.insertedCount);

    // SEARCH/FIND OPERATION
    const recipesCursor = await collection.find({}).project({"_id": 0});
   
    // 1st way (less effecient, expensive)
    // const recipesArray = await recipesCursor.toArray();
    // console.log(recipesArray);

    // 2nd way 
    while(await recipesCursor.hasNext()) {
        let recipe = await recipesCursor.next();
        console.log(recipe);
    }


    // UPDATE OPERATION

    // const updateResult = await collection.updateOne({
    //     "_id": Mongo.ObjectID("5fe45d1e2783a71e3c0c5ee8")
    // },
    // {
    //     $set: {
    //         "name": "Choclate chip cookies"
    //     },
    //     $addToSet: {
    //         "ingredients": "Sugar"
    //     }
    // })
    // console.log(`${updateResult.modifiedCount} values were updated`);

    const upsertResult = await collection.updateOne({
        "name": "Desert"
    },
    {
        $set: {
            "ingredients": ["milk", "flavours"]
        }
    },
    {
        "upsert": true
    })
    console.log(upsertResult.upsertedCount)



    // DELETE OPERATION

    // const deleteResult = await collection.deleteMany({"ingredients": "milk"});
    console.log(`${deleteResult.deletedCount} docs were deleted`);


    // delete whole collection
    collection.drop();


    client.close();

})();
