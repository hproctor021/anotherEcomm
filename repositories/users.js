const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
// allows UsersRepository to have access to all Repository functions 
// + the ability to add in or slightly alter them to fit

    async create(attrs){
        // attrs === { email: '', password: '' }

        attrs.id = this.randomId();
        // creates a randomized id for the created user

        const salt = crypto.randomBytes(8).toString('hex');
        const buff = await scrypt(attrs.password, salt, 64);


        const records = await this.getAll();
        const record = { 
            ...attrs,
            password: `${buff.toString('hex')}.${salt}`
        };
        // ... says to create a new object, take all properties out of attrs object & overwrite 
        // those existing properties with this instead (which is the password PLUS the salt we created)
        records.push(record);

        await this.writeAll(records);

        return attrs;
        // this will return the created user's attributes to be used to create a cookie for them
    };


    async comparePasswords(saved, supplied){
        // saved --> password saved in our db 'hashed.salt'
        // supplied --> password given by user trying to login
        const [hashed, salt] = saved.split('.');
        const hashSuppliedBuff = await scrypt(supplied, salt, 64)
        
        return hashed === hashSuppliedBuff.toString('hex');

    };

};


module.exports = new UsersRepository('users.json');
