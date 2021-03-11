const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let theATeam = [];
const iceBreaker = [
{
        type: "list",
        message: "What is your role on the team?",
        name: "role",
        choices: ["intern", "engineer", "manager"]
},
{
    when: input => {
        return input.role == "engineer"
    },
    type: "input",
    message: "What is your GitHub?",
    name: "github"
},
{
    when: input => {
        return input.role == "intern"
    },
    type: "input",
    message: "What school do you attend?",
    name: "school"
},
{   
    when: input => {
    return input.role == "manager"
    },
    type: "input",
    message: "What is your office number?",
    name: "officenumber"
},

{
    type:"input",
    message: "What is your name?",
    name: "name"
},
{
    type: "input",
    message: "What is your placement?",
    name: "id"
},
{
    type: "list",
    name: "Members",
    message: "Are there any additional members?",
    choices: ["Yes, I have additional members ", "No, that is it"]
}
]

const moreIceBreakers = [
    {
        type: "list",
        message: "What is your role on the team?",
        name: "role",
        choices: ["intern", "engineer", "manager"]
},
{
    when: input => {
        return input.role == "engineer"
    },
    type: "input",
    message: "What is your GitHub?",
    name: "github"
},
{
    when: input => {
        return input.role == "intern"
    },
    type: "input",
    message: "What school do you attend?",
    name: "school"
},
    {
        type:"input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your placement?",
        name: "id"
    },
    
    {
        type: "list",
        name: "MoreMembers",
        message: "Are there any additional members?",
        choices: ["Yes, I have additional members ", "No, that is it"]
    }
]
function anotherList() {
    inquirer.prompt(moreIceBreakers).then(iceBreake => {
        if (iceBreake.role == "engineer") {
            var morePeople = new Engineer(iceBreake.name, theATeam.length + 1, iceBreake.email, iceBreake.github);
        } else {
            var morePeople = new Intern(iceBreake.name, theATeam.length + 1, iceBreake.email, iceBreake.school);
        }
        theATeam.push(morePeople);
        if (iceBreake.MoreMembers === "Yes") {
            console.log("Success Five");
            anotherList();
        } else {
            createTeam();
        }
    })
}
// function writeToFile(fileName, data) {
//     fs.writeFile(fileName, data, err => {
//         if (err) {
//             throw err;
//         }
//     });
// }
function createTeam() {
// //     let anotherFile = (" ")
// //     writeToFile("./output/team.html", anotherFile, (err) => {
// //         if (err) throw err;
// //     console.log("Success Four");
// // })

    for (team of theATeam) {
        if (team.getRole() == "Manager") {
            appendCard("manager", team.getName(), team.getId(), team.getEmail(), "Office: " + team.getofficeNumber());
        } else if (team.getRole() == "Engineer") {
            appendCard("engineer", team.getName(), team.getId(), team.getEmail(), "Github: " + team.getGithub());
        } else if (team.getRole() == "Intern") {
            appendCard("intern", team.getName(), team.getId(), team.getEmail(), "School: " + team.getSchool());
        }
    }
    fs.writeFile(outputPath, "</div></main></body></html>", function (err) {
        if (err) throw err;
    });
    console.log("Success One")

}

function appendCard(team, name, id, email) {
    let newInfo = render(`./templates/${team}.html`, 'utf8')
    newName = newInfo.replace("name", name);
    newId = newInfo.replace("id", `ID: ${id}`);
    newEmail = newInfo.replace("email", `Email: <a href="mailto:${email}">${email}</a>`);
    fs.appendFileSync(outputPath, data, err => { if (err) throw err; })
    console.log("Success Two");
}

function init() {
    inquirer.prompt(iceBreaker).then(iceBreak => {
        let managerRole = new Manager(iceBreak.name, 1, iceBreak.email, iceBreak.officenumber);
        theATeam.push(managerRole);
        console.log("Success Three");
        if (iceBreak.MoreMembers === "Yes") {
            anotherList();    
        } else {
            createTeam();
        }
    })
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
