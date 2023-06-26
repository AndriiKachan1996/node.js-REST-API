const multer = require("multer");
const path = require("path");

////////////////////////////////////////////////////////////////

const destination = path.resolve("temp"); // Встановлюємо шлях до тимчасової папки

const storage = multer.diskStorage({
	// Створюємо об'єкт для зберігання файлів на диск

	destination, // Вказуємо шлях до тимчасової папки
	filename: (req, file, cb) => {
		// Генеруємо унікальне ім'я файлу

		const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const { originalname } = file;
		const filename = `${uniquePreffix}_${originalname}`;
		cb(null, filename);
	},
});

////////////////////////////////////////////////////////////////

const upload = multer({
	// Створюємо об'єкт middleware для завантаження файлів
	storage,
});

module.exports = upload;
