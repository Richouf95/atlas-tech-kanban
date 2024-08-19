const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
});

userSchema.statics.signup = async function (email, name, pwd) {
    if (!email || !pwd || !name) {
        throw Error('All fields must be filled in!')
    }

    if (!validator.isEmail(email)) {
        throw Error('Incorrect email!')
    }

    if (!validator.isLength(name, { min: 2, max: undefined })) {
        throw Error('The name must contain at least 3 characters!')
    }

    if (!validator.isStrongPassword(pwd)) {
        throw Error("Le mot de passe n'est pas assez sécurisé ! Veuillez utiliser un mot de passe contenant au moins 8 caractères, avec une combinaison de lettres majuscules et minuscules, de chiffres et de caractères spéciaux.");
    }

    const emailInUse = await this.findOne({ email });

    if (emailInUse) {
        throw Error('The e-mail address is already in use!')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pwd, salt);

    const user = await this.create({ email, name, pwd: hash });

    return user;
}

userSchema.statics.signin = async function (email, pwd) {
    if (!email || !pwd) {
        throw Error('All fields must be filled in!');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect email!')
    }

    const machedPwd = await bcrypt.compare(pwd, user.pwd);

    if (!machedPwd) {
        throw Error('Incorrect password!')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
