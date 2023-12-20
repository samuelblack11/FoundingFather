const fs = require('fs');

const filename = 'RawData/founders-online-metadata.json'; // Replace with your actual file name

const printUniqueProjects = () => {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const projects = new Set();

    data.forEach(record => {
        if (record.project) {
            projects.add(record.project);
        }
    });

    console.log("Unique 'project' values:");
    projects.forEach(project => console.log(project));
};

printUniqueProjects();
