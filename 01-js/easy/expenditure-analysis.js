/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let catSpent = {};
  // { category: 'Food', totalSpent: 60 },
  let spent = [];

  transactions.forEach((element) => {
    catSpent[element.category] = catSpent[element.category]
      ? catSpent[element.category] + element.price
      : element.price;
  });

  // return catSpent;
  for (let key in catSpent) {
    spent.push({ 'category': key, 'totalSpent': catSpent[key] });
  }

  // catSpent.forEach(e => {
  //   spent.push({ category: e.key, totalSpent: e.value });
  // });

  return spent;
}

module.exports = calculateTotalSpentByCategory;
