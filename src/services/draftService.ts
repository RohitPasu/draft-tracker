import { DraftPick } from '../types/draft';

// Function to get all draft picks
export const getDraftPicks = (): DraftPick[] => {
  try {
    // Get picks from localStorage
    const savedPicks = JSON.parse(localStorage.getItem('draftPicks') || '[]');
    return savedPicks;
  } catch (error) {
    console.error('Error getting draft picks:', error);
    return [];
  }
};

// Function to add a new draft pick
export const addDraftPick = (pick: DraftPick): DraftPick[] => {
  try {
    // Get existing picks
    const existingPicks = getDraftPicks();
    
    // Add the new pick
    const updatedPicks = [...existingPicks, pick];
    
    // Save to localStorage
    localStorage.setItem('draftPicks', JSON.stringify(updatedPicks));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('draftPicksUpdated'));
    
    return updatedPicks;
  } catch (error) {
    console.error('Error adding draft pick:', error);
    return getDraftPicks();
  }
};

// Function to update a draft pick
export const updateDraftPick = (updatedPick: DraftPick): DraftPick[] => {
  try {
    // Get existing picks
    const existingPicks = getDraftPicks();
    
    // Find and update the pick
    const updatedPicks = existingPicks.map(pick => 
      pick.id === updatedPick.id ? updatedPick : pick
    );
    
    // Save to localStorage
    localStorage.setItem('draftPicks', JSON.stringify(updatedPicks));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('draftPicksUpdated'));
    
    return updatedPicks;
  } catch (error) {
    console.error('Error updating draft pick:', error);
    return getDraftPicks();
  }
};

// Function to delete a draft pick
export const deleteDraftPick = (pickId: string): DraftPick[] => {
  try {
    // Get existing picks
    const existingPicks = getDraftPicks();
    
    // Filter out the pick to delete
    const updatedPicks = existingPicks.filter(pick => pick.id !== pickId);
    
    // Save to localStorage
    localStorage.setItem('draftPicks', JSON.stringify(updatedPicks));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('draftPicksUpdated'));
    
    return updatedPicks;
  } catch (error) {
    console.error('Error deleting draft pick:', error);
    return getDraftPicks();
  }
};

// Function to clear all draft picks
export const clearDraftPicks = (): void => {
  try {
    // Clear localStorage
    localStorage.removeItem('draftPicks');
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('draftPicksUpdated'));
  } catch (error) {
    console.error('Error clearing draft picks:', error);
  }
}; 