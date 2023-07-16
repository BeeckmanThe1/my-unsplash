import {Dog} from "../schemas/dog.schema";

export const populateDogDB = async () => {
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
export const getDogs = async () => await Dog.find({})
