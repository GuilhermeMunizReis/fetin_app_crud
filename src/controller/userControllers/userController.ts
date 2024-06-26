import { Request, Response } from 'express';
import { query, pool } from '../../db';
import { User } from '../../models/User';


export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM fetin_app."Student"');
    const users: User[] = result.rows;
    
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'No users found' });
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserByName = async (req: Request, res: Response): Promise<void> => {
  const userName: string = req.params.name; 
  const selectQuery = `
  SELECT name FROM fetin_app."Student" 
  WHERE name = '{$1}'
  `;

  try {
    const result = await pool.query(selectQuery, ['[Alice]']);
    const users: User[] = result.rows;
    res.status(500).json({ error: 'Failed to fetch users', userName });
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getStudentTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT a.* FROM fetin_app."Student" a JOIN fetin_app."StudentsInTeam" b ON b.team_id = 1 AND a."ID" = b.student_id ORDER BY a.name');
    const users: User[] = result.rows;

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'No users found in teams' });
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, registration, email, period, course, role } = req.body;
  const insertQuery = `
  INSERT INTO fetin_app."Student" (name, registration, period, course, email, role)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;
  try {
    const result = await query(insertQuery, [ name, registration, email, period, course, role ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

