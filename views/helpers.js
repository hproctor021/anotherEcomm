module.exports = {
    getError( errors, prop ){
        // prop = email, password or passwordConfirmation
        try {
            return errors.mapped()[prop].msg; 
            // errors are in an array, we map it (turns it into an object)
            // within each (now object) prop we access the msg corresponding to it
        } catch( err ){
            return '';
        }
        // to avoid having to use multiple if statements, we use a try catch
    }
}