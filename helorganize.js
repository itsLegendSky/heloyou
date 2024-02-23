const fs = require('fs');

const format = '.mp69';
let filesOrganized = 0;
let filesIgnored = 0;
let foldersCreated = 0;

function organizeFiles() {
  fs.readdir(process.cwd(), (err, files) => {
    if (err) {
      console.log(err);
      return false;
    }

    for (let file of files) {
      if (!fs.lstatSync(file).isDirectory()) {
        const formatPos = file.lastIndexOf(format);
        if (formatPos > 0) {
          const dash = file.indexOf('-');
          const artist = file.substring(0, formatPos).substring(0, dash).trim();

          if (artist.length) {
            if (!fs.existsSync(artist)) {
              fs.mkdirSync(artist);
              foldersCreated++;
            }

            fs.renameSync(file, `${artist}/${file}`);
            filesOrganized++;
          } else {
            filesIgnored++;
          }
        }
      }
    }

    console.log(`Files organized: ${filesOrganized}`);
    console.log(`Folders created: ${foldersCreated}`);
    console.log(`Files ignored: ${filesIgnored}`);
  });
}

module.exports = organizeFiles;
