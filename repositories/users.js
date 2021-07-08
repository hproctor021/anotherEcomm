const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {

    constructor(filename){
        if( !filename ){
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            fs.access.Sync(this.filename)
        } catch (error) {
            fs.writeFileSync(this.filename, '[]')
        }
        // we can use these Sync methods because we are only creating ONE UsersRepository,
        // so it won't effect performance much to wait for response from these methods b/f moving on
    
    }

    async getAll(){
        // open file called this.filename
        return JSON.parse(
            await fs.promises.readFile(this.filename, 
                { encoding: 'utf8' }
            )
        );
    }

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

    async writeAll(records){
        await fs.promises.writeFile(
            this.filename, 
            JSON.stringify(records, null, 2)
        );
        // 2nd argument is a formatter
        // 3rd is the level of indentation (when number) to use inside of created string
        
    }
    

    randomId(){
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id){
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id){
        const records = await this.getAll();
        const filteredRecords = records.filter( record => record.id !== id );
        await this.writeAll(filteredRecords);
    }

    async update(id, attrs){
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if( !record ){
            throw new Error(`Record with id ${id} could not be found`)
        }

        Object.assign(record, attrs)
            await this.writeAll(records)
        // a way to update ALL of the records 
    }

    // async getOneBy(filters){
    //     const records = await this.getAll();

    //     return records.find( record => {
    //         for( let key in filters ){
    //             if( record[key] !== filters[key] ) return false;
    //         }
    //         return true;
    //     })
    // }

    async getOneBy(filters) {
        const records = await this.getAll();
    
        for (let record of records) {
          let found = true;
    
          for (let key in filters) {
            if (record[key] !== filters[key]) {
              found = false;
            }
          }
    
          if (found) {
            return record;
          }
        }
      }
};


module.exports = new UsersRepository('users.json');
