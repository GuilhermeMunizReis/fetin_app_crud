import { Request, Response } from 'express';
import { query } from '../db';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const result = await query('SELECT * FROM fetin_app."Student"');
  const users: User[] = result.rows;
  if (result != null){
    res.status(200).json(users);
  if (result == null) {
    res.status(500).json({ error: 'Failed to fetch users' });
    console.log("passei aqui")
  }
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  // const { name, registration, period, course, email, role } = req.body;
  // const newUser: User = { id,name, registration, period, course, email, role };

  // try {
  //   const insertQuery = `
  //     INSERT INTO users (name, registration, period, course, email, role)
  //     VALUES ($1, $2, $3, $4, $5, $6)
  //     RETURNING *`;
  //   const result = await query(insertQuery, [newUser.name, newUser.registration, newUser.period, newUser.course, newUser.email, newUser.role]);
  //   res.status(201).json(result.rows[0]);
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to create user' });
  // }

  console.log("passei aqui")
};

// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   const userId = parseInt(req.params.id);

//   try {
//     const selectQuery = 'SELECT * FROM users WHERE id = $1';
//     const result = await query(selectQuery, [userId]);

//     if (result.rows.length > 0) {
//       res.json(result.rows[0]);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// };

// export const updateUser = async (req: Request, res: Response): Promise<void> => {
//   const userId = parseInt(req.params.id);
//   const { name, registration, period, course, email, role } = req.body;

//   try {
//     const updateQuery = `
//       UPDATE users SET
//         name = $1,
//         registration = $2,
//         period = $3,
//         course = $4,
//         email = $5,
//         role = $6
//       WHERE id = $7
//       RETURNING *`;
//     const result = await query(updateQuery, [name, registration, period, course, email, role, userId]);
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// };

// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   const userId = parseInt(req.params.id);

//   try {
//     const deleteQuery = 'DELETE FROM users WHERE id = $1';
//     await query(deleteQuery, [userId]);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// };
