"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadi18n = exports.changeLanguage = exports.useTranslation = exports.I18nextProvider = exports.i18n = void 0;
const i18next_1 = __importDefault(require("i18next"));
exports.i18n = i18next_1.default;
const react_i18next_1 = require("react-i18next");
Object.defineProperty(exports, "I18nextProvider", { enumerable: true, get: function () { return react_i18next_1.I18nextProvider; } });
Object.defineProperty(exports, "useTranslation", { enumerable: true, get: function () { return react_i18next_1.useTranslation; } });
const translations_1 = __importDefault(require("./src/locales/en/translations"));
const translations_2 = __importDefault(require("./src/locales/pt-br/translations"));
const loadi18n = (obj) => obj;
exports.loadi18n = loadi18n;
i18next_1.default.use(react_i18next_1.initReactI18next).init({
    fallbackLng: 'pt-BR',
    lng: 'pt-BR',
    resources: {
        'pt-BR': {
            translations: translations_2.default,
            translate: () => loadi18n,
            common: {
                en: 'hahahahaahh'
            }
        },
        en: {
            translations: translations_1.default,
            translate: () => loadi18n,
            common: {
                en: 'aaaaaaa'
            }
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});
i18next_1.default.languages = ['pt-BR', 'en'];
function changeLanguage(lng) {
    return i18next_1.default.changeLanguage(lng);
}
exports.changeLanguage = changeLanguage;
//# sourceMappingURL=index.js.map