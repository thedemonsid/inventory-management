// prisma/seed.js

const { PrismaClient, Category } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const sampleBuyers = [
  { name: 'John Doe', phone: '1234567890', email: 'john@example.com', address: '123 Main St' },
  { name: 'Jane Smith', phone: '0987654321', email: 'jane@example.com', address: '456 Oak Ave' },
];

const sampleParts = [
  {
    code: 'ACC001',
    name: 'USB Cable',
    quantity: 100,
    purchasePrice: 5.00,
    mrp: 10.00,
    sellingPrice: 8.50,
    category: Category.ACCESSORIES,
    rackNumber: 'A1'
  },
  {
    code: 'SP001',
    name: 'Power Supply',
    quantity: 50,
    purchasePrice: 15.00,
    mrp: 25.00,
    sellingPrice: 22.50,
    category: Category.SPARE_PARTS,
    rackNumber: 'B2'
  },
];

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
    // Clear existing data
    await prisma.purchase.deleteMany();
    await prisma.buyer.deleteMany();
    await prisma.part.deleteMany();

    console.log('Seeding database...');

    // Create buyers
    const buyers = await Promise.all(
      sampleBuyers.map(buyer => 
        prisma.buyer.create({ data: buyer })
      )
    );
    console.log('Created buyers:', buyers.length);

    // Create parts
    const parts = await Promise.all(
      sampleParts.map(part => 
        prisma.part.create({ 
          data: {
            ...part,
            vectorEmbed: [] // Initialize empty vector embed
          }
        })
      )
    );
    console.log('Created parts:', parts.length);

    // Create sample purchases
    const purchases = await Promise.all([
      prisma.purchase.create({
        data: {
          buyerId: buyers[0].id,
          partId: parts[0].id,
          quantity: 2,
          unitPrice: 8.50,
          totalAmount: 17.00,
        }
      }),
      prisma.purchase.create({
        data: {
          buyerId: buyers[1].id,
          partId: parts[1].id,
          quantity: 1,
          unitPrice: 22.50,
          totalAmount: 22.50,
        }
      })
    ]);
    console.log('Created purchases:', purchases.length);

    // Insert data using createMany for efficiency
    // await prisma.fiber.createMany({
    //   data: fibers,
    //   skipDuplicates: true, // Skips entries with duplicate 'code' values
    // });
    // console.log('All orders have been successfully imported into the database.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });