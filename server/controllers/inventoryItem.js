import { InventoryItem } from "../models/InventoryItem.js";

/*
* Method : CreateInventoryItem 
* If Authenticated user is Asistant: Inventory Item will be created with default approved value false
* If Manager : approved value will be set to true
*/
export const createInventoryItem = async (req, res) => {
  try {
    const { name, description, quantity, category } = req.body;
    const { role } = req.user;
    const itemProps = { name, description, quantity, category };

    if(role === "Manager"){
      itemProps["approved"] = true;
    }
    const newInventoryItem = new InventoryItem(itemProps);
    const savedItem = await newInventoryItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory item', error: error.message });
  }
}

// Method: approveInventoryItem
// Description: Updates the "approved" value of the provided item id to true.
export const approveInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the authenticated user is a Manager.
    if (req.user.role !== "Manager") {
      return res.status(403).json({ success: false, message: "User is not authorized to approve inventory items." });
    }

    const inventoryItem = await InventoryItem.findById(id);

    // Check if the inventory item with the given id exists.
    if (!inventoryItem) {
      return res.status(404).json({ success: false, message: "Inventory item not found." });
    }

    // Update the "approved" value to true.
    inventoryItem.approved = true;
    const updatedItem = await inventoryItem.save();

    res.status(200).json({ success: true, message: "Inventory item approved successfully.", updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error approving inventory item.", error: error.message });
  }
};


//getUnapprovedInventoryItems : to get unapproved items for managers (to review)
export const getUnapprovedInventoryItems = async (req, res) => {
  try {
    req['query'] = { approved : false };
    await getInventoryItems(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory items', error: error.message });
  }
}


/*
* getInventoryItems : if id is provided in return the inventory item with the id, else return all Items
* req.query.approved is sent true by the client to fetch all approved items and vice versa,
* req.query.approved : false can only be accessed by a manager
* default value of approved is set to true (if not provided)
*/
export const getInventoryItems = async (req, res) => {
  try {
    const { id } = req.params;
    const filterApproved = req.query.approved === 'true' || true; 

    if (id) {
      // Fetching a specific inventory item by its id if "id" is provided in the request parameters.
      const inventoryItem = await InventoryItem.findById(id);
      if (!inventoryItem) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.status(200).json(inventoryItem);
    } else {
      const pageNumber = parseInt(req.query.pageNumber) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const sort = req.query.sort || 'createdAt'; 

      const totalCount = await InventoryItem.countDocuments({ approved: filterApproved });
      const totalPages = Math.ceil(totalCount / limit);

      const currentPage = Math.min(Math.max(pageNumber, 0), totalPages - 1);
      const startIndex = currentPage * limit;

      const paginationInfo = {
        totalCount,
        limit,
        pages: totalPages,
        currentPage,
      };

      if (currentPage > 0) {
        paginationInfo.previous = currentPage - 1;
      }

      if (currentPage < totalPages - 1) {
        paginationInfo.next = currentPage + 1;
      }

      const items = await InventoryItem.find({ approved: filterApproved })
        .sort(sort)
        .skip(startIndex)
        .limit(limit)
        .exec();

      res.status(200).json({ items, ...paginationInfo});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory items', error: error.message });
  }
};



//deleteInventoryItem : delete the item with the specified id
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await InventoryItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inventory item', error: error.message });
  }
};