const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');
const faker = require('faker');

const Employee = conn.define('employee', {
  name: {
    type: STRING,
    validate: {
      notEmpty: true
    }
  },
  bio: TEXT
}, {
  hooks: {
    beforeCreate: (employee)=> {
      employee.bio = `${employee.name} is ${employee.bio} --${employee.name}`;
    }
  }
});

const Department = conn.define('department', {
  name: STRING,
  description: TEXT
}, {
  hooks: {
    beforeCreate: (department)=> {
      department.description = `${department.name} is ${department.description} --${department.name}`;
    }
  }
});

Employee.belongsTo(Department);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const _departments = [];
  while(_departments.length < 5){
    _departments.push(Department.create({ name: faker.commerce.department(), description: faker.lorem.paragraphs(3) }));
  }
  const departments = await Promise.all(_departments);
  const _employees = [];
  while(_employees.length < 50){
    _employees.push(Employee.create({ name: faker.name.firstName(), departmentId: faker.random.arrayElement(departments).id, bio: faker.lorem.paragraphs(3) }));
  }
};

module.exports = {
  syncAndSeed,
  models: {
    Employee,
    Department
  }
};
