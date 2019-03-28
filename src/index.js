const fs = require('fs');
const { join } = require('path');

const outFolder = join(__dirname, '..', 'out');
const csvFolder = join(__dirname, '..', 'csv');

function isEmail(value) {
  return value && value.match(/^.*@.*\..*$/i) !== null;
}

function extractEmailAddresses(csvFilename) {
  const content = fs.readFileSync(csvFilename, { encoding: 'utf8' });
  if (!content) {
    return console.error('CSV file is empty!');    
  }

  const lines = content.split("\n");
  console.log(`CSV file has ${lines.length} lines`);

  return lines
    .map(line => {
      const columns = line.split(',');
      if (columns.length === 0) {
        console.log('Invalid line:', line);
        return null;
      }

      return columns[0];
    })
    .filter(email => isEmail(email))
  ;
}

function createCsv(lines, count) {
  const outFilename = join(outFolder, `out-${count}.csv`);
  console.log('Creating CSV:', outFilename);
  fs.writeFileSync(outFilename, lines.map(line => line.join(';')).join("\r\n"), { encoding: 'utf8' });
}

const result = fs.readdirSync(csvFolder)
  .filter(filename => filename.endsWith('.csv'))
  .map(filename => extractEmailAddresses(join(csvFolder, filename)))
  .reduce((acc, current) => acc.concat(current), [])
  .map(email => ['FV', email]);
console.log(`Finished parsing ${result.length} emails.`);

let batch = [];
let count = 0;
while (result.length) {
  batch.push(result.pop());
  count++;

  if (batch.length === 500) {
    createCsv(batch, count);
    batch = [];
  }
}

if (batch.length) {
  createCsv(batch, count);
}

console.log('Done!');
