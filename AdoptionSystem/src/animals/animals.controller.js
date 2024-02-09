'use strict'

import { checkUpdateAnimal } from '../utils/validator.js'
import Animal from './animals.model.js'

export const registerAnimal = async (req, res) => {
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save()
        return res.send({ message: `Your pet ${animal.name} is registered successfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering your pet', err: err })
    }
}

export const updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdateAnimal(data, id)
        if (!update) return res.status(400).send({ message: 'Information from the pet updated' })
        let updatedAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedAnimal) return res.status(401).send({ message: 'The pet not found and not updated' })
        return res.send({ message: 'Updated pet', updateAnimal })
    } catch (err) {
        console.error(err)
        if (err.keyValue.animal) return res.status(400).send({ message: `Pet ${err.keyValue.name} is already registered with the information` })
        return res.status(500).send({ message: 'Error to update the information for the pet' })
    }
}

export const deleteAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({ _id: id })
        if (!deletedAnimal) return res.status(404).send({message: 'Register of pet not found and not deleted'})
        return res.send({message:`Pet ${deletedAnimal.name} eliminated successfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to delete the information of the pet'})
    }
}

export const AnimalsInformation = async (req, res) => {
    try {
        let animal = await Animal.findAll({ name })
            let animalInformation = {
                name: animal.name,
                age: animal.age,
                weight: animal.weight,
                breed: animal.breed,
                origin: animal.origin,
                size: animal.size,
                color: animal.color,
                character: animal.character
                
            }
            return res.send({animalInformation})
    } catch (err) {
        console.error(err)
        return res.status(404).send({message: 'Information not found'})
    }
}