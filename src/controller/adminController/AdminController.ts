import { Request, Response } from 'express';
import { query } from '../../db';
import { User } from '../../models/User';

export const getAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM fetin_app."Admin"');
    
    if (result.rows.length > 0) {
      const admins: User[] = result.rows;
      res.status(200).json(admins);
    } else {
      res.status(404).json({ error: 'No admins found' });
    }
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
};