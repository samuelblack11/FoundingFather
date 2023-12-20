const fs = require('fs');

const filename = 'founders-online-metadata.json'; // Replace with your actual file name

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

// Check if data is an array and count, or count keys if it's an object
const recordCount = Array.isArray(data) ? data.length : Object.keys(data).length;

console.log(`There are ${recordCount} records in the JSON file.`);
