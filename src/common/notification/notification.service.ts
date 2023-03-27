import {Injectable} from "@angular/core";
import {Notyf} from "notyf";

@Injectable()
export class NotificationService {
  private readonly notyf:Notyf = new Notyf()

  success(message: string){
    return this.notyf.success(message);
  }

  error(message: string){
    return this.notyf.error(message);
  }
}
