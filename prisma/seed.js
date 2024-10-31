// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
const ordersFilePath = path.join(__dirname, '../constants/orders.json'); // Adjust the path if necessary
console.log(ordersFilePath);

  if (!fs.existsSync(ordersFilePath)) {
    console.error('orders.json file not found.');
    process.exit(1);
  }

  const data = fs.readFileSync(ordersFilePath, 'utf8');
  let orders;
  try {
    orders = JSON.parse(data);
  } catch (error) {
    console.error('Error parsing orders.json:', error);
    process.exit(1);
  }

  if (!Array.isArray(orders)) {
    console.error('orders.json should contain an array of orders.');
    process.exit(1);
  }

  // Prepare data for insertion
  const fibers = orders.map(order => ({
    code: order.code,
    name: order.name,
    mrp: order.mrp,
    qty: order.qty,
    image: order.image || null, // Handle optional image field
    part: order.part,
  }));

  try {
    // Insert data using createMany for efficiency
    await prisma.fiber.createMany({
      data: fibers,
      skipDuplicates: true, // Skips entries with duplicate 'code' values
    });
    console.log('All orders have been successfully imported into the database.');
  } catch (error) {
    console.error('Error inserting data into the database:', error);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });