import { Request, Response } from 'express';
import { db } from '../db';
import { studentTable, User } from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await db.select().from(studentTable).execute();
  res.json(users);
};
/*
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  const newUser: User = { name, email };
  const result = await db.insert(studentTable).values(newUser).execute();
  res.status(201).json(result);
};
*/
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const user = await db.select().from(studentTable).where(studentTable.id.eq(parseInt(req.params.id))).execute();
  if (user.length > 0) {
    res.json(user[0]);
  } else {
    res.status(404).send('User not found');
  }
};

/*
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email } = req.body;
  const result = await db.update(studentTable).set({ name, email }).where(studentTable.id.eq(parseInt(id))).execute();
  res.json(result);
};
*/
/*
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  await db.deleteFrom(studentTable).where(studentTable.id.eq(parseInt(req.params.id))).execute();
  res.status(204).send();
};
*/