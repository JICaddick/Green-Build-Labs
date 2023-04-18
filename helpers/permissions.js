const pool = require('../helpers/database');

// permissions.js file is a function that takes a user ID and returns an object with the user's permissions. It will update the user's permissions in the database. When a user is added to the users table, the permissions for that user will be set to the default permissions for that user's role. When a user's role is changed, the permissions for that user will be updated to the default permissions for that user's new role. The system_permissions table takes a project_id, user_id, and then a list of permissions. The permissions are boolean values. The permissions are:
// has_read_access
// can_create_project
// can_edit_project
// can_delete_project
// can_create_multiple_projects
// can_create_contractor_team_users
// can_delete_ct_user

// What params are needed here? users_id and users_role? ********
// Can system_permissions take a user_id without a project_id? Can project_id be a null value or would we have to create a project/assign a user a project when they're created? ******** Will need a user_id and a project_id to set permissions. (Needs params) ********
async function setPermissions() {
  try {
    //sqlGetUsers is a query that gets all users from the users table
    const sqlGetUsers = 'SELECT id, role FROM users';
    // the users variable is an array of objects. Each object is a user.
    const users = await pool.query(sqlGetUsers);
    // user of users is an object with the user's id and role and comes from the users table. 
    // Should user.id & user.role be users.id and users.role?********
    for (const user of users) {
      const userId = user.id;
      const roleName = user.role;
      
      let permissions = {};

      switch (roleName) {
        case 'individual':
          permissions = {
            has_read_access: true,
            can_create_project: true,
            can_edit_project: true,
            can_delete_project: true,
            can_create_multiple_projects: false,
            can_create_contractor_team_users: false,
            can_delete_ct_user: false
          };
          break;

        case 'contractor':
          permissions = {
            has_read_access: true,
            can_create_project: true,
            can_edit_project: true,
            can_delete_project: true,
            can_create_multiple_projects: true,
            can_create_contractor_team_users: true,
            can_delete_ct_user: true
          };
          break;

        case 'contractor_team':
          permissions = {
            has_read_access: true,
            can_create_project: false,
            can_edit_project: false,
            can_delete_project: false,
            can_create_multiple_projects: false,
            can_create_contractor_team_users: false,
            can_delete_ct_user: false
          };
          break;
      }

      const sqlSetPermissions = `
      UPDATE system_permissions 
      SET 
        has_read_access = ${permissions.has_read_access || false},
        can_create_contractor_team_users = ${permissions.can_create_contractor_team_users || false},
        can_create_project = ${permissions.can_create_project || false},
        can_edit_project = ${permissions.can_edit_project || false},
        can_delete_project = ${permissions.can_delete_project || false},
        can_delete_ct_user = ${permissions.can_delete_ct_user || false},
        can_create_multiple_projects = ${permissions.can_create_multiple_projects || false}
      WHERE user_id = ${userId}
    `;
      await pool.query(sqlSetPermissions);
    }
    console.log('Permissions have been set for all roles');
  } catch (error) {
    console.error(error);
  }
}

//setPermissions(); Using setPermissions here would run the function when the server starts and we don't want to do that. It should run when a user is created/ updated so we'll export it and call it in user.js 

module.exports = { setPermissions };