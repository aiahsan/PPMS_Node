const response=require('../response');

const validate = (schema) => async (req, res, next) => {

  console.log(req.body)
      try {
      await schema.validate({
        body: req.body,
      });
      return next();
    } catch (err) {
       return res.status(500).json(response(false,err.message,{}))
    }
  };

  module.exports = validate;