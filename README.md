# Video Download and Conversion App

## Overview

This application allows users to upload a CSV or Excel file containing video URLs and human-readable filenames. The app uses `ffmpeg` to download and convert videos from `.mkv` or `.mp4` formats to `.mp4` format. The processed videos are stored in a specified directory. This app is designed to run on both Windows and Linux OS, but is optimized for local use on Windows machines.

## Features

- **File Upload**: Upload CSV or Excel files containing video URLs and filenames.
- **Video Processing**: Download videos using `ffmpeg` and convert them to `.mp4` format.
- **Results Display**: View the status of each video download (success or failure) on the web interface.
- **File Cleanup**: Automatically deletes the uploaded file after processing.

## Dependencies

This project requires the following dependencies:

### Core Dependencies

- **`express`**: A fast, unopinionated, minimalist web framework for Node.js.
- **`multer`**: Middleware for handling `multipart/form-data`, used for file uploads.
- **`path`**: Provides utilities for working with file and directory paths (built-in Node.js module).
- **`fs`**: Provides filesystem-related functionality (built-in Node.js module).

### Video Processing

- **`fluent-ffmpeg`**: A Node.js wrapper around FFmpeg, used for video conversion and processing.

### CSV and Excel Parsing

- **`csv-parser`**: A streaming CSV parser for Node.js, used to parse CSV files.
- **`xlsx`**: A library for parsing and writing Excel files, used to handle XLS and XLSX files.

## Installation

To install all the necessary dependencies, run the following command:

```bash
npm install
```

## Usage

To start the application, run the following command:

```bash
npm start
```

To upload a CSV or Excel file, simply drag and drop it into the browser window.

## Developer

This project is maintained by [Ashutosh Sharma](https://github.com/Tech-Xposer).
