import { ref, type Ref } from "vue";
import type { ICardFormWrapper } from "./ICardFormWrapper";

export class CCardFormWrapper implements ICardFormWrapper {
  private _title: Ref<string | undefined>  = ref(undefined);
  private _description: Ref<string | undefined>  = ref(undefined);
  private _display: Ref<boolean | undefined> = ref(undefined);

  private _edited: Ref<boolean> = ref(false);
  private _loading: Ref<boolean | undefined> = ref(undefined);

  constructor(config: ICardFormWrapper){
    this._title.value = config.title
    this._description.value = config.description
    this._display.value = config.display
    this._loading.value = config.loading
  }

  get title(): string | undefined{
    return this._title.value
  }
  set title(value: string | undefined){
    this._edited.value = true;
    this._title.value = value
  }

  get description(): string | undefined{
    return this._description.value
  }
  set description(value: string | undefined){
    this._edited.value = true;
    this._description.value = value
  }

  get display(): boolean | undefined{
    return this._display.value
  }
  set display(value: boolean | undefined){
    this._edited.value = true;
    this._display.value = value
  }

  get edited(): boolean {
    return this._edited.value;
  }
  set edited(value: boolean){
    this._edited.value = value
  }

  get loading(): boolean | undefined{
    return this._loading.value
  }
  set loading(value: boolean | undefined){
    this._loading.value = value
  }

}