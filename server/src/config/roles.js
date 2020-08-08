const roles = ['user', 'primeUser', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['videoCall', 'voiceCall', 'message']);
roleRights.set(roles[2], ['getUsers', 'manageUsers', 'manageRoles']);

module.exports = {
  roles,
  roleRights,
};
