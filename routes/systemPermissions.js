var express = require('express');
var router = express.Router();
const pool = require('../helpers/database');

// CRUD routes for systemPermissions table
// GET route to get all systemPermissions.
router.get('/getsystempermissions', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM system_permissions';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// GET route to get a systemPermissions by id.
router.get('/:id/getsystempermissionsbyid', async function(req, res) {
  try {
    const sqlQuery = 'SELECT * FROM system_permissions WHERE id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// POST route to create new systemPermissions.
// Since there can only ever be one user linked with one project sys_perms doesn't need its own id. To manage a user's permissions, we can just update the sys_perms table with the user's id and the project id. The user would click on their project and then be able to see the users on that project. They would then be able to click on a user and update their permissions. the permissions are as follows:
// has_read_access: true,
// can_create_project: true,
// can_edit_project: true,
// can_delete_project: true,
// can_create_multiple_projects: true,
// can_create_contractor_team_users: true,
// can_delete_contractor_team_user: true
// the commented out code here was a needless entry- values will be set later in the code using roles so we don't need to set them here- for now they're defaulting to true.
router.post('/createsystempermissions', async function(req, res) {
  try {
    const {user_id, project_id} = req.body;

    const sqlQuery = 'INSERT INTO system_permissions (user_id, project_id) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [user_id, project_id]);


    // const sqlQuery = 'INSERT INTO system_permissions (user_id, project_id, has_read_access, can_create_project, can_edit_project, can_delete_project, can_create_multiple_projects, can_create_contractor_team_users, can_delete_contractor_team_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    // const result = await pool.query(sqlQuery, [user_id, project_id, has_read_access, can_create_project, can_edit_project, can_delete_project, can_create_multiple_projects, can_create_contractor_team_users, can_delete_contractor_team_user]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

// PUT route to update a systemPermissions by id.


module.exports = router;