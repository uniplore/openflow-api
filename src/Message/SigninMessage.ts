import { WebSocketClient } from "..";
import { TokenUser } from "../nodeclient/TokenUser";
export type RenewTokenOptions = {
    jwt?: string,
    priority?: number,
    longtoken?: boolean,
    clientagent?: string,
    clientversion?: string,
    validate_only?: boolean,
}
export class RenewTokenDefaults {
    public priority: number = 2;
    public longtoken: boolean = false;
    public validate_only: boolean = true;
}
export type GetTokenFromSAMLOptions = {
    jwt?: string,
    priority?: number,
    longtoken?: boolean,
    clientagent?: string,
    clientversion?: string,
    validate_only?: boolean,
    rawAssertion: string
}
export class GetTokenFromSAMLDefaults {
    public priority: number = 2;
    public longtoken: boolean = false;
    public validate_only: boolean = true;
}
export type SigninWithTokenOptions = {
    jwt?: string,
    priority?: number,
    longtoken?: boolean,
    clientagent?: string,
    clientversion?: string,
    validate_only?: boolean,
    rawAssertion?: string,
    impersonate?: string,
}
export class SigninWithTokenDefaults {
    public priority: number = 2;
    public longtoken: boolean = false;
    public validate_only: boolean = false;
}
export type SigninWithUsernameOptions = {
    jwt?: string,
    priority?: number,
    longtoken?: boolean,
    clientagent?: string,
    clientversion?: string,
    validate_only?: boolean,
    impersonate?: string,
    username: string,
    password: string,
}
export class SigninWithUsernameDefaults {
    public priority: number = 2;
    public longtoken: boolean = false;
    public validate_only: boolean = false;
}

export class SigninMessage {
    public static parserenew(options: RenewTokenOptions): [SigninMessage, number] {
        const defaults = new RenewTokenDefaults();
        const priority = (options.priority ? options.priority : defaults.priority);
        const q: SigninMessage = Object.assign(defaults, options) as any;
        if (!q.clientagent || q.clientagent == "") q.clientagent = WebSocketClient.instance.agent;
        if (!q.clientversion || q.clientversion == "") q.clientagent = WebSocketClient.instance.version;
        q.clientversion = WebSocketClient.instance.version;
        return [q, priority];
    }
    public static parsefromsaml(options: GetTokenFromSAMLOptions): [SigninMessage, number] {
        const defaults = new GetTokenFromSAMLDefaults();
        const priority = (options.priority ? options.priority : defaults.priority);
        const q: SigninMessage = Object.assign(defaults, options) as any;
        if (!q.clientagent || q.clientagent == "") q.clientagent = WebSocketClient.instance.agent;
        if (!q.clientversion || q.clientversion == "") q.clientagent = WebSocketClient.instance.version;
        q.clientversion = WebSocketClient.instance.version;
        return [q, priority];
    }
    public static parsesigninwithtoken(options: SigninWithTokenOptions): [SigninMessage, number] {
        const defaults = new SigninWithTokenDefaults();
        const priority = (options.priority ? options.priority : defaults.priority);
        const q: SigninMessage = Object.assign(defaults, options) as any;
        q.realm = "browser";
        if (this.isNodeJS()) q.realm = "nodejs";
        if (!q.clientagent || q.clientagent == "") q.clientagent = WebSocketClient.instance.agent;
        if (!q.clientversion || q.clientversion == "") q.clientagent = WebSocketClient.instance.version;
        q.onesignalid = WebSocketClient.instance.oneSignalId;
        q.device = WebSocketClient.instance.device;
        q.gpslocation = WebSocketClient.instance.location;
        if (WebSocketClient.instance.usingCordova) {
            q.realm = "mobile";
            q.clientagent = "mobileapp";
        }
        return [q, priority];
    }
    public static parsesigninwithpassword(options: SigninWithUsernameOptions): [SigninMessage, number] {
        const defaults = new SigninWithUsernameDefaults();
        const priority = (options.priority ? options.priority : defaults.priority);
        const q: SigninMessage = Object.assign(defaults, options) as any;
        q.realm = "browser";
        if (this.isNodeJS()) q.realm = "nodejs";
        if (!q.clientagent || q.clientagent == "") q.clientagent = WebSocketClient.instance.agent;
        if (!q.clientversion || q.clientversion == "") q.clientagent = WebSocketClient.instance.version;
        q.onesignalid = WebSocketClient.instance.oneSignalId;
        q.device = WebSocketClient.instance.device;
        q.gpslocation = WebSocketClient.instance.location;
        if (WebSocketClient.instance.usingCordova) {
            q.realm = "mobile";
            q.clientagent = "mobileapp";
        }
        return [q, priority];
    }
    public static isNodeJS(): boolean {
        if (typeof process === 'object' && process + '' === '[object process]') {
            return true;
        }
        return false;
    }
    public error: string;

    public username: string;
    public password: string;
    // tslint:disable-next-line: variable-name
    public validate_only: boolean = false;
    public clientagent: string;
    public clientversion: string;
    public user: TokenUser;
    public jwt: string;
    public rawAssertion: string;
    public longtoken: boolean = false;
    // tslint:disable-next-line: variable-name
    public supports_watch: boolean = false;

    public realm: string;
    public impersonate: string;
    public onesignalid: string;
    public device: any;
    public gpslocation: any;
    public firebasetoken: string;
    // tslint:disable-next-line: variable-name
    public websocket_package_size: number;
    public openflow_uniqueid: string;
    public enable_analytics: boolean;
    public otel_trace_url: string;
    public otel_metric_url: string;
    public otel_trace_interval: number;
    public otel_metric_interval: number;

    static assign(o: any): SigninMessage {
        if (typeof o === 'string' || o instanceof String) {
            return Object.assign(new SigninMessage(), JSON.parse(o.toString()));
        }
        return Object.assign(new SigninMessage(), o);
    }
}