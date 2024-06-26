import { Request, Response } from 'express';
import { query } from '../../db';
import { User } from '../../models/User';

export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  const result = await query('SELECT * FROM fetin_app."Admin"');
  const users: User[] = result.rows;
  if (result != null){
    res.status(200).json(users);
  if (result == null) {
    res.status(500).json({ error: 'Failed to fetch users' });
    console.log("passei aqui")
  }
  }
};