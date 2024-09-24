import { login } from "@/services/api/auth.ts";

export class AuthServiceManager {
  private constructor() {}
  public static shared = new AuthServiceManager();
  public static login = login;
}
