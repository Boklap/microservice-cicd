db = db.getSiblingDB('bokman');

db.createCollection('orders')

db.orders.insertMany([
    {
      user_id: 1,
      product_ids: [1, 2],
      total_price: 100.50,
      created_at: new Date()
    },
    {
      user_id: 2,
      product_ids: [1],
      total_price: 50.25,
      created_at: new Date()
    },
    {
      user_id: 1,
      product_ids: [2],
      total_price: 20.00,
      created_at: new Date()
    }
]);