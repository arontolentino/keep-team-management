export default function hasPermissions(user, requiredPermissions) {
  if (
    user &&
    user.role &&
    user.role.permissions &&
    user.role.permissions.length &&
    requiredPermissions &&
    requiredPermissions.length
  ) {
    const userPermissions = user.role.permissions.map(
      (permission) => permission.name
    );

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );
  } else {
    return true;
  }
}
