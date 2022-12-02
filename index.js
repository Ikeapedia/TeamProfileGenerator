const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");

const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employeeArr = [];
const jobs = ['Engineer', 'Intern'];


const createManager = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the manager's name."));
        }
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's ID Number?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the manager's ID Number."));
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the manager's email."));
        }
    },
    {
        type: "input",
        name: "officeNum",
        message: "What is their office number?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the manager's office number."));
        }
    }
]
.then(createManager => {
    const {name, id, email, officeNum} = createManager;
    const manager = new Manager (name, id, email, officeNum);

    employeeArr.push(manager);
    console.log(manager);
});

const createEmployee = [
    {
        type: "list",
        name: "role",
        messages: "Select the employee's role",
        choices: jobs
    },

    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the employee's name."));
        }
    },

    {
        type: "input",
        name: "id",
        message: "What is the employee's ID Number?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the employee's ID Number."));
        }
    },

    {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the employee's email."));
        }
    },

    {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username.",
        when: (input) => input.role === jobs[0],
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the employee's GitHub username."));
        }
    },

    {
        type: "input",
        name: "school",
        message: "Enter the intern's school.",
        when: (input) => input.role === jobs[1],
        validate: nameInput => {
            return (nameInput ? true : console.log("Please enter the intern's school."));
        }
    },

    {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Are there more employees you wish to add?",

    }
]
.then(employeeInfo => {
    let {name, id, email, github, school, confirmAddEmployee} = employeeInfo;
    let employee;

    if (role === "Engineer") {
        employee = new Engineer (name, id, email, github);
        console.log(employee);
    }else if (role === "Intern") {
        employee = new Intern (name, id, email, school);
        console.log(employee);
    }

    employeeArr.push(employee);
    return (confirmAddEmployee ? createEmployee(employeeArr) : employeeArr);
});

const writeFile = data => {
    fs.writeFile('../dist/index.html', data, error => error ? console.log("There appears to be an issue " + error) : console.log("No issues found, team profile created."))
};

createManager()
    .then(createEmployee)
    ,then(employeeArr => {
        return generateHTML(employeeArr);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(error => {
        console.log('There appears to be an error: ' + error);
    });

