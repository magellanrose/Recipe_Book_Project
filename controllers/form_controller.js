const User =require('../models/User')

module.exports = {
async createUser(req, res) {
    try {
        const user = await User.create(req.body);
    
        req.session.user_id = user.id;
    
        res.redirect('/');
      } catch (err) {
        const messages = err.errors.map(eObj => eObj.message);
    
        req.session.errors = messages;
    
        console.log(err);
    
        res.redirect('/register');
      }
},

async loginUser(req,res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
  
      // User is not found
      if (!user) {
        req.session.errors = ['A user with that email address does not exist'];
  
        return res.redirect('/register');
      }
  
      // Validate their password
      const valid_pass = await user.validatePass(password);
  
      if (!valid_pass) {
        req.session.errors = ['Password is invalid'];
        return res.redirect('/login');
      }
  
      req.session.user_id = user.id;
  
      res.redirect('/');
    } catch (err) {
      let messages;

      if (err.errors) {
        messages = err.errors.map(eObj => eObj.message);
      }

      messages = [err.message];

      console.log(err);
  
      req.session.errors = messages;
  
      res.redirect('/login');
    }
  
},

async createRecipe(req, res) {
    try {
        await Recipe.create(req.body);

        res.redirect('/?recipe_added=true');
    } catch (error) {
        console.log(err);
        res.redirect('/create/recipe');
    }
}

}