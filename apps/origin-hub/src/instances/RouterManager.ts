import { NavigateFunction } from "react-router-dom";

export class RouterManager {
  public static navigate: NavigateFunction;
  public static setNavigate(nav: NavigateFunction) {
    this.navigate = nav;
  }
}
