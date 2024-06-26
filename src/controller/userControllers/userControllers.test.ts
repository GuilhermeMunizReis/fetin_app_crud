// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import request from 'supertest';
// import app from '../routes/userRoutes';
// import { query } from '../db';

// vi.mock('./db');

// describe('User CRUD operations', () => {
//   beforeEach(() => {
//     vi.resetAllMocks();
//   });

//   it('should create a new user', async () => {
//     const newUser = {
//       name: 'John Doe',
//       registration: '123456',
//       period: '2021',
//       course: 'Computer Science',
//       email: 'john.doe@example.com',
//       role: 'student'
//     };

//     query.mockResolvedValueOnce({ rows: [newUser] });

//     const response = await request(app)
//       .post('/users')
//       .send(newUser)
//       .expect('Content-Type', /json/)
//       .expect(201);

//     expect(response.body).toEqual(newUser);
//     expect(query).toHaveBeenCalledWith(expect.any(String), [
//       newUser.name,
//       newUser.registration,
//       newUser.period,
//       newUser.course,
//       newUser.email,
//       newUser.role
//     ]);
//   });

//   it('should return 400 if any field is missing', async () => {
//     const incompleteUser = {
//       name: 'John Doe',
//       registration: '123456',
//       period: '2021',
//       course: 'Computer Science',
//       email: 'john.doe@example.com'
//     };

//     const response = await request(app)
//       .post('/users')
//       .send(incompleteUser)
//       .expect('Content-Type', /json/)
//       .expect(400);

//     expect(response.body).toEqual({ error: 'All fields are required' });
//     expect(query).not.toHaveBeenCalled();
//   });

//   it('should return 500 if there is a database error', async () => {
//     const newUser = {
//       name: 'John Doe',
//       registration: '123456',
//       period: '2021',
//       course: 'Computer Science',
//       email: 'john.doe@example.com',
//       role: 'student'
//     };

//     query.mockRejectedValueOnce(new Error('Database error'));

//     const response = await request(app)
//       .post('/users')
//       .send(newUser)
//       .expect('Content-Type', /json/)
//       .expect(500);

//     expect(response.body).toEqual({ error: 'Failed to create user' });
//     expect(query).toHaveBeenCalledWith(expect.any(String), [
//       newUser.name,
//       newUser.registration,
//       newUser.period,
//       newUser.course,
//       newUser.email,
//       newUser.role
//     ]);
//   });

//   it('should fetch a user by ID', async () => {
//     const user = {
//       id: 1,
//       name: 'John Doe',
//       registration: '123456',
//       period: '2021',
//       course: 'Computer Science',
//       email: 'john.doe@example.com',
//       role: 'student'
//     };

//     query.mockResolvedValueOnce({ rows: [user] });

//     const response = await request(app)
//       .get(`/users/${user.id}`)
//       .expect('Content-Type', /json/)
//       .expect(200);

//     expect(response.body).toEqual(user);
//     expect(query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', [user.id]);
//   });

//   it('should return 404 if user is not found', async () => {
//     query.mockResolvedValueOnce({ rows: [] });

//     const response = await request(app)
//       .get('/users/999')
//       .expect(404);

//     expect(response.text).toBe('User not found');
//     expect(query).toHaveBeenCalledWith('SELECT * FROM users WHERE id = $1', [999]);
//   });

//   it('should update a user by ID', async () => {
//     const updatedUser = {
//       id: 1,
//       name: 'Jane Doe',
//       registration: '654321',
//       period: '2022',
//       course: 'Mathematics',
//       email: 'jane.doe@example.com',
//       role: 'teacher'
//     };

//     query.mockResolvedValueOnce({ rows: [updatedUser] });

//     const response = await request(app)
//       .put(`/users/${updatedUser.id}`)
//       .send(updatedUser)
//       .expect('Content-Type', /json/)
//       .expect(200);

//     expect(response.body).toEqual(updatedUser);
//     expect(query).toHaveBeenCalledWith(expect.any(String), [
//       updatedUser.name,
//       updatedUser.registration,
//       updatedUser.period,
//       updatedUser.course,
//       updatedUser.email,
//       updatedUser.role,
//       updatedUser.id
//     ]);
//   });

//   it('should delete a user by ID', async () => {
//     const userId = 1;

//     query.mockResolvedValueOnce({});

//     const response = await request(app)
//       .delete(`/users/${userId}`)
//       .expect(204);

//     expect(query).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1', [userId]);
//   });

//   it('should fetch all users', async () => {
//     const users = [
//       {
//         id: 1,
//         name: 'John Doe',
//         registration: '123456',
//         period: '2021',
//         course: 'Computer Science',
//         email: 'john.doe@example.com',
//         role: 'student'
//       },
//       {
//         id: 2,
//         name: 'Jane Doe',
//         registration: '654321',
//         period: '2022',
//         course: 'Mathematics',
//         email: 'jane.doe@example.com',
//         role: 'teacher'
//       }
//     ];

//     query.mockResolvedValueOnce({ rows: users });

//     const response = await request(app)
//       .get('/users')
//       .expect('Content-Type', /json/)
//       .expect(200);

//     expect(response.body).toEqual(users);
//     expect(query).toHaveBeenCalledWith('SELECT * FROM users');
//   });
// });
