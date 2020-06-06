
// init user db
db.createUser(
    {
      user: "exam-user",
      pwd: "12345",
      roles: [
         { role: "readWrite", db: "exam" }
      ]
    }
);