import Joi from "joi"

const isValidEmail = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(64512).required(),
        body: Joi.string().min(1).max(64512).required(),
        locale: Joi.string().required(),
        email: Joi.string().email({tlds: {allow: true}}).required(),
    });

    return schema.validate(data)
}

export default isValidEmail;