const controllerWrapper = (controller) => {
	const func = async (req, res, next) => {
		try {
			controller(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};

module.exports = controllerWrapper;
