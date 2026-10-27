import { describe, test, expect, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import { getRandomDogImage } from '../services/dogService';

vi.mock('../services/dogService', () => ({
  getRandomDogImage: vi.fn()
}));

describe('getDogImage', () => {
  test('returns a dog image successfully', async () => {
    vi.mocked(getRandomDogImage).mockResolvedValue({
      imageUrl: 'https://images.dog.ceo/breeds/test-dog.jpg',
      status: 'success'
    });

    const mockResponse = {
      json: vi.fn()
    };

    await getDogImage({} as any, mockResponse as any);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      data: {
        imageUrl: 'https://images.dog.ceo/breeds/test-dog.jpg',
        status: 'success'
      }
    });
  });
});