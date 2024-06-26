const { register, login } = require('../super_admin/admin-controller')
const { DeleteOperator, updateOperator, addAdmin, getAdmins, resetPassword, changePassword } = require('../super_admin/operator-controller')
const { auth } = require('../jwt/jsonwebtoken')
const { roundStats, getBet } = require('../admin/bet')
const { loginOperator, selfOperator } = require('../admin/controller')
const { addUser, getUser, updateUser } = require('../user/controller')
const upload = require('../middleware/multer')
const { verifyUser, getWallet, updateWallet } = require('../wallet/controller')
const { validateBody } = require('../validate/controller')
const { loginData, addAdminValidate, addWallet } = require('../Schema/admin')

const routes = require('express').Router()


routes.get('/', async (req, res) => {
    res.send({ "msg": "Testing Successfully 👍" })
})

/**
 *  1. Oerator Routes
 *  2. User Routes
 * 
 * 
 */


// routes.get('/admin/operators', ()=>{});
// routes.post('/admin/operators', ()=>{});
// /**
//  * 1. Can reset passoword (Self and superadmin)
//  * 3. Can disable/Enable Operator (disable ALL API ASsosiated with the operator)
//  */
// routes.put('/admin/operators', ()=>{}); // Only Self for admin   
// routes.delete('/admin/operators', ()=>{}); // Soft Delete Only

// /**
//  * All admins can get update their API Credentials 
//  */
// routes.get('/admin/operators/:operatorId/api', ()=>{});
// routes.post('/admin/operators/:operatorId/api', ()=>{});  // Internal API for testing Will not be available
// /**
//  * 2. Can Generate API Credentials (Self and superadmin)
//  * 3. Can disable/Enable API
//  */
// routes.put('/admin/operators/:operatorId/api', ()=>{});  // Only Self for user
// routes.delete('/admin/operators/:operatorId/api', ()=>{}); // Soft Delete Only



// routes.post('/admin/login', ()=>{});


// routes.get('/admin/users', ()=>{});
// routes.post('/admin/users', ()=>{});  // Internal API for testing Will not be available
// routes.put('/admin/users', ()=>{});  // Only Self for user
// routes.delete('/admin/users', ()=>{}); // Soft Delete Only




routes.get('/user/login', () => { });


routes.post('/superAdmin/register', validateBody(loginData), register) // Register Super Admin
routes.post('/superAdmin/login', validateBody(loginData), login) // login super Admin
routes.post('/superAdmin/admin', validateBody(addAdminValidate), auth(['SUPERADMIN']), addAdmin) // super Admin add to admin
routes.get('/superAdmin/admin', auth(['SUPERADMIN']), getAdmins)  // super Admin find All Admin
routes.delete('/superAdmin/admin', auth(['SUPERADMIN']), DeleteOperator)  // super Admin Delete  admin
routes.put('/superAdmin/admin', auth(['SUPERADMIN', 'ADMIN']), updateOperator) // super Admin and Admin update  Admin data
routes.post('/admin/login', validateBody(loginData), loginOperator)  // login Admin 
routes.get('admin/bet', auth(['ADMIN']), getBet) // admin find bet data
//routes.get('/admin/round/stats', auth(['ADMIN']), roundStats) // Admin find  round stats data
routes.get('/admin/self/admin  ', auth(['ADMIN']), selfOperator) // Admin find Self Data
//routes.post('/admin/add/user', auth(['ADMIN']), addUser)  // admin Add to user
routes.post('/admin/reset/password', auth(['ADMIN']), resetPassword)  //super admin  and admin reset  password 
routes.post('/superAdmin/change/password', validateBody(loginData), auth(['SUPERADMIN']), changePassword)  //super admin  change password for admin 


routes.get('/admin/users', auth(['ADMIN']), getUser)
routes.post('/admin/users', upload.single("file", 1), auth(['ADMIN']), addUser);  // Internal API for testing Will not be available
routes.put('/admin/users', upload.single("file", 1), auth(['ADMIN']), updateUser);  // Only Self for user
routes.delete('/admin/users', auth(['ADMIN']), updateUser); // Soft Delete Only



routes.post('/admin/users/wallet', validateBody(addWallet), auth(['ADMIN']), verifyUser);
routes.get('/admin/users/wallet', auth(['ADMIN']), getWallet);
routes.put('/admin/users/wallet', auth(['ADMIN']), updateWallet);



// routes.post('/upload', async (req, res) => {
// // const [data] = await read.query("select id ,url from images")
//     // for(let x of req.files){

//     //        const {ETag ,ServerSideEncryption , Location , key , Key ,Bucket } =  await uploadImage(x) 
//     //      await read.query("INSERT INTO images(url) VALUES (?)" , [Location])
//     // }
//     // const {ETag ,ServerSideEncryption , Location , key , Key ,Bucket } =  await uploadImage(req.files)
//     res.send({img :'File uploaded successfully!'});
// });

module.exports = { routes }