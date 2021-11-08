import FilePickerTemplate from "./FilePickerTemplate";
import { ICreatable } from "../../../FormContentFactory/Creatable";
export class FilePicker implements ICreatable {
    create() {
        return FilePickerTemplate();
    };
};