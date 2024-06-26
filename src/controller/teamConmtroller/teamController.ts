import { Request, Response } from 'express';
import { query } from '../../db';
import { User } from '../../models/User';

export const getTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM fetin_app."Team"');
    
    if (result.rows.length > 0) {
      const users: User[] = result.rows;
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'No teams found' });
    }
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

export const geAllUsers = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id; 
  const selectQuery = 'SELECT a.*, b FROM fetin_app."Student" a JOIN fetin_app."StudentsInTeam" b ON b.team_id = $1 AND a."ID" = b.student_id ORDER BY a.name';
  try {
    
    const result = await query(selectQuery,[id])
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