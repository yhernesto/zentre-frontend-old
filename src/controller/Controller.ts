import { reactive } from "vue";

import type { IConfig, IMenuItem } from "@/controller/IController";
import User from "@/models/user/User";
import type { IEnvironment } from "@/controller/IController";

import { ROUTER_NAME } from "@/plugins/router";
import { EPeriod, getDaysFromPeriod, getRangesFromPeriod, type IDateRanges } from "@/utils/dates";

export enum ENVIRONMENT{
	HUB = "HUB",
	WEB = "WEB",
	ECOMMERCE = "ECOMMERCE",
	PAY = "PAY"
}

export class Controller {
	private _config: IConfig; 
	private _loadingConfig: boolean = true;

	private _drawer: boolean = false;
	private _miniState: boolean = window.innerWidth < 500;

	private _environment: ENVIRONMENT = ENVIRONMENT.PAY;

	private _period: EPeriod = EPeriod.WEEK;

	// TODO: this any is a temporal solution
	private m_user: User | any = reactive(new User());

	constructor() {
		this._config = {}
	}

	/**
	 * Getters / Setters
	 */
	get loadingConfig(): boolean {
		return this._loadingConfig;
	}
	set loadingConfig(value: boolean) {
		this._loadingConfig = value;
	}

	get drawer(): boolean {
		return this._drawer;
	}
	set drawer(value: boolean) {
		this._drawer = value;
	}

	get miniState(): boolean {
		return this._miniState;
	}
	set miniState(value: boolean){
		this._miniState = value;
	}

	public getConfig(): IConfig {
		return this._config
	}

	get user(): User{
		return this.m_user;
	}
	set user(p_user: User){
		this.m_user = p_user;
	}

	get environment(): ENVIRONMENT{
		return this._environment;
	}
	set environment(value: ENVIRONMENT){
		this._environment = value;
	}

	get period(): EPeriod {
		return this._period;
	}

	set period(value: EPeriod){
		this._period = value;
	}

	/**
	 * Methods
	 */
	// Method used for async functions
	public init(){
		// Do async calls and then set loading as false
		this.m_user.getProfile().finally(() => {
      this._loadingConfig = false;
    });
	}

	public get getMenu(): Array<IMenuItem> {
		return Controller.menu().filter((item) => item.environment?.filter((_env) => _env === this._environment).length)
	}

	public getDaysFromPeriod(): number {
		return getDaysFromPeriod(this._period)
	}

	public getRangesFromPeriod(): IDateRanges{
		return getRangesFromPeriod(this._period)
	}

	public static environments(): Array<IEnvironment>{
		return [
			{code: ENVIRONMENT.HUB, label: "toolbar-environment-hub", disabled: true},
			{code: ENVIRONMENT.WEB, label: "toolbar-environment-web", disabled: true},
			{code: ENVIRONMENT.ECOMMERCE, label: "toolbar-environment-ecommerce", disabled: true},
			{code: ENVIRONMENT.PAY, label: "toolbar-environment-pay"},
		]
	}

	private static menu(): Array<IMenuItem> {
		return [
		{code: ROUTER_NAME.LOGIN, },
		{code: ROUTER_NAME.DASHBOARD, environment: [ENVIRONMENT.WEB, ENVIRONMENT.PAY]},
		{code: ROUTER_NAME.PAYMENT, environment: [ENVIRONMENT.PAY]},
		// {code: ROUTER_NAME.ANALYTICS, environment: [ENVIRONMENT.HUB]},
		// {code: ROUTER_NAME.PAYMENT_LINK, environment: [ENVIRONMENT.PAY]},
		// {code: ROUTER_NAME.REPORTS, environment: [ENVIRONMENT.PAY]},
		{code: ROUTER_NAME.CLIENTS, environment: []},
		{code: ROUTER_NAME.ORDERS, environment: []},
		{code: ROUTER_NAME.MYPAGE, environment: []},
		{code: ROUTER_NAME.STATS, environment: []},
		{code: ROUTER_NAME.INVENTORY, environment: []},
		{code: ROUTER_NAME.PRODUCTS, environment: []},
		{code: ROUTER_NAME.HISTORIC, environment: []},
		{code: ROUTER_NAME.CHARTS, environment: []},
		{code: ROUTER_NAME.CONTENT, environment: [ENVIRONMENT.HUB, ENVIRONMENT.WEB, ENVIRONMENT.PAY]},
		// {code: ROUTER_NAME.APPEARANCE, environment: [ENVIRONMENT.HUB, ENVIRONMENT.WEB, ENVIRONMENT.PAY]},
		{code: ROUTER_NAME.SETTINGS, environment: [ENVIRONMENT.HUB, ENVIRONMENT.WEB, ENVIRONMENT.PAY], disabled: true},
		{code: ROUTER_NAME.ENTERPRISE, environment: [ENVIRONMENT.PAY]},
	]
	}
}

const appController = reactive( new Controller);
appController.init()
export default appController;