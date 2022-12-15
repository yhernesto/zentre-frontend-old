import type { ROUTER_NAME } from "@/plugins/router";
import type { ENVIRONMENT } from "./Controller";

export interface IConfig {
 // Config params
}

export interface IEnvironment {
	code: ENVIRONMENT;
	label: string;
	disabled?: boolean;
}

export interface IMenuItem {
	code: ROUTER_NAME;
	environment?: Array<string>;
	disabled?: boolean;
}
