import ButtonTemplate from "./ButtonTemplate";
import { ICreatable } from "./Creatable";

type ButtonOptions = {
  title: string;
};

export default class Button implements ICreatable {

  private options: ButtonOptions;
  
  constructor(props: ButtonOptions) {
    this.options = props;
  }

  public create() {
    return ButtonTemplate(this.options.title);
  }
}
