export default (initialState: Common.Me) => {
  const UserList = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:list')
  );
  const UserAdd = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:add')
  );
  const UserUpdate = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:update')
  );
  const UserChangeStatus = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:change-status')
  );
  const UserPermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:permissions')
  );
  const UserMenu = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:menu')
  );
  const UserCreatePermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:create-permissions')
  );
  const UserModifyPermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:modify-permissions')
  );
  const UserDataPermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:data-permissions')
  );
  const UserCopyUser = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:copy-user')
  );
  const UserInfo = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:info')
  );

  const MenuList = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('menu:list')
  );
  const MenuAdd = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('menu:add')
  );
  const MenuUpdate = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('menu:update')
  );
  const MenuDelete = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('menu:delete')
  );

  const PermissionList = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('permission:list')
  );
  const PermissionTree = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('permission:tree')
  );
  const PermissionAdd = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('permission:add')
  );
  const PermissionUpdate = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('permission:update')
  );
  const PermissionDelete = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('permission:delete')
  );
  const PermissionAddRoute = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('permission:add-route')
  );
  const RouteList = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('route:list')
  );
  const RouteAdd = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('route:add')
  );
  const RouteUpdate = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('route:update')
  );
  const RouteDelete = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('route:delete')
  );

  return {
    UserList,
    UserAdd,
    UserUpdate,
    UserChangeStatus,
    UserPermission,
    UserMenu,
    UserCreatePermission,
    UserModifyPermission,
    UserDataPermission,
    UserCopyUser,
    UserInfo,
    MenuList,
    MenuAdd,
    MenuUpdate,
    MenuDelete,
    PermissionList,
    PermissionTree,
    PermissionAdd,
    PermissionUpdate,
    PermissionDelete,
    RouteList,
    RouteAdd,
    RouteUpdate,
    RouteDelete,
    //权限绑定路由
    PermissionAddRoute,
  };
};
