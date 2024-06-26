import { describe, it, expect} from 'vitest';
import { vi } from 'vitest';
import { Request, Response } from 'express';
import { getUsers, getUserByName, getStudentTeam, createUser } from '../controller/userControllers/userController';
import { query } from '../db'; // Certifique-se de ajustar o caminho

vi.mock('../db'); // Moca o módulo de consulta ao banco de dados

describe('User Controllers', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all users', async () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.mock).mockResolvedValueOnce({ rows: [{ id: 1, name: 'Alice' }] });

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice' }]);
  });

  it('should return 404 if no users are found', async () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.Mock).mockResolvedValueOnce({ rows: [] });

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No users found' });
  });

  it('should fetch user by name', async () => {
    const req = { params: { name: 'Alice' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.Mock).mockResolvedValueOnce({ rows: [{ id: 1, name: 'Alice' }] });

    await getUserByName(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice' }]);
  });

  it('should return 404 if user by name is not found', async () => {
    const req = { params: { name: 'Alice' } } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.Mock).mockResolvedValueOnce({ rows: [] });

    await getUserByName(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should fetch student team', async () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.Mock).mockResolvedValueOnce({ rows: [{ id: 1, name: 'Alice', team_id: 1 }] });

    await getStudentTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice', team_id: 1 }]);
  });

  it('should return 404 if no student teams are found', async () => {
    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.Mock).mockResolvedValueOnce({ rows: [] });

    await getStudentTeam(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'No users found in teams' });
  });

  it('should create a new user', async () => {
    const req = {
      body: {
        name: 'Alice',
        registration: '20230001',
        period: 1,
        course: 'CS',
        email: 'alice@example.com',
        role: 'student',
        login: 'alice',
        senha: 'password123'
      },
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    const newUser = {
      id: 1,
      name: 'Alice',
      registration: '20230001',
      period: 1,
      course: 'CS',
      email: 'alice@example.com',
      role: 'student'
    };

    (query as vi.Mock).mockResolvedValueOnce({ rows: [newUser] });

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  it('should return 500 if user creation fails', async () => {
    const req = {
      body: {
        name: 'Alice',
        registration: '20230001',
        period: 1,
        course: 'CS',
        email: 'alice@example.com',
        role: 'student',
        login: 'alice',
        senha: 'password123'
      },
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    (query as vi.Mock).mockRejectedValueOnce(new Error('Failed to create user'));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create user' });
  });
});
