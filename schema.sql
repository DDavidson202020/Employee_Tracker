DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(4,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=100;

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1000;

INSERT INTO department(name) VALUES("Sales");
INSERT INTO department(name) VALUES("Admin");
INSERT INTO department(name) VALUES("HR");
INSERT INTO department(name) VALUES("Admission");

INSERT INTO role(title, salary, department_id) VALUES("Sales Director", 40.50, 1);
INSERT INTO role(title, salary, department_id) VALUES("Sales Associate", 15.25, 1);
INSERT INTO role(title, salary, department_id) VALUES("Payroll Manager", 20.45, 2);
INSERT INTO role(title, salary, department_id) VALUES("Payroll Associate", 18.50, 2);
INSERT INTO role(title, salary, department_id) VALUES("Employee Affair Manager", 25.50, 3);
INSERT INTO role(title, salary, department_id) VALUES("Admission Coordinator", 19.50, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("John", "Smith", 100, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Jane", "Martin", 101, 1000);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Oliver", "Grant", 101, 1000);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Susan", "Gough", 102, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Lisa", "High", 103, 1003);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Bill", "Funesti", 104, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Kitty", "Red", 105, 1005);

UPDATE employee SET role_id = 100 WHERE employee_id = 1000;