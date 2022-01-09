import {
    LaunchOptions,
    Page,
} from 'puppeteer';
import * as puppeteer from 'puppeteer-core';
import { JiraPage } from './jira/jira.page';
import * as moment from 'moment';

interface InitParams {
    projectName: string;
    login: string;
    pass: string;
    config: LaunchOptions;
    basicAuth: {
        login: string;
        pass: string;
    };
}

export class TimeTracker {

    private page: PageSafe;

    async init({projectName, login, pass, config, basicAuth}: InitParams) {
        const browser = await puppeteer.launch(config || {});
        this.page = await browser.newPage() as PageSafe;
        this.page.on('error', (error) => console.log(error));
        this.page.safelyClick = async (el) => {
            await this.page.waitForSelector(el);
            await this.page.click(el);
        };
        this.page.safelyType = async (el, val) => {
            await this.page.waitForSelector(el);
            await this.page.type(el, val);
        };
        await this.page.setViewport({width: 1366, height: 578});
        if (basicAuth) {
            await this.page.authenticate({username: basicAuth.login, password: basicAuth.pass});
        }
        await this.page.goto(`https://jira.e-queo.net/projects/${projectName}`);
        await this.page.type(JiraPage.loginForm.username, login);
        await this.page.type(JiraPage.loginForm.password, pass);
        await this.page.click(JiraPage.loginForm.submit);
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async screenShot(path) {
        return this.page.screenshot({
            path,
        });
    }

    async setTime(issueNumber: string, hours: number, date: string) {
        await this.page.goto(`https://jira.e-queo.net/browse/${issueNumber}`);
        await this.page.safelyClick(JiraPage.more.selector);
        await this.page.safelyClick(JiraPage.logwork.selector);
        await this.page.safelyType(JiraPage.logwork.time, `${hours}h`);
        await this.page.safelyClick(JiraPage.logwork.timeinput);
        await this.page.click(JiraPage.logwork.timeinput, {clickCount: 3});
        const [day, month, year] = date.split('.');
        const monthName = moment(date, 'DD.MM.YY').format('MMM');
        await this.page.safelyType(JiraPage.logwork.timeinput, `${day}/${monthName}/20${year} 01:00 PM`);
        await this.page.safelyClick(JiraPage.logwork.submit);
        await this.page.waitFor(1000);
    }
}

const monthNames = {
    rus: {
        Jan: "Jan",
        Feb: "Feb",
        Mar: "Mar",
        Apr: "апр",
        May: "мая",
        Jun: "июн",
        Jul: "Jul",
        Aug: "Aug",
        Sep: "Sep",
        Oct: "Oct",
        Nov: "Nov",
        Dec: "Dec",
        apr: 'апр',
        may: 'мая',
        jun: 'июн',
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

interface PageSafe extends Page {
    safelyClick(el);
    safelyType(el, val);
}
