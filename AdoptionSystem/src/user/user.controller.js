'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({ message: `Registered successfully, can be logged with email use ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar los datos (body)
        let { username, password } = req.body
        //Validar que exista el usuario
        let user = await User.findOne({ username }) //Buscar un solo registro. username: 'jmolina'
        //Verifico que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Respondo el usuario
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser })
        }
        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}

export const update = async (req, res) => { //Datos generales (No password)
    try {
        //Obtener el id del usuario al actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si data trae datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated' })
        //Validar si tiene permisos(tokenizacion)
        //Actualizar
        let updatedUser = await User.findOneAndUpdate(
            { _id: id }, //ObjectsId <- hexadecimales (Hora sys, Version Mongo, Llave privada...)
            data, //Datos que se van a actualizar
            { new: true }
        )
        //Validar la actualizacion
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        //Respuesta al usuario
        return res.send({ message: 'Updated user', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.user) return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` })
        return res.status(500).send({ message: 'Error to update account' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        //Obtener el id
        let { id } = req.params
        //Validar si esta logeado y es el mismo
        //Eliminar (deleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //Verificar que se elimino
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})//status 200
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to delete account' })
    }
}
