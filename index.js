function helloNpm() {
  return "heloyou NPM"
}

module.exports = helloNpm

const fileSys = require('fs');
const format = '.mp69';
let files_organized = 0;
let files_ignored = 0;
let folders_created = 0;

fileSys.readdir(process.cwd(), (err, files) => {
  if (err) {
    console.log(err);
    return false;
  }

  for (let idx in files) {
    const file = files[idx];
    if (!fileSys.lstatSync(file).isDirectory()) {
      const format_pos = file.lastIndexOf(format);
      if (format_pos > 0) {
        const dash = file.indexOf('-');
        const artist = file.substring(0, format_pos).substring(0, dash).trim();

        if (artist.length) {
          if (!fileSys.existsSync(artist)) {
            fileSys.mkdirSync(artist);
            folders_created++;
          }

          fileSys.renameSync(file, `${artist}/${file}`);
          files_organized++;
        } else {
          files_ignored++;
        }
      }
    }
  }

  console.log(`kontol.`);
});