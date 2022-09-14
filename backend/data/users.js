import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin user",
        email: "ad@ex.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Yakir Daniel",
        email: "yak@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Shimi Shimshon",
        email: "shim@ex.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;
