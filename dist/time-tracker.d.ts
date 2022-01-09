/// <reference types="node" />
import { LaunchOptions } from 'puppeteer';
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
export declare class TimeTracker {
    private page;
    init({ projectName, login, pass, config, basicAuth }: InitParams): Promise<void>;
    screenShot(path: any): Promise<Buffer>;
    setTime(issueNumber: string, hours: number, date: string): Promise<void>;
}
export {};
