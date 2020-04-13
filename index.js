const inquirer = require("inquirer");
const mysql = require("mysql");
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
        // based on their answer, call the correct function
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
// Declare viewEmployees function
const viewEmployees = () => {
  // Join 2 tables together from database
    const joinTable = "SELECT employee.first_name AS First, employee.last_name AS Last, role.title FROM employee LEFT JOIN role ON employee.role_id = role.role_id;"
    // query the result from joining tables and log the table out 
    connection.query(joinTable, (err, res) => {
      if (err) throw err;
      printTable(res)
      // Call the start function to take user to the option list of what to do next
      start();
    })
    console.log("\n List of all employees from database\n");
}
// Declare viewRoles function
const viewRoles = () => {
  // Join 2 tables together from database
  const joinTable = "SELECT role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.department_id;"
  // query the result from joining tables and log the table out
  connection.query(joinTable, (err, res) => {
    if (err) throw err;
    printTable(res);
    // Call the start function to take user to the option list of what to do next
    start();
  })
  console.log("\n List of titles, salaries and departments from database\n");
  
}
// Declare viewDepartments function
const viewDepartments = () => {
  // Query the result from selecting certain info from department table
  const departments = connection.query("SELECT department.name FROM department", (err, res) => {
    if (err) throw err;
    // Log out the info table
    printTable(res);
    // Call the start function to take user to the option list of what to do next
    start();
  })
  console.log("\n List of all the departments\n");
  
}
// Declare addDepartment function
const addDepartment = () => {
  // use inquirer to prompt user to a question to collect info
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "department"
      }
    ]).then(answer => {
      // Use the info collected to insert into database table
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
// Declare the addRole function
const addRole = () => {
  // Query the response and then use the map function to get the department name back
  connection.query("SELECT * FROM department", (err,res) => {
    if(err) throw err;
    // Use map method to get all the department names in an array
    const departmentName = res.map((name1) => {
      return `${name1.name}`
    })
    
  // use inquirer to prompt user to some questions to collect info 
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
      // Loop through the response from select * from department table to get the department id
        for (let i = 0; i < res.length; i++) {
          // If department name in database equals to user answer
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
          // re-prompt the user for what to do next
          start();
        }
      );
    })
  })
}
//Declare addEmployee function
const addEmployee = () => {
  // Query select all from role table
  connection.query("SELECT * FROM role", (err,res) => {
    if(err) throw err;
    // Use map function to get all titles info in an array
    const newRole = res.map((role) => {
      return `${role.title}`
    })
    
  // Prompt user questions to get info  
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
      // Loop through the response from selecting all from role table
        for (let i = 0; i < res.length; i++) {
          // if title from role table in database equals to user answer
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
          // re-prompt the user for what to do next
          start();
        }
      );
    })
  })
}
// Declare updateEmployeeRole function
const updateEmployeeRole = () => {
  // Join tables from database
  const joinTable = "SELECT employee.first_name AS First, employee.last_name AS Last, role.title FROM employee LEFT JOIN role ON employee.role_id = role.role_id;"
    connection.query(joinTable, (err, res) => {
      if (err) throw err;
      // Print out the table with info from joining tables
      printTable(res)
    })
    // Query select certain info from employee table
    connection.query("SELECT employee.first_name, employee.last_name, employee.employee_id FROM employee", (err,res) => {
      if(err) throw err;
      // Use map method to get full names in an array from employee table
      const pickEmployee = res.map((name) => {
        return `${name.first_name} ${name.last_name}`
      })
    // Query select some info from role table
    connection.query("SELECT role.title, role.role_id FROM role", (err,result) => {
      if(err) throw err;
      // Map method to get titles list in an array 
      const pickRole = result.map((role) => {
        return `${role.title}`
      })
  // Prompt user for questions to get info
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "update",
        choices: pickEmployee
      },
      {
        type: "list",
        message: "What type of role would you like to update to?",
        name: "typeOfRole",
        choices: pickRole
      }
    ]).then(answer => {
      var roleId;
      // Loop throught the result from Query select some info from role table
        for (let i = 0; i < result.length; i++) {
          // If title equals to user answer
            if (result[i].title == answer.typeOfRole) {
              // Then store the role_id of that title to a variable
                roleId = result[i].role_id;
            }
        }
      console.log(roleId)

      var employeeId;
      console.log(res)
      // Loop through the response from Query select some certain info from employee table
        for (let j = 0; j < res.length; j++) {
          // If full name equals user answer
            if (`${res[j].first_name}  ${res[j].last_name}`  == answer.update) {
              // Then store the employee_id of that employee to a variable
                employeeId = res[j].employee_id;
            }
        }
      console.log(employeeId)
      // Query update the info in database
      connection.query(
        
        "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id: roleId
        },
        {
          employee_id: employeeId
        }
      ],
        function(err) {
          if (err) throw err;
          console.log(`\n New employee role for ${answer.update}  has been updated\n`);
          // re-prompt the user for what to do next
          start();
        }
      );
    })
  })
})
}
