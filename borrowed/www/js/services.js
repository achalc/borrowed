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

  // , {
  //   id: 2,
  //   name: 'Adam Bradleyson',
  //   lentText: 'Achal lent to Katherine 7 hours ago',
  //   returnText: 'Katherine will return in 1 day',
  //   lent: true,
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 3,
  //   name: 'Perry Governor',
  //   lentText: 'Achal lent to Katherine 7 hours ago',
  //   returnText: 'Katherine will return in 1 day',
  //   lent: false,
  //   face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  // }, {
  //   id: 4,
  //   name: 'Mike Harrington',
  //   lentText: 'Achal lent to Katherine 7 hours ago',
  //   returnText: 'Katherine will return in 1 day',
  //   lent: false,
  //   face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  // }

  ];

  return {
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