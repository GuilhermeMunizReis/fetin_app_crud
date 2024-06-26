import { Request, Response } from 'express';
import { query } from '../../db';
import { User } from '../../models/User';

export const getAdvisor = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT * FROM fetin_app."Advisor"');
    
    if (result.rows.length > 0) {
      const advisors: User[] = result.rows;
      res.status(200).json(advisors);
    } else {
      res.status(404).json({ error: 'No advisors found' });
    }
  } catch (error) {
    console.error('Failed to fetch advisors:', error);
    res.status(500).json({ error: 'Failed to fetch advisors' });
  }
};

export const geAllTeams = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id; 
  const selectQuery = 'SELECT a.*, b FROM fetin_app."Team" a JOIN fetin_app."Advisor" b ON b."ID" = a."ADVISOR_ID" AND b."ID" = $1 ORDER BY a.project_name';
  try {
    
    const result = await query(selectQuery,[id])
    const users: User[] = result.rows;

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'No teams found in advisor' });
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};