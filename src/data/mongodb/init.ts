import mongoose from 'mongoose'

interface ConectionsOptions {
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase {
    static async connect (options:ConectionsOptions){
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect(mongoUrl,{
                dbName
            })
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error)
            throw new Error('Error al conectar a la base de datos')
        }
    
    }
}