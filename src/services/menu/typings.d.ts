/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace User {
  interface UserListApi {
    data: UserList;
    msg: string;
  }

  interface UserList {
    page?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface UserInfo {
    id?: number;
    username?: string;
    name?: string;
    tel?: string;
    email?: string;
    user_status?: number;
    permissions?: any;
    created_at?: string;
  }
}