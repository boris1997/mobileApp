import DurationTemplate from "./DurationTemplate";
import { ICreatable } from "../../../FormContentFactory/Creatable";

type DurationOptions = {
  format: string;
  accessType: string;
  readonlyValue?: string;
};

export class Duration implements ICreatable {
  options: DurationOptions;

  constructor(options: DurationOptions) {
    this.options = options;
  }
  create() {
    return DurationTemplate({
      format: this.options.format,
      accessType: this.options.accessType,
      readOnlyValue: this.options.readonlyValue,
    });
  }
}
