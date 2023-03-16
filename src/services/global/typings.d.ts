declare namespace Common {
  interface MeApi {
    data: Me;
    msg: string;
  }

  interface Me {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    tel?: string;
    user_status?: number;
    permissions?: Array<Permissions>;
    permission?: Array<any>;
  }

  interface Permissions {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
  }
}
