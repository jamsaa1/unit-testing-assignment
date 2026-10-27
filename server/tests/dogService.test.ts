import { describe, test, expect, vi } from 'vitest';
import { getRandomDogImage } from '../services/dogService';


describe('getRandomDogImage', () => {
  test('returns a dog image successfully', async () => {
    const mockData = {
      message: 'https://images.dog.ceo/breeds/test-dog.jpg',
      status: 'success'
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    }));

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe('success');
    expect(fetch).toHaveBeenCalledOnce();

    vi.unstubAllGlobals();
  });

  test('throws an error when API returns status 500', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    }));

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );

    vi.unstubAllGlobals();
  });
});