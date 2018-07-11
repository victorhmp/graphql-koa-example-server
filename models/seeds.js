const userModel = require('./user');
const todoModel = require('./todo');

let user1 = new userModel({
  firstName: 'Victor',
  lastName: 'Pinto',
  email: 'victor2142@gmail.com',
  nickname: 'VH'
});
let user2 = new userModel({
  firstName: 'HR',
  lastName: 'Wells',
  email: 'hr@gmail.com',
  nickname: 'HR'
});
let user3 = new userModel({
  firstName: 'Bartholomel',
  lastName: 'Allan',
  email: 'berrytheflash@gmail.com',
  nickname: 'The Flash'
});
let user4 = new userModel({
  firstName: 'Jennifer',
  lastName: 'Wells',
  email: 'jen@gmail.com',
  nickname: 'Jen'
});

user1.save();
user2.save();
user3.save();
user4.save();

let todo1 = new todoModel({
  title: "GraphQL Presentation",
  description: "Finish presentation! It's getting late",
});
let todo2 = new todoModel({
  title: "I guess there's no point in giving a title to a task...",
  description: "Make better examples next time",
});
let todo3 = new todoModel({
  title: "Another Todo",
  description: "Yeah... they are getting worse",
});
let todo4 = new todoModel({
  title: "Secret App Idea...",
  description: "Do not tell people without a NDA",
});

todo1.save();
todo2.save();
todo3.save();
todo4.save();