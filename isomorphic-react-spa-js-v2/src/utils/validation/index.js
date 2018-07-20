/**
 * Функция для работы с валидацией
 * @param {string} mode - тип валидации
 * @param {string} target - что проверяем
 * @returns {boolean} - пройдена проверка или нет
 */

export class Validation {

    /*
     Массив с регулярными выражениями:
     0: строка                         ( mode === 'str' )
     1: число                          ( mode === '123' )
     2: латиница                       ( mode === 'lat' )
     3: кириллица                      ( mode === 'cyr' )
     4: латиница или кириллица         ( mode === 'lat/cyr' )
     5: эл. почта                      ( mode === 'email' )
     6: не пустое значение             ( mode === 'isNotEmpty' )
     7: телефон (рос. формат)          ( mode === 'phone' )
     8: латиница или цифры             ( mode === 'lat/123' )
     9: латиница, цифры, спец. символы ( mode === 'special' )
     10: url                           ( mode === 'url' )
     11: сложный пароль                ( mode === 'strongpass')
     12: eth address                   ( mode === 'eth')
     13: btc address                   ( mode === 'btc')
     */

    static rules = [
        /^[a-zA-Zа-яА-Я0-9-]*$/,
        /^[0-9]*$/,
        /^[a-zA-Z]*$/,
        /^[а-яА-Я]*$/,
        /^[a-zA-Zа-яА-Я]*$/,
        // /^[a-zA-Z0-9][-\._a-zA-Z0-9]+@(?:[a-zA-Z0-9][-a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}$/, // OLD
        // /^[a-zA-Z0-9-\._!#$%&'*+-/=?^`(){|}~]+@(?:[a-zA-Z0-9][-a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}$/, // OLD2
        /^[a-zA-Z0-9-\._!#$%&'*+-/=?^`(){|}~]+@(?:[a-zA-Z0-9]+\.)+[a-zA-Z]{2,6}$/,
        /([^\s])/,
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        /^[A-Za-z0-9]+$/,
        // /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, // OLD
        /^[a-zA-Z0-9!?@:;#_=+\-`~'"<>{|}\[\]().,\$%\^&\*]*$/,
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@:;#_=+\-`~'"<>{|}\[\]().,\$%\^&\*])(?=.{8,})/,
        /^(0x)?[0-9a-fA-F]{40}$/,
        /^[13][a-km-zA-HJ-NP-Z1-9]{25,33}$/
    ];

    static init(target, mode) {
        let re;
        let compare = false;
        switch (mode) {
            case 'str':
                re = Validation.rules[0];
                break;
            case '123':
                re = Validation.rules[1];
                break;
            case 'lat':
                re = Validation.rules[2];
                break;
            case 'cyr':
                re = Validation.rules[3];
                break;
            case 'lat/cyr':
                re = Validation.rules[4];
                break;
            case 'email':
                re = Validation.rules[5];
                break;
            case 'isNotEmpty':
                re = Validation.rules[6];
                break;
            case 'phone':
                re = Validation.rules[7];
                break;
            case 'lat/123':
                re = Validation.rules[8];
                break;
            case 'special':
                re = Validation.rules[9];
                break;
            case 'url':
                re = Validation.rules[10];
                break;
            case 'strongpass':
                re = Validation.rules[11];
                break;
            case 'eth':
                re = Validation.rules[12];
                break;
            case 'btc':
                re = Validation.rules[13];
                break;
            default:
                compare = true;
                break;
        }
        if (!compare) {
            return re.test(target);
        } else {
            if (target === mode) {
                return true;
            }
            return false;
        }
    }
}
