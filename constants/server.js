// server.js
const fs = require("fs");
const path = require("path");

// File path
const ordersFilePath = path.join(__dirname, "orders.json");

/**
 * Replaces all non-alphanumeric characters with a space.
 * @param {string} name - The original name string.
 * @returns {string} - The cleaned name string with spaces.
 */
function replaceWithSpace(name) {
  return name.replace(/[^a-zA-Z0-9]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Updates the name field of each order by replacing non-alphanumeric characters with spaces.
 */
function sanitizeOrderNames() {
  if (!fs.existsSync(ordersFilePath)) {
    console.error("orders.json file not found.");
    return;
  }

  const data = fs.readFileSync(ordersFilePath, "utf8");
  let orders;

  try {
    orders = JSON.parse(data);
  } catch (error) {
    console.error("Error parsing orders.json:", error);
    return;
  }

  if (!Array.isArray(orders)) {
    console.error("orders.json should contain an array of orders.");
    return;
  }

  // Update each order's name
  const sanitizedOrders = orders.map(order => ({
    ...order,
    name: replaceWithSpace(order.name),
  }));

  // Save the updated orders back to orders.json
  fs.writeFileSync(
    ordersFilePath,
    JSON.stringify(sanitizedOrders, null, 2),
    "utf8"
  );

  console.log("orders.json has been sanitized successfully.");
}

// Execute the sanitization
sanitizeOrderNames();