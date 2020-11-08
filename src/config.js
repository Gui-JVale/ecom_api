require('dotenv').config()

export default {
  secrets: {
    jwt: process.env.JWT_SECRET,
  },
  dbUrl: `mongodb+srv://gui-jvale:${process.env.DB_PASS}@cluster0.396dn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  port: process.env.PORT || 3000,
}
