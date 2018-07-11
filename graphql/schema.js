const typeDefs = `
type Query {
  user(firstName: String, lastName: String): User,
  allUsers: [User],
  allTodos: [Todo],
  getFortuneCookie: String,
  getTodosByOwnerName(owner: String!): [Todo]
}

type Mutation {
  createUser(firstName: String!, lastName: String!, nickname: String, email: String!): User,
  createTodo(title: String, description: String): Todo,
  completeTodo(title: String!): Todo
}

type User {
  id: ID!,
  firstName: String!,
  lastName: String!,
  nickname: String,
  email: String,
  todos: [Todo]
}

type Todo {
  id: ID!,
  title: String,
  description: String,
  completed: Boolean,
  owner: String!
}
`

export default typeDefs;