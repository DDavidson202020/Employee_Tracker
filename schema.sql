DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
    department_id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    role_id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(4,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);

INSERT INTO department VALUES(1, "Sales");
INSERT INTO department VALUES(2, "Admin");
INSERT INTO department VALUES(3, "HR");
INSERT INTO department VALUES(4, "Admission");

INSERT INTO role VALUES(10, "Sales Director", 40.50, 1);
INSERT INTO role VALUES(11, "Sales Associate", 15.25, 1);
INSERT INTO role VALUES(12, "Payroll Manager", 20.45, 2);
INSERT INTO role VALUES(13, "Payroll Associate", 18.50, 2);
INSERT INTO role VALUES(14, "Employee Affair Manager", 25.50, 3);
INSERT INTO role VALUES(15, "Admission Coordinator", 19.50, 4);

INSERT INTO employee VALUES(100, "John", "Smith", 10, null);
INSERT INTO employee VALUES(101, "Jane", "Martin", 11, 100);
INSERT INTO employee VALUES(102, "Oliver", "Grant", 11, 100);
INSERT INTO employee VALUES(103, "Susan", "Gough", 12, null);
INSERT INTO employee VALUES(104, "Lisa", "High", 13, 103);
INSERT INTO employee VALUES(105, "Bill", "Funesti", 14, null);
INSERT INTO employee VALUES(106, "Kitty", "Red", 15, 105);