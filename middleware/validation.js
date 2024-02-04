const isValidPhone = function (num) {
    const reg = /^[0-9]{10}$/;
    return reg.test(String(num));
}

const IsValidDate = function (date) {
    const dateregex = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    return dateregex.test(String(date));

}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/;
    return re.test(String(email).toLowerCase());
}

const captilize = function (str) {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

module.exports = {isValidEmail, captilize, isValidPhone, IsValidDate }
