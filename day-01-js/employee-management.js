const employees = [
  {
    id: 1,
    name: "John",
    department: "Development",
    salary: 50000,
  },
  {
    id: 2,
    name: "Alex",
    department: "QA",
    salary: 45000,
  },
  {
    id: 3,
    name: "David",
    department: "Development",
    salary: 60000,
  },
];

function displayAllEmployees() {
  return employees;
}

function findById(id) {
  const employee = employees.find((employee) => employee.id === id);
  if (!employee) {
    return "Employee not found with this id";
  }
  return employee;
}

function displayEmployeesFromDevelopment() {
  const data = employees.filter(
    (employee) => employee.department === "Development",
  );
  return data;
}

function findByHighestSalary() {
  const employee = employees.reduce((highest, employee) => {
    return employee.salary > highest.salary ? employee : highest;
  });

  return employee;
}

function averageSalary() {
  const data = employees.reduce((total, employee) => {
    return total + employee.salary;
  }, 0);

  return data / employees.length;
}

function sortBySalary() {
  employees.sort((a, b) => a.salary - b.salary);
  return employees;
}

function addEmployee(employee) {
  if (typeof employee !== "object" && employee !== null) {
    return "Employee should be object";
  }

  employees.push(employee);
  return employees;
}

function updateSalary(id, salary) {
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return "No employee found by this id";
  }

  employee.salary = salary;
  return employee;
}

function removeEmployee(id) {
  const index = employees.findIndex((employee) => employee.id === id);

  if (index === -1) {
    return "Employee not found";
  }
  employees.splice(index, 1);
  return employees;
}

function searchByName(name) {
  const employee = employees.find((employee) => employee.name === name);
  if (!employee) {
    return "No employee found by this name";
  }
  return employee;
}

console.log(displayAllEmployees());

console.log(findById(5));

console.log(displayEmployeesFromDevelopment());

console.log(findByHighestSalary());

console.log(averageSalary());

console.log(sortBySalary());

const employee = { id: 4, name: "Kushal", department: "QA", salary: 45000 };
console.log(addEmployee(employee));

console.log(updateSalary(4, 47000));

console.log(removeEmployee(4));

console.log(searchByName("David"));
