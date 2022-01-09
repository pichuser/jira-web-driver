"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraPage = void 0;
var JiraPage = /** @class */ (function () {
    function JiraPage() {
    }
    JiraPage.loginForm = {
        username: '#login-form-username',
        password: '#login-form-password',
        submit: '#login-form-submit',
    };
    JiraPage.more = {
        selector: '#opsbar-operations_more',
        logwork: '',
    };
    JiraPage.logwork = {
        selector: '#log-work > a',
        time: '#log-work-time-logged',
        timeinput: '#log-work-date-logged-date-picker',
        submit: '#log-work-submit',
    };
    return JiraPage;
}());
exports.JiraPage = JiraPage;
