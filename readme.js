const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'List your collaborators:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose an open-source license for your project:',
        choices: ['MIT', 'GPL-3.0', 'Apache-2.0', 'BSD-3-Clause', 'None']
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GITHUB username?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
    }
];

function generateLicense(license) {
    switch (license) {
        case 'MIT':
            return {
                badge: '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)',
                text: 'This project is licensed under the MIT License.'
            };
        case 'GPL-3.0':
            return {
                badge: '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)',
                text: 'This project is licensed under the GNU GPL v3 License.'
            };
        case 'Apache-2.0':
            return {
                badge: '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)',
                text: 'This project is licensed under the Apache License 2.0.'
            };
        case 'BSD-3-Clause':
            return {
                badge: '![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)',
                text: 'This project is licensed under the BSD 3-Clause License.'
            };
        case 'None':
            return {
                badge: '',
                text: 'This project is not licensed under any open-source license.'
            };
        default:
            return {
                badge: '',
                text: ''
            };
    }
}

function generateTableOfContents() {
    let sections = [
        "Description",
        "Installation",
        "Usage",
        "License",
        "Questions"
    ];

    return `
## Table of Contents
${sections.map(section => `- [${section}](#${section.toLowerCase()})`).join('\n')}
`;
}

function generateReadme(answers) {
    const licenseInfo = generateLicense(answers.license);
    const tableOfContents = generateTableOfContents();

    return `
# ${answers.title}

${licenseInfo.badge}

${tableOfContents}

## Description
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseInfo.text}

## Questions
GITHUB: https://github.com/${answers.github}
EMAIL: [${answers.email}](mailto:${answers.email})
`;
}

inquirer.prompt(questions).then(answers => {
    const readmeContent = generateReadme(answers);
    fs.writeFileSync('README.md', readmeContent, 'utf-8');
    console.log('README.md has been generated!');
});
