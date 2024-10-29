import { search } from "@/services/api/user.ts";

export class UserServiceManager {
  private constructor() {}
  // public static shared = new AuthServiceManager();
  public static search = search;
}
