import {
  createErrorNotification,
  createPositiveNotification,
} from "@/utils/notifications";
import PublicService from "@/views/bk_settings/services/Public.services";
import { reactive } from "vue";
import type {
  IAnswer,
  IClientQuestions,
  IGeneralSettings,
  IGerneralOptions,
  IPhoneSaving,
} from "./IGeneral";
import GeneralService from "./service/General.services";

export class GeneralSettings {
  private m_generalSettingInfo: IGeneralSettings | undefined = undefined;

  private m_generalOptions: IGerneralOptions | any = [];

  private _m_clientQuestions: Array<IClientQuestions> | undefined = undefined;

  private publicService: PublicService = new PublicService();
  private generalService: GeneralService = new GeneralService();

  private reader_settingsInfo: IGeneralSettings | undefined = undefined;

  constructor() {}

  /**
   * Getter m_clientQuestions
   * @return {Array<IClientQuestions> }
   */
  public get m_clientQuestions(): Array<IClientQuestions> {
    return this._m_clientQuestions!;
  }

  /**
   * Setter m_clientQuestions
   * @param {Array<IClientQuestions> } value
   */
  public set m_clientQuestions(value: Array<IClientQuestions>) {
    this._m_clientQuestions = value;
  }

  /**
   * Getter $m_generalSettingInfo
   * @return {IGeneralSettings }
   */
  public get $m_generalSettingInfo(): IGeneralSettings {
    return this.m_generalSettingInfo!;
  }

  /**
   * Getter $m_generalOptions
   * @return {IGerneralOptions }
   */
  public get $m_generalOptions(): IGerneralOptions {
    return this.m_generalOptions!;
  }

  /**
   * Setter $m_generalSettingInfo
   * @param {IGeneralSettings } value
   */
  public set $m_generalSettingInfo(value: IGeneralSettings) {
    this.m_generalSettingInfo = Object.assign(
      {},
      {
        enterpriseName: value.enterpriseName,
        language: value.language,
        currencyName: value.currencyName,
        //currencySymble: value.currencySymbol,
        phones: value.phones,
        id: value.id,
        urlIG: value.urlIG,
        urlFB: value.urlFB,
        answers: value.answers,
      }
    );
  }

  /**
   * Setter $m_generalOptions
   * @param {IGerneralOptions } value
   */
  public set $m_generalOptions(value: IGerneralOptions) {
    this.m_generalOptions = value;
  }

  async loadInfo() {
    this.m_generalSettingInfo =
      await this.generalService.getClientInformation();
    this.$m_generalSettingInfo = this.m_generalSettingInfo!;
    this.reader_settingsInfo = Object.assign({}, this.$m_generalSettingInfo);
    this.loadOptions();
    this._m_clientQuestions = await (
      await this.publicService.getClientQuestions()
    ).data;
    //TODO: CHECK THIS
    this.initializePhones();
  }

  initializePhones() {
    const emptyPhones = {
      isWspMain: false,
      compleateNumber: "",
      phone: 0,
      type: "",
      countryCode: 0,
    };
    if (this.m_generalSettingInfo?.phones!.length === 0) {
      this.m_generalSettingInfo!.phones = structuredClone([
        structuredClone(emptyPhones),
        structuredClone(emptyPhones),
      ]);
    }
    if (this.m_generalSettingInfo?.phones!.length === 1) {
      if (this.m_generalSettingInfo?.phones![0].isWspMain) {
        this.m_generalSettingInfo!.phones![0].compleateNumber =
          "+" +
          this.m_generalSettingInfo?.phones![0].countryCode.toString() +
          this.m_generalSettingInfo?.phones![0].phone.toString();
        this.m_generalSettingInfo!.phones!.push(emptyPhones);
      } else {
        this.m_generalSettingInfo!.phones!.unshift(emptyPhones);
        this.m_generalSettingInfo!.phones![1].compleateNumber =
          "+" +
          this.m_generalSettingInfo!.phones![1].countryCode.toString() +
          this.m_generalSettingInfo!.phones![1].phone.toString();
      }
    } else {
      this.m_generalSettingInfo!.phones = structuredClone(
        this.m_generalSettingInfo!.phones!.map((e) => {
          return {
            phone: e.phone,
            compleateNumber:
              "+" + e.countryCode.toString() + e.phone.toString(),
            type: e.type,
            countryCode: e.countryCode,
            isWspMain: e.isWspMain,
            id: e.id ?? undefined,
          };
        })
      );
    }
    // this.m_generalSettingInfo!.phones = Object.assign(
    //   [],
    //   [structuredClone(emptyPhones), structuredClone(emptyPhones)]
    // );
  }

  loadOptions() {
    this.$m_generalOptions.languageOptions = [
      "general-options-language-1",
      "general-options-language-2",
      "general-options-language-3",
    ];
    this.$m_generalOptions.currencyOptions = [
      "PEN",
      "USD",
      "EUR",
      "GBP",
      "JPY",
      "CNY",
      "AUD",
      "CAD",
      "CHF",
      "SEK",
    ];
  }

  async saveAnswers(p_answers: IGeneralSettings) {
    p_answers.phones = structuredClone(this.formatPhones(p_answers.phones!));
    //if (this.reader_settingsInfo?.answers !== p_answers.answers) {
    p_answers.answers = Object.assign(
      [],
      this.setAnswersWithoutDates(p_answers.answers)
    );
    //   }

    const response = await this.generalService.updateClient(
      p_answers,
      p_answers.id
    );
    this.showOperationNotification(
      response.status.toString(),
      "Guardado Correctamente",
      "Hubo un error al guardar"
    );
    await this.loadInfo();
  }

  formatPhones(p_phones: Array<IPhoneSaving>): Array<IPhoneSaving> {
    let phonesFormatted: Array<IPhoneSaving> = [];

    for (let i = 0; i < p_phones.length; i++) {
      phonesFormatted.push({
        countryCode: Number(p_phones[i].compleateNumber!.split(" ")[0]),
        phone: Number(
          p_phones[i].compleateNumber!.split(" ").slice(1).join("")
        ),
        type: i == 0 ? "MOB" : p_phones[i].type,
        isWspMain: i == 0,
        id: p_phones[i].id ?? undefined,
      });
    }
    return phonesFormatted;
  }

  formatAnswers(p_answers: Array<IAnswer>): Array<IAnswer> {
    let formattedAbswers: Array<IAnswer> = [];
    formattedAbswers.length = p_answers.length;
    //const arrayDifference = this.getDifferenceBetweenTwoArrays(this.settingInfoReader?.answers!, p_answers);
    for (let i = 0; i < p_answers.length; i++) {
      if (p_answers[i].answer) {
        formattedAbswers.push({
          answer: p_answers[i].answer.option ?? "",
          question: p_answers[i].question ?? "",
          questionCode: p_answers[i].questionCode ?? "",
          questionOptionCode: p_answers[i].answer.optionCode ?? "",
        });
      }
    }

    //console.log("this must be formatted: ->  ", formattedAbswers)
    //console.table(formattedAbswers);
    return formattedAbswers;
  }

  setAnswersWithoutDates(p_answers: Array<IAnswer>): Array<IAnswer> {
    return p_answers.map((e) => {
      return {
        question: e.question,
        questionCode: e.questionCode,
        questionOptionCode: e.questionOptionCode,
        answer: e.answer,
        id: e.id ?? undefined,
      };
    });
    //.filter((e) => e.answer !== "");
  }

  /**
   * It takes a string, checks if it starts with a 2, 4, or 5, and then calls a function based on the
   * result.
   * @param {string} state - string - the state of the operation
   * @param {string} positiveMessage - The message to be displayed when the operation is successful.
   * @param {string} negativeMessage - The message to be displayed when the operation fails.
   */
  public showOperationNotification(
    state: string,
    positiveMessage: string,
    negativeMessage: string
  ) {
    if (state.startsWith("2")) {
      createPositiveNotification(positiveMessage);
    } else if (state.startsWith("4") || state.startsWith("5")) {
      createErrorNotification(negativeMessage);
    }
  }
}

const generalSettings = reactive(new GeneralSettings());
export default generalSettings;
