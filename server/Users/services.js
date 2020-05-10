const {
    Users
} = require('../data');

const {
    generateToken,
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const getAll = async () => {
    return await Users.find();
};

const add = async (username, password, email) => {
    const hashedPassword = await hash(password);
    // const role = username === 'admin' ? 'admin' : 'user';
	var role = 'user';
	if(username === 'admin'){
		role = 'admin';
	}
	if(username === 'technician'){
		role = 'tech';
	}
    const user = new Users({
        username,
        password: hashedPassword,
        role,
		email
    });
    await user.save();
};

const authenticate = async (login_option, password) => {

    var user = await Users.findOne({ username: login_option });
	// console.log(user);
	if (user === null){
		user = await Users.findOne( {email : login_option});
		//user = user_by_email;
	}
	// console.log("am gasit dupe email");
	console.log(user);
	
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${login_option} nu exista!`, 404);
    }
    
    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role
        });
    } 
    throw new ServerError("Combinatia de username/email si parola nu este buna!", 404);
};

module.exports = {
    add,
    authenticate,
	getAll
}