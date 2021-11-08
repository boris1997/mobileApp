import { CameraTemplate } from "./CameraTemplate";
import { ICreatable } from "../../FormContentFactory/Creatable";
export class Camera implements ICreatable {
  create() {
    return CameraTemplate();
  }
}
