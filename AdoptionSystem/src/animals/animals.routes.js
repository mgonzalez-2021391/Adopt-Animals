import express from 'express'

import { AnimalsInformation, deleteAnimal, registerAnimal, updateAnimal } from './animals.controller.js'

const api = express.Router();

api.post('/registerAnimal', registerAnimal)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id',deleteAnimal)
api.search('/searchAnimals', AnimalsInformation)

export default api
