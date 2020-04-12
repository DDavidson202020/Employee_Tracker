const inquirer = require("inquirer");
const mysql = require("mysql");
//const cTable = require('console.table')
const { printTable } = require('console-table-printer');
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employees_db"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
            "View Employees", "View Roles", "View Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"
        ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        switch (answer.choice) {
            case "View Employees":
              viewEmployees();
              break;
      
            case "View Roles":
              viewRoles();
              break;
      
            case "View Departments":
              viewDepartments();
              break;
      
            case "Add Employee":
              addEmployee();
              break;
            case "Add Role":
              addRole();
              break;
            case "Add Department":
              addDepartment();
              break;
            case "Update Employee Role":
              updateEmployeeRole();
              break;
            case "Exit":
              connection.end();
              break;
            }
      });
  }

const viewEmployees = () => {
    const joinTable = "SELECT employee.first_name AS First, employee.last_name AS Last, role.title FROM employee LEFT JOIN role ON employee.role_id = role.role_id;"
    connection.query(joinTable, (err, res) => {
      if (err) throw err;
      printTable(res)
      
      start();
    })
    console.log("\n List of all employees from database\n");
}

const viewRoles = () => {
  const joinTable = "SELECT role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.department_id;"
  connection.query(joinTable, (err, res) => {
    if (err) throw err;
    printTable(res);
    start();
  })
  console.log("\n List of titles, salaries and departments from database\n");
  
}

const viewDepartments = () => {
  const departments = connection.query("SELECT department.name FROM department", (err, res) => {
    if (err) throw err;
    printTable(res);
    start();
  })
  console.log("\n List of all the departments\n");
  
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "department"
      }
    ]).then(answer => {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department
          },
          function(err) {
            if (err) throw err;
          })
        console.log(`\n Department ${answer.department} added\n`);
        start();

    })
}

const addRole = () => {
  
  connection.query("SELECT * FROM department", (err,res) => {
    if(err) throw err;
    const departmentName = res.map((name1) => {
      return `${name1.name}`
    })
    
    
  inquirer
    .prompt([
      {
        type: "input",
        message: "What new role would you like to add?",
        name: "role"
      },
      {
        type: "input",
        message: "What hourly rate is for the new role?",
        name: "salary"
      },
      {
        type: "list",
        message: "What department does this new role belong to?",
        name: "department",
        choices: departmentName
      }
    ]).then(answer => {
      let departmentId;
        for (let i = 0; i < res.length; i++) {
            if (res[i].name == answer.department) {
                departmentId = res[i].department_id;
            }
        }
    
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          department_id: departmentId
        },
        function(err) {
          if (err) throw err;
          console.log(`\n New role ${answer.role} has been added\n`);
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    })
  })
}

const addEmployee = () => {
  connection.query("SELECT * FROM role", (err,res) => {
    if(err) throw err;
    const newRole = res.map((role) => {
      return `${role.title}`
    })
    
    
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the new employee's first name?",
        name: "first"
      },
      {
        type: "input",
        message: "What's the new employee's last name?",
        name: "last"
      },
      {
        type: "list",
        message: "What role does this new employee have?",
        name: "role",
        choices: newRole
      }
    ]).then(answer => {
      let roleId;
        for (let i = 0; i < res.length; i++) {
            if (res[i].title == answer.role) {
                roleId = res[i].role_id;
            }
        }
    
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: roleId
        },
        function(err) {
          if (err) throw err;
          console.log(`\n New employee ${answer.first} ${answer.last} has been added\n`);
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    })
  })
}
