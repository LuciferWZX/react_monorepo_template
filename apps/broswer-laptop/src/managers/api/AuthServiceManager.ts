import { login, profile } from "@/services/api/auth.ts";

export class AuthServiceManager {
  private constructor() {}
  public static shared = new AuthServiceManager();
  public static login = login;
  public static profile = profile;
}
