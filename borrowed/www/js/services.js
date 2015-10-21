angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Achal'
  }, {
    id: 1,
    name: 'Allie'
  }, {
    id: 2,
    name: 'Kat'
  }];

  var inventory = [{
    id: 0,
    name: 'Yoga Mat',
    borrower: null,
    lent: false,
    lend_date: null,
    return_date: null,
    face: 'http://www.pigazo.com/wp-content/uploads/2015/08/yoga-mat-navy-blue.jpg'
  }, {
    id: 1,
    name: 'Wireless Mouse',
    borrower: null,
    lent: false,
    lend_date: null,
    return_date: null,
    face: 'http://images.apple.com/magicmouse/images/hero_1.jpg'
  }, {
    id: 2,
    name: 'iPhone Charger',
    borrower: null,
    lent: false,
    lend_date: null,
    return_date: null,
    face: 'http://cdn.cultofmac.com/wp-content/uploads/2012/05/221694178.jpg'
  }];

  var borrowed = [{
    id: 0,
    name: 'Waffle Iron',
    face: 'http://ecx.images-amazon.com/images/I/71JtRkcDg7L._SL1500_.jpg'
  }, {
    id: 1,
    name: 'Raincoat',
    face: 'http://www.constructiongear.com/media/catalog/product/cache/3/thumbnail/9df78eab33525d08d6e5fb8d27136e95/n/s/ns45-ac_-00_yellow_front_on-model_neese-mediumagnum-45-raincoat-with-hood-48in-long-snap-front.jpg'
  }];

  var chats = [{
    id: 0,
    name: 'Yoga Mat',
    lent: false,
    borrower: null,
    return_date: null,
    face: 'http://www.pigazo.com/wp-content/uploads/2015/08/yoga-mat-navy-blue.jpg'
  }, {
    id: 1,
    name: 'Wireless Mouse',
    lent: true,
    borrower: 'Achal',
    return_date: null,
    face: 'http://images.apple.com/magicmouse/images/hero_1.jpg'
  }

  ];

  return {
    borrowed: function() {
      return borrowed;
    },
    borrowed_size: function() {
      return borrowed.length;
    },
    inventory: function() {
      return inventory;
    },
    inventory_size: function() {
      return inventory.length;
    },
    all: function() {
      return chats;
    },
    remove: function(item) {
      // chats.splice(chats.indexOf(chat), 1);
      inventory.splice(inventory.indexOf(item), 1);
    },
    lend: function(chat) {
      chat.lent = true;
    },
    get: function(chatId) {
      for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].id === parseInt(chatId)) {
          return inventory[i];
        }
      }
      return null;
    }
  };
});