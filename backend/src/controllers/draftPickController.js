const DraftPick = require('../models/DraftPick');
const mongoose = require('mongoose');

// Helper function to transform MongoDB document to frontend format
const transformToFrontend = (doc) => {
  if (!doc) return null;
  
  // Convert to plain object if it's a Mongoose document
  const obj = doc.toObject ? doc.toObject() : doc;
  
  // Map _id to id
  return {
    ...obj,
    id: obj._id.toString(),
    _id: undefined // Remove _id from the response
  };
};

// Helper function to transform frontend data to MongoDB format
const transformToMongoDB = (data) => {
  if (!data) return null;
  
  // Create a deep copy of the data
  const transformed = JSON.parse(JSON.stringify(data));
  
  // If id is provided at the root level, use it as _id
  if (transformed.id) {
    transformed._id = transformed.id;
    delete transformed.id;
  }
  
  // Handle nested player object
  if (transformed.player) {
    // Keep the player.id as is since it's a different field
    // Remove any _id from player if it exists
    if (transformed.player._id) {
      delete transformed.player._id;
    }
  }
  
  return transformed;
};

// Get all draft picks
exports.getDraftPicks = async (req, res) => {
  try {
    const picks = await DraftPick.find().sort({ round: 1, pick: 1 });
    // Transform each pick to include id instead of _id
    const transformedPicks = picks.map(transformToFrontend);
    res.json(transformedPicks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new draft pick
exports.addDraftPick = async (req, res) => {
  try {
    console.log('Received draft pick data:', req.body);
    
    // Create a new draft pick without an id
    const pickData = { ...req.body };
    delete pickData.id; // Remove any client-side id
    
    // Create and save the draft pick
    const pick = new DraftPick(pickData);
    const savedPick = await pick.save();
    console.log('Saved draft pick:', savedPick);
    
    // Transform the saved pick to frontend format
    const transformedPick = {
      ...savedPick.toObject(),
      id: savedPick._id.toString(), // Use MongoDB's _id as the id
      _id: undefined // Remove _id from response
    };
    console.log('Transformed pick for frontend:', transformedPick);
    
    res.status(201).json(transformedPick);
  } catch (error) {
    console.error('Error adding draft pick:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update a draft pick
exports.updateDraftPick = async (req, res) => {
  try {
    // Transform the request body to MongoDB format
    const transformedData = transformToMongoDB(req.body);
    
    const pick = await DraftPick.findByIdAndUpdate(
      req.params.id,
      transformedData,
      { new: true }
    );
    
    if (!pick) {
      return res.status(404).json({ message: 'Draft pick not found' });
    }
    
    // Transform the updated pick to frontend format
    const transformedPick = transformToFrontend(pick);
    res.json(transformedPick);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a draft pick
exports.deleteDraftPick = async (req, res) => {
  try {
    const pickId = req.params.id;
    console.log('Attempting to delete draft pick with ID:', pickId);
    
    if (!pickId) {
      return res.status(400).json({ message: 'ID is required' });
    }
    
    // First try to find the pick to get its _id
    const existingPick = await DraftPick.findOne({ id: pickId });
    console.log('Found pick:', existingPick);
    
    if (!existingPick) {
      console.log('Draft pick not found with id:', pickId);
      return res.status(404).json({ message: 'Draft pick not found' });
    }
    
    // Delete using the _id
    const deletedPick = await DraftPick.findByIdAndDelete(existingPick._id);
    console.log('Deleted pick:', deletedPick);
    
    if (!deletedPick) {
      console.log('Failed to delete pick');
      return res.status(404).json({ message: 'Failed to delete pick' });
    }
    
    console.log('Draft pick deleted successfully');
    res.json({ message: 'Draft pick deleted' });
  } catch (error) {
    console.error('Error deleting draft pick:', error);
    res.status(500).json({ message: error.message });
  }
};

// Clear all draft picks
exports.clearDraftPicks = async (req, res) => {
  try {
    await DraftPick.deleteMany({});
    res.json({ message: 'All draft picks cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 