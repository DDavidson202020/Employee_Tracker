![GitHub Badge](https://img.shields.io/badge/Nodejs-MySQL-blue.svg)

# Employee_Tracker
## Description
Architect and build a solution for managing a company's employees using node, inquirer, and MySQL.
Design the following database schema containing three tables:
#### Database Schema
##### Department:

* id - INT PRIMARY KEY
* name - VARCHAR(30) to hold department name
##### Role:

* id - INT PRIMARY KEY
* title - VARCHAR(30) to hold role title
* salary - DECIMAL to hold role salary
* department_id - INT to hold reference to department role belongs to
##### Employee:

* id - INT PRIMARY KEY
* first_name - VARCHAR(30) to hold employee first name
* last_name - VARCHAR(30) to hold employee last name
* role_id - INT to hold reference to role employee has
* manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
#### Build a command-line application that at a minimum allows the user to:

* Add departments, roles, employees

* View departments, roles, employees

* Update employee roles
#### How to deliver this? Here are some steps:

Use the MySQL NPM package to connect to MySQL database and perform queries.

Use InquirerJs NPM package to interact with the user via the command-line.

Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package formats the data a little better for our purposes.

Need to perform a variety of SQL JOINS to complete this application.
