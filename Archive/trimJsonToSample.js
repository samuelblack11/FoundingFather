const fs = require('fs');

const filename = 'founders-online-metadata.json'; // Replace with your actual file name

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

// Keep only the first 5 records
const modifiedData = data.slice(0, 5);

// Write the modified data back to the file
fs.writeFileSync(filename, JSON.stringify(modifiedData, null, 2));

console.log('File updated with first 5 records.');
