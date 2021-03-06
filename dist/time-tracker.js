"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTracker = void 0;
var puppeteer = require("puppeteer-core");
var jira_page_1 = require("./jira/jira.page");
var moment = require("moment");
var TimeTracker = /** @class */ (function () {
    function TimeTracker() {
    }
    TimeTracker.prototype.init = function (_a) {
        var projectName = _a.projectName, login = _a.login, pass = _a.pass, config = _a.config, basicAuth = _a.basicAuth;
        return __awaiter(this, void 0, void 0, function () {
            var browser, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch(config || {})];
                    case 1:
                        browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, browser.newPage()];
                    case 2:
                        _b.page = (_c.sent());
                        this.page.on('error', function (error) { return console.log(error); });
                        this.page.safelyClick = function (el) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.page.waitForSelector(el)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.page.click(el)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        this.page.safelyType = function (el, val) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.page.waitForSelector(el)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.page.type(el, val)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, this.page.setViewport({ width: 1366, height: 578 })];
                    case 3:
                        _c.sent();
                        if (!basicAuth) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.page.authenticate({ username: basicAuth.login, password: basicAuth.pass })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [4 /*yield*/, this.page.goto("https://jira.e-queo.net/projects/".concat(projectName))];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this.page.type(jira_page_1.JiraPage.loginForm.username, login)];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, this.page.type(jira_page_1.JiraPage.loginForm.password, pass)];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, this.page.click(jira_page_1.JiraPage.loginForm.submit)];
                    case 9:
                        _c.sent();
                        this.page.on('dialog', function (dialog) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, dialog.accept()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    TimeTracker.prototype.screenShot = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.screenshot({
                        path: path,
                    })];
            });
        });
    };
    TimeTracker.prototype.setTime = function (issueNumber, hours, date) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, day, month, year, monthName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.page.goto("https://jira.e-queo.net/browse/".concat(issueNumber))];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.page.safelyClick(jira_page_1.JiraPage.more.selector)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.page.safelyClick(jira_page_1.JiraPage.logwork.selector)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.page.safelyType(jira_page_1.JiraPage.logwork.time, "".concat(hours, "h"))];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.page.safelyClick(jira_page_1.JiraPage.logwork.timeinput)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.page.click(jira_page_1.JiraPage.logwork.timeinput, { clickCount: 3 })];
                    case 6:
                        _b.sent();
                        _a = date.split('.'), day = _a[0], month = _a[1], year = _a[2];
                        monthName = moment(date, 'DD.MM.YY').format('MMM');
                        return [4 /*yield*/, this.page.safelyType(jira_page_1.JiraPage.logwork.timeinput, "".concat(day, "/").concat(monthName, "/20").concat(year, " 01:00 PM"))];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.page.safelyClick(jira_page_1.JiraPage.logwork.submit)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.page.waitFor(1000)];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TimeTracker;
}());
exports.TimeTracker = TimeTracker;
var monthNames = {
    rus: {
        Jan: "Jan",
        Feb: "Feb",
        Mar: "Mar",
        Apr: "??????",
        May: "??????",
        Jun: "??????",
        Jul: "Jul",
        Aug: "Aug",
        Sep: "Sep",
        Oct: "Oct",
        Nov: "Nov",
        Dec: "Dec",
        apr: '??????',
        may: '??????',
        jun: '??????',
    },
    eng: {
        Jan: "Jan",
        Feb: "Feb",
        Mar: "Mar",
        Apr: "Apr",
        May: "May",
        Jun: "Jun",
        Jul: "Jul",
        Aug: "Aug",
        Sep: "Sep",
        Oct: "Oct",
        Nov: "Nov",
        Dec: "Dec",
    },
};
