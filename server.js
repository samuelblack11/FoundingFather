const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

// Read the metadata JSON file
const metadata = JSON.parse(fs.readFileSync('RawData/founders-online-metadata.json', 'utf8'));

const scrapeContent = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let content = '';

        // Extract content from 'docbody' and 'docback'
        $('.innerdiv.docbody, .innerdiv.docback').each(function () {
            content += $(this).text() + '\n'; // Adding a newline for separation
        });

        return content.trim(); // Trim to remove leading/trailing whitespace
    } catch (error) {
        console.error(`Error scraping ${url}: ${error.message}`);
        return '';
    }
};



// Function to process records
const processRecords = async (records) => {
    for (const record of records) {
        record.content = await scrapeContent(record.permalink);
        console.log(`Completed scraping from: ${record.permalink}`);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return records;
};

// Main function to filter and process records
const filterAndProcess = async (projectName) => {
    const filename = 'RawData/founders-online-metadata.json'; // Replace with your actual file name
    const metadata = JSON.parse(fs.readFileSync(filename, 'utf8'));

    // Filter records by project
    const filteredRecords = metadata.filter(record => record.project === projectName);

    // Process filtered records
    const processedRecords = await processRecords(filteredRecords);

    // Write to a new JSON file
    const outputFilename = `processed_${projectName}.json`;
    fs.writeFileSync(outputFilename, JSON.stringify(processedRecords, null, 2));
    console.log(`Processed data saved to ${outputFilename}`);
};

// Function to prompt for project name
const promptForProjectName = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the project name to filter by: ', (projectName) => {
        filterAndProcess(projectName).then(() => {
            rl.close();
        });
    });
};

// Replace 'YourProjectName' with the project name you want to filter by
promptForProjectName();