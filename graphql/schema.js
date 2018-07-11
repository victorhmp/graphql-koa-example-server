const typeDefs = `
type Query {
  user(firstName: String, lastName: String): User,
  allUsers: [User],
  allTodos: [Todo],
  getFortuneCookie: String
}

type User {
  id: Int,
  firstName: String!,
  lastName: String!,
  nickname: String,
  email: String,
}

type Todo {
  id: Int,
  title: String,
  description: String,
  completed: Boolean,
}
`

export default typeDefs;