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
    initialState.permission.includes('user:permission')
  );
  const UserMenu = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:menu')
  );
  const UserCreatePermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:create-permission')
  );
  const UserModifyPermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:modify-permission')
  );
  const UserDataPermission = !!(
    initialState &&
    initialState.permission &&
    initialState.permission.includes('user:data-permission')
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
  };
};
