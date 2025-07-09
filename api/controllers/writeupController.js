const Writeup = require('../models/writeupModel');

// Get all writeups
exports.getAllWriteups = async (req, res) => {
  try {
    const writeups = await Writeup.find().sort({ createdAt: -1 });
    res.json(writeups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch writeups' });
  }
};

// Get single writeup
exports.getWriteup = async (req, res) => {
  try {
    const writeup = await Writeup.findById(req.params.id);
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    res.json(writeup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch writeup' });
  }
};

// Create writeup
exports.createWriteup = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const writeup = new Writeup({
      title,
      content,
      category,
      tags: tags || []
    });
    const savedWriteup = await writeup.save();
    res.status(201).json(savedWriteup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create writeup' });
  }
};

// Update writeup
exports.updateWriteup = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const writeup = await Writeup.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags },
      { new: true, runValidators: true }
    );
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    res.json(writeup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update writeup' });
  }
};

// Delete writeup
exports.deleteWriteup = async (req, res) => {
  try {
    const writeup = await Writeup.findByIdAndDelete(req.params.id);
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    res.json({ message: 'Writeup deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete writeup' });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const writeup = await Writeup.findById(req.params.id);
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    
    writeup.comments.push({ content, author });
    const updatedWriteup = await writeup.save();
    res.status(201).json(updatedWriteup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Get comments
exports.getComments = async (req, res) => {
  try {
    const writeup = await Writeup.findById(req.params.id);
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    res.json(writeup.comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Toggle like
exports.toggleLike = async (req, res) => {
  try {
    const writeup = await Writeup.findById(req.params.id);
    if (!writeup) {
      return res.status(404).json({ error: 'Writeup not found' });
    }
    
    writeup.likes += 1;
    const updatedWriteup = await writeup.save();
    res.json(updatedWriteup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
}; 