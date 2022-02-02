const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const { addMovie } = require("./utils");

const app = async (yargsObj) => {
    try {
        const collection = await connection();
    if (yargsObj.add) {
        await addMovie(collection, {
            title: yargsObj.title,
            actor: yargsObj.actor
        });
    } else if (yargsObj.update) {
        // First we tell MongoDB to find our Collection named Movies.
        // If there is none it will create it for us.
        const database = client.db("Movies");

        // Then we tell MongoDB hey i have child in there, access it!
        // Also if there is none MongoDB will create it for us.
        const collection = database.collection("Movie")
        
        // We use $set and tell MongoDB to HEY change this and this to this and this.
        const updateDoc = {
            $set: {
                title: "Clean",
                actor: "Lyo"
            }
        }

        // We want to match it on all documents so we leave blank obj.
        // [Empty filter matches all docs.]
        const result = await collection.updateOne({}, updateDoc, {})

        // Log
        console.log(`${result.modifiedCount}`);
    }
    client.close();
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv);