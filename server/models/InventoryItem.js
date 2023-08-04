import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String 
  },
  approved: {
    type: Boolean,
    default: false, // By default false, until a Manager creates/reviews it.
  },
});

export 
const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

