const regexUsername = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,10}/

export default function validate(inputs) {
    var errors = {};
    if (!inputs.email) {
        errors.email = "No puedes dejar el email vacio"
    }
    else if (!regexUsername.test(inputs.email)) {
        errors.email = "El email debe ser un correo electronico"
    }
    else if (inputs.email.length > 35) {
        errors.email = "El email no puede tener mas de 35 caracteres"
    }
    if (!inputs.username) {
        errors.username = "No puedes dejar el nombre vacio"
    }
    else if (inputs.username.length > 15 || inputs.username.length < 3) {
        errors.email = "el nombre debe tener entre 3 y 15 caracteres"
    }
    else if (!inputs.password) {
        errors.password= "El password no puede quedar vacio"
    }
    else if (!regexPassword.test(inputs.password)) {
        errors.password = "El password debe tener: mayusculas, minusculas, numero, un caracter especial y no ser menor de 6 caracteres ni mayor de 10"
    }

    return errors
}