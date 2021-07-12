const layout = require('../layout');

const getError = ( errors, prop ) => {
    // prop = email, password or passwordConfirmation
    try {
        return errors.mapped()[prop].msg; 
        // errors are in an array, we map it (turns it into an object)
        // within each (now object) prop we access the msg corresponding to it
    } catch( err ){
        return ''
    }
    // to avoid having to use multiple if statements, we use a try catch
}

module.exports = ({ req, errors }) => {
   return layout({ 
       content: `
            <div>
            Your id is: ${req.session.userId}
                <form method="POST">
                    <input name="email" placeholder="email" />
                    ${getError(errors, 'email')}
                    <input name="password" placeholder="password" />
                    ${getError(errors, 'password')}
                    <input name="passwordConfirmation" placeholder="password confirmation" />
                    ${getError(errors, 'passwordConfirmation')}
                    <button>Sign Up</button>
                </form>
            </div>
    ` 
    });
};