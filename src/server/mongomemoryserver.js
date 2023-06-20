import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoServer = new MongoMemoryServer()

const opts = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}

const connect = async () => {
  await mongoServer.start()
	const mongoUri = mongoServer.getUri()
    return mongoUri;
	try {
		await mongoose.connect(mongoUri, opts).then(() => console.log('Connected'))
	} catch (error) {
		console.error(error)
	}
}

const close = async () => {
	await mongoose.disconnect()
	await mongoServer.stop()
}

const clear = async () => {
	const collections = mongoose.connection.collections

	for (const key in collections) {
		await collections[key].deleteMany()
	}
}


export { connect, close, clear }
