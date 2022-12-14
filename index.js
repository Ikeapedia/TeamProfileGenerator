const inquirer = require('inquirer');
const jest = require('jest');
const fs = require('fs');

const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/generateHTML');

const employeeArr = [];


const createManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager?',
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the manager's name."));
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's ID Number?",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the manager's ID Number."));
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the manager's email."));
            }
        },
        {
            type: 'input',
            name: 'office',
            message: 'What is their office number?',
            validate: nameInput => {
                return (isNaN(nameInput) ? console.log("Please enter the manager's office number.") : true );
            }
        }
    ])
        .then(managerInfo => {
            const { name, id, email, office } = managerInfo;
            const manager = new Manager(name, id, email, office);

            employeeArr.push(manager);
            console.log(manager);
        })

};

const createEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            messages: "Select the employee's role",
            choices: ['Engineer', 'Intern']
        },

        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the employee's name."));
            }
        },

        {
            type: 'input',
            name: 'id',
            message: "What is the employee's ID Number?",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the employee's ID Number."));
            }
        },

        {
            type: 'input',
            name: 'email',
            message: "What is the employee's email?",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the employee's email."));
            }
        },

        {
            type: 'input',
            name: 'github',
            message: "Enter the engineer's GitHub username.",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the employee's GitHub username."));
            }
        },

        {
            type: 'input',
            name: 'school',
            message: "Enter the intern's school.",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                return (nameInput ? true : console.log("Please enter the intern's school."));
            }
        },

        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Are there more employees you wish to add?',
        }
    ])
        .then(employeeInfo => {
            let { name, id, email, role, github, school, confirmAddEmployee } = employeeInfo;
            let employee;

            if (role === 'Engineer') {
                employee = new Engineer(name, id, email, github);
                console.log(employee);

            } else if (role === 'Intern') {
                employee = new Intern(name, id, email, school);
                console.log(employee);
            }

            employeeArr.push(employee);
            return (confirmAddEmployee ? createEmployee(employeeArr) : employeeArr);
        })

};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, error => error ? console.log(error) : console.log('No issues found, team profile created.'))
};

createManager()
    .then(() => createEmployee())
    .then((employeeArr) => {
        return generateHTML(employeeArr);
    })
    .then((pageHTML) => {
        return writeFile(pageHTML);
    })
    .catch((error) => {
        console.log('There appears to be an error: ' + error);
    });

