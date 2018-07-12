const fetch = require("node-fetch");
const UserModel = require("../mongodb/models/user");
const TodoModel = require("../mongodb/models/todo");

const FortuneCookie = {
  getOne() {
    return fetch("http://fortunecookieapi.herokuapp.com/v1/cookie")
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  }
};

const resolvers = {
  Query: {
    allUsers: async () => {
      return await UserModel.find().exec();
    },
    user: async (_, args) => {
      return await UserModel.findOne({
        firstName: args.firstName,
        lastName: args.lastName
      }).exec();
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
    },
    allTodos: async () => {
      return await TodoModel.find().exec();
    },
    getTodosByOwnerName: async (_, args) => {
      return await TodoModel.find({ owner: args.owner }).exec();
    },
    posts: (_, args, context, info) => {
      return context.prisma.query.posts(
        {
          where: {
            OR: [
              { title_contains: args.searchString },
              { content_contains: args.searchString }
            ]
          }
        },
        info
      );
    },
    person: (_, args, context, info) => {
      return context.prisma.query.person(
        {
          where: {
            id: args.id
          }
        },
        info
      );
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      let user = new UserModel({
        firstName: args.firstName,
        lastName: args.lastName,
        nickname: args.nickname,
        email: args.email
      });
      return await user.save();
    },
    createTodo: async (_, args) => {
      let todo = new TodoModel({
        title: args.title,
        description: args.description,
        owner: args.owner
      });
      return await todo.save();
    },
    completeTodo: async (_, args) => {
      return await TodoModel.findOneAndUpdate(
        { title: args.title },
        { $set: { completed: true } }
      );
    },
    createDraft: (_, args, context, info) => {
      return context.prisma.mutation.createPost(
        {
          data: {
            title: args.title,
            content: args.title,
            author: {
              connect: {
                id: args.authorId
              }
            }
          }
        },
        info
      );
    },
    publish: (_, args, context, info) => {
      return context.prisma.mutation.updatePost(
        {
          where: {
            id: args.id
          },
          data: {
            published: true
          }
        },
        info
      );
    },
    deletePost: (_, args, context, info) => {
      return context.prisma.mutation.deletePost(
        {
          where: {
            id: args.id
          }
        },
        info
      );
    },
    signup: (_, args, context, info) => {
      return context.prisma.mutation.createPerson(
        {
          data: {
            name: args.name
          }
        },
        info
      );
    }
  }
};

export default resolvers;
