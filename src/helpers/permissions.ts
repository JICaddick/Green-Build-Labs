// import { Pool } from 'pg';
// import { QueryResult } from 'pg';

// const pool = new Pool();

// interface User {
//   id: number;
//   role: string;
// }

// interface Permissions {
//   has_read_access: boolean;
//   can_create_project: boolean;
//   can_edit_project: boolean;
//   can_delete_project: boolean;
//   can_create_multiple_projects: boolean;
//   can_create_contractor_team_users: boolean;
//   can_delete_ct_user: boolean;
// }

// async function setPermissions() {
//   try {
//     // sqlGetUsers is a query that gets all users from the users table
//     const sqlGetUsers = 'SELECT id, role FROM users';
//     // the users variable is an array of objects. Each object is a user.
//     const { rows: users }: QueryResult<User> = await pool.query(sqlGetUsers);

//     for (const user of users) {
//       const userId = user.id;
//       const roleName = user.role;

//       let permissions: Permissions = {
//         has_read_access: false,
//         can_create_project: false,
//         can_edit_project: false,
//         can_delete_project: false,
//         can_create_multiple_projects: false,
//         can_create_contractor_team_users: false,
//         can_delete_ct_user: false
//       };

//       switch (roleName) {
//         case 'individual':
//           permissions = {
//             has_read_access: true,
//             can_create_project: true,
//             can_edit_project: true,
//             can_delete_project: true,
//             can_create_multiple_projects: false,
//             can_create_contractor_team_users: false,
//             can_delete_ct_user: false
//           };
//           break;

//         case 'contractor':
//           permissions = {
//             has_read_access: true,
//             can_create_project: true,
//             can_edit_project: true,
//             can_delete_project: true,
//             can_create_multiple_projects: true,
//             can_create_contractor_team_users: true,
//             can_delete_ct_user: true
//           };
//           break;

//         case 'contractor_team':
//           permissions = {
//             has_read_access: true,
//             can_create_project: false,
//             can_edit_project: false,
//             can_delete_project: false,
//             can_create_multiple_projects: false,
//             can_create_contractor_team_users: false,
//             can_delete_ct_user: false
//           };
//           break;
//       }

//       const sqlSetPermissions = `
//         UPDATE system_permissions 
//         SET 
//           has_read_access = ${permissions.has_read_access || false},
//           can_create_contractor_team_users = ${permissions.can_create_contractor_team_users || false},
//           can_create_project = ${permissions.can_create_project || false},
//           can_edit_project = ${permissions.can_edit_project || false},
//           can_delete_project = ${permissions.can_delete_project || false},
//           can_delete_ct_user = ${permissions.can_delete_ct_user || false},
//           can_create_multiple_projects = ${permissions.can_create_multiple_projects || false}
//         WHERE user_id = ${userId}
//       `;
//       await pool.query(sqlSetPermissions);
//     }
//     console.log('Permissions have been set for all roles');
//   } catch (error) {
//     console.error(error);
//   }
// }

// export { setPermissions };
