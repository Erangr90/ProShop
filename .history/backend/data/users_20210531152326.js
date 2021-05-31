import bcrypt from 'bcryptjs'


const users =[
    {
        name:'Admin user',
        email:'admin@mail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true

    },
    {
        name:'Maor Tal',
        email:'maor@mail.com',
        password:bcrypt.hashSync('123456',10),

    },
    {
        name:'Ben Linder',
        email:'ben@mail.com',
        password:bcrypt.hashSync('123456',10),

    }
]

export default users