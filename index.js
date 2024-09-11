const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { parseCSV, parseXlsx } = require("./services/parseXlsx");
const downloadAndConvertVideo = require("./services/ffmpegDownload");
const logger = require("./services/logger");

const app = express();
const PORT = 3000;

// Multer setup for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
	const filePath = req.file.path;
	const ext = path.extname(filePath);

	let videoData = [];
	try {
		if (ext === ".csv") {
			videoData = await parseCSV(filePath);
		} else if (ext === ".xls" || ext === ".xlsx") {
			videoData = await parseXlsx(filePath);
		} else {
			throw new Error("Unsupported file type");
		}

		const downloadPath = path.resolve(__dirname, "downloads");
		const results = [];

		for (const item of videoData) {
			try {
				const { url, fileName } = item;
				const outputPath = await downloadAndConvertVideo(
					url,
					fileName,
					downloadPath
				);
				results.push({ fileName, status: "success", path: outputPath });
			} catch (error) {
				logger.error(`Failed to download ${item.fileName}: ${error.message}`);
				results.push({
					fileName: item.fileName,
					status: "failed",
					error: error.message,
				});
			}
		}

		logger.info("Processing completed");
		console.log("Processing completed");
		res.render("index", { message: "Processing completed", results });
	} catch (error) {
		logger.error(`Error during processing: ${error.message}`);
		res.render("index", { message: `Error: ${error.message}` });
	} finally {
		fs.unlink(filePath, (err) => {
			if (err) {
				logger.error(`Error deleting file: ${err.message}`);
			} else {
				console.log("File deleted successfully");
			}
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
