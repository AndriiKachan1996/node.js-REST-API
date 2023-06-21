const handleMongooseError = (error, data, next) => {
	const { code, name } = error;
	const errorType = "MongoServerError";

	error.status = code === 11000 && name === errorType ? 409 : 400;

	next();
};

module.exports = handleMongooseError;
