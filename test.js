const fs = require('fs');
const { generateReadme, generateLicense } = require('.'); 

const mockAnswers = {
    title: "Test Project Title",
    description: "This is a test description for the project.",
    installation: "Step 1: npm install\nStep 2: Run the application.",
    usage: "Run the application and follow on-screen prompts.",
    contributing: "John Doe, Jane Smith",
    license: "MIT",
    github: "testuser",
    email: "testuser@example.com"
};

const readmeContent = generateReadme(mockAnswers);
fs.writeFileSync('TEST_README.md', readmeContent, 'utf-8');
console.log('TEST_README.md has been generated!');

