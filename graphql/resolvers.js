import fetch from 'node-fetch';
const UserModel = require('../models/user');
const TodoModel = require('../models/todo');

const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  },
};

const resolvers = {
  Query: {
    allUsers: async () => {
      return (await UserModel.find().exec());
    },
    user: async (_, args) => {
      return (await UserModel.findOne({ firstName: args.firstName, lastName: args.lastName}).exec());
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
    },
    allTodos: async () => {
      return (await TodoModel.find().exec());
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      let user = new UserModel({
        firstName: args.firstName,
        lastName: args.lastName,
        nickname: args.nickname,
        email: args.email,
      });
      return (await user.save());
    },
    createTodo: async (_, args) => {
      let todo = new TodoModel({
        title: args.title,
        description: args.description,
      });
      return (await todo.save());
    },
    completeTodo: async (_, args) => {
      return (await TodoModel.findOneAndUpdate(
        { title: args.title }, { $set: { completed: true } }
      ));
    }
  }
}

export default resolvers;