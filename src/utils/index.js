exports.addMovie = async (collection, movieObj) => {
    await collection.insertOne(movieObj);
};