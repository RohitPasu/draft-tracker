import { DraftPick } from '../types/draft';

const API_URL = 'http://localhost:5001/api/draft-picks';

export const getDraftPicks = async (): Promise<DraftPick[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch draft picks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching draft picks:', error);
    return [];
  }
};

export const addDraftPick = async (pick: DraftPick): Promise<DraftPick> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pick),
    });
    if (!response.ok) {
      throw new Error('Failed to add draft pick');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding draft pick:', error);
    throw error;
  }
};

export const updateDraftPick = async (id: string, pick: DraftPick): Promise<DraftPick> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pick),
    });
    if (!response.ok) {
      throw new Error('Failed to update draft pick');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating draft pick:', error);
    throw error;
  }
};

export const deleteDraftPick = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete draft pick');
    }
  } catch (error) {
    console.error('Error deleting draft pick:', error);
    throw error;
  }
};

export const clearDraftPicks = async (): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to clear draft picks');
    }
  } catch (error) {
    console.error('Error clearing draft picks:', error);
    throw error;
  }
}; 