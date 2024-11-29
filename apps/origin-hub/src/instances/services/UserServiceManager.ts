import { getUserProfile } from "@/services/api/user.ts";

export class UserServiceManager {
  private constructor() {}
  public static getUserProfile = getUserProfile;
}
