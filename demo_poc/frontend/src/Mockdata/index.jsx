export const State = [
  {
    id: 1,
    state: "Karnataka",
  },
  {
    id: 2,
    state: "Tamilnadu",
  },
  {
    id: 3,
    state: "Kerala",
  },
  {
    id: 4,
    state: "Haryana",
  },
];

export const City = [
  {
    id: 1,
    city: "Bangalore",
    state: 1,
  },
  {
    id: 2,
    city: "Chennai",
    state: 2,
  },
  {
    id: 3,
    city: "Coimbatore",
    state: 2,
  },
  {
    id: 4,
    city: "Cochi",
    state: 3,
  },
  {
    id: 5,
    city: "Gurgaon",
    state: 4,
  },
];

export const CategoryList = [
  {
    id: 1,
    categoryName: "Dairy",
  },
  {
    id: 2,
    categoryName: "Cereals",
  },
  {
    id: 3,
    categoryName: "Snacks",
  },
];

export const CategoryItem = [
  {
    id: 1,
    itemName: "Milk",
    category: 1,
  },
  {
    id: 2,
    itemName: "Cheese",
    category: 1,
  },
  {
    id: 3,
    itemName: "Panner",
    category: 1,
  },
  {
    id: 4,
    itemName: "Oats",
    category: 2,
  },
  {
    id: 5,
    itemName: "Cornflakes",
    category: 2,
  },
  {
    id: 6,
    itemName: "Chocos",
    category: 2,
  },
  {
    id: 7,
    itemName: "Cookie",
    category: 3,
  },
  {
    id: 7,
    itemName: "Biscuits",
    category: 3,
  },
];

export const Brand = [
  {
    id: 1,
    brand: "Amul",
    itemId: 1,
  },
  {
    id: 2,
    brand: "Baggry",
    itemId: 5,
  },
  {
    id: 3,
    brand: "Kellogs",
    itemId: 4,
  },
  {
    id: 4,
    brand: "Kellogs",
    itemId: 6,
  },
  {
    id: 5,
    brand: "Britannia",
    itemId: 7,
  },
];

export const ActualData = [
  {
    state: 1,
    city: 1,
    item: 1,
    category: 1,
    price: 100,
    brand: 1,
    status: 2,
    discount: 0,
    effecttive_price: 100,
  },
  {
    state: 2,
    city: 2,
    item: 2,
    category: 2,
    price: 50,
    brand: 2,
    status: 2,
    discount: 0,
    effecttive_price: 50,
  },
  {
    state: 3,
    city: 3,
    item: 3,
    category: 3,
    price: 80,
    brand: 3,
    status: 2,
    discount: 0,
    effecttive_price: 80,
  },
  {
    state: 4,
    city: 4,
    item: 4,
    category: 4,
    price: 20,
    brand: 1,
    status: 2,
    discount: 0,
    effecttive_price: 20,
  },
];

export const toolsMenuData = [
  {id:1, title:'Minerva-Recipe', viewerURL:'https://www.uvm.edu/~bnelson/computer/html/wrappingtextaroundimages.html'},
  {id:2, title:'Minervadairy-Recipe', viewerURL:'https://minervadairy.com/recipes/'},
];
