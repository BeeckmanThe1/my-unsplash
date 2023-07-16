import {Dog} from "../db/schemas/dog.schema";

const populateDogDB = async () => {
    const currentDogs = await getDogs()
    const isAlreadyPopulated = currentDogs?.length > 0

    if(isAlreadyPopulated) {
        console.log('DB is already populated')
        return
    }

    console.log('populating DB...')

    const dog1 = new Dog({name: 'Filemon', age: 13})
    const dog2 = new Dog({name: 'Baucis', age: 6})

    await Dog.insertMany([dog1, dog2])

    console.log('Succesfully populated DB')
}
const getDogs = async () => await Dog.find({})

export default {
    populateDogDB,
    getDogs
}