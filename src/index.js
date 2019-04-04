/* eslint-disable no-console */
const csv = require('csv-parser');
const fs = require('fs');
const { join } = require('path');
const moment = require('moment');
const commandLineArgs = require('command-line-args');
const options = commandLineArgs([
  { name: 'optin', type: d =>  moment(d) },
]);

const colEmail = 'Email Address';
const colOptinTime = 'OPTIN_TIME';
const outFolder = join(__dirname, '..', 'out');
const csvFolder = join(__dirname, '..', 'csv');

function parseDate(time) {
  const parts = (time || '').split(' ');
  return parts[0] && parts[0].match(/[0-9-]+/i) ? moment(parts[0]) : moment();
}

function isEmail(value) {
  return value && value.match(/^.*@.*\..*$/i) !== null;
}

function extractEmailAddresses(csvFilename, optinAfter) {
  return new Promise((resolve) => {
    const emails = [];
    let count = 0;
    fs.createReadStream(csvFilename)
      .pipe(csv())
      .on('data', (data) => {
        const email = data[colEmail];
        const optin = parseDate(data[colOptinTime]);

        const valid = isEmail(email) && (optinAfter ? optin.isSameOrAfter(optinAfter, 'day') : true);
        if (valid) {
          emails.push(email);
        }
        count++;
      })
      .on('end', () => {
        console.log(`Read ${emails.length} lines (out of ${count}) from CSV file "${csvFilename}".`);
        resolve(emails);
      });
  });
}

function createCsv(lines, count) {
  const outFilename = join(outFolder, `out-${count}.csv`);
  console.log('Creating CSV:', outFilename);
  // eslint-disable-next-line quotes
  fs.writeFileSync(outFilename, lines.map(line => line.join(';')).join("\r\n"), { encoding: 'utf8' });
}

function createBatches(result, size = 500) {
  let batch = [];
  let count = 0;
  while (result.length) {
    batch.push(result.pop());
    count++;

    if (batch.length === size) {
      createCsv(batch, count);
      batch = [];
    }
  }

  if (batch.length) {
    createCsv(batch, count);
  }
}

const result = fs.readdirSync(csvFolder)
  .filter(filename => filename.endsWith('.csv'))
  .map(async filename => await extractEmailAddresses(join(csvFolder, filename), options.optin));

Promise.all(result)
  .then(emails => {
    const total = emails.reduce((acc, current) => acc.concat(current), []);
    console.log(`Finished parsing ${total.length} emails.`);
    createBatches(total.map(email => ['FV', email]));
    console.log('Done!');
  })
  .catch(error => console.error(error));
