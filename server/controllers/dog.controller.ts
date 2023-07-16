import dogService from "../services/dog.service";


export const getDogs = async (req, res) => {
    const dogs = await dogService.getDogs()

    return res.json(dogs)
}
