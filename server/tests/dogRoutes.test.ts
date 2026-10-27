import { describe, test, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { getDogImage } from '../controllers/dogController';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn()
}));

import dogRoutes from '../routes/dogRoutes';

describe('GET /api/dogs/random', () => {
  test('returns a dog image successfully', async () => {
    vi.mocked(getDogImage).mockImplementation((_req: any, res: any) => {
      res.json({
        success: true,
        data: {
          imageUrl: 'https://images.dog.ceo/breeds/test-dog.jpg',
          status: 'success'
        }
      });
    });

    const app = express();
    app.use('/api/dogs', dogRoutes);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(
      'https://images.dog.ceo/breeds/test-dog.jpg'
    );
  });

  test('returns an error when fetching a dog image fails', async () => {
    vi.mocked(getDogImage).mockImplementation((_req: any, res: any) => {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dog image: Network error'
      });
    });

    const app = express();
    app.use('/api/dogs', dogRoutes);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(
      'Failed to fetch dog image: Network error'
    );
  });
});