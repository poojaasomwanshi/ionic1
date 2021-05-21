angular.module('starter.services', [])

.factory('Categories', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var categories = [{
    prodId: 0,
    names: 'Svour Box',
    description: ' ....  ',
    face: '/img/2.jpeg',
    qnt:1,
    price:400
  }, {
    prodId: 1,
    names: ' Signature Wrap',
    description: ' ....  ',
    face: '/img/fast2.jpeg',
    qnt:1,
    price:300
  }, {
    prodId: 2,
    names: ' Classic Combo',
    description: ' ....  ',
    face: '/img/classic.jpeg',
    qnt:1,
    price:300
  }, {
    prodId: 3,
    names: ' Fusion Combo',
    description: ' ....  ',
    face: '/img/burger.jpeg',
    qnt:1,
    price:300
  }, {
    prodId: 4,
    names: 'Sndwitches',
    description: ' ....  ',
    face: '/img/sand.jpeg',
    qnt:1,
    price:200
  },
  {
    prodId: 5,
    names: 'Salads',
    description: ' ....  ',
    face: '/img/salad2.jpeg',
    qnt:1,
    price:250
  },{
    prodId: 6,
    names: 'Cookies',
    description: ' ....  ',
    face: '/img/cooks.jpeg',
    qnt:1,
    price:400
  },{
    prodId: 7,
    names: 'Drinks',
    description: ' ....  ',
    face: '/img/drinks.jpeg',
    qnt:1,
    price:100
  }
];

  return {
    all: function() {
      return categories;
    },
    remove: function(category) {
      categories.splice(categories.indexOf(category), 1);
    },
    get: function(categoryId) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === parseInt(categoryId)) {
          return categories[i];
        }
      }
      return null;
    }
  };
});
