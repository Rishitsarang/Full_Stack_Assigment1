const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

function zipFolder(sourceFolder, outPath) {
  const output = fs.createWriteStream(outPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on("close", () => {
      console.log(`Zipped ${archive.pointer()} total bytes`);
      console.log(`Zip file created at: ${outPath}`);
      resolve();
    });

    archive.on("error", (err) => reject(err));

    archive.pipe(output);

    archive.directory(sourceFolder, false); // add folder contents without including folder name

    archive.finalize();
  });
}

// Usage example
const sourceFolder = path.join(__dirname, "files_to_zip");
const outPath = path.join(__dirname, "files_to_zip.zip");

zipFolder(sourceFolder, outPath)
  .then(() => console.log("Zipping completed successfully."))
  .catch((err) => console.error("Error during zipping:", err));
