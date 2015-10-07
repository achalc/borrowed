angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var inventory = [{
    id: 0,
    name: 'Yoga Mat',
    lentText: 'Achal lent to Katherine 7 hours ago',
    returnText: 'Katherine will return in 1 day',
    lent: false,
    face: 'http://www.pigazo.com/wp-content/uploads/2015/08/yoga-mat-navy-blue.jpg'
  }, {
    id: 1,
    name: 'Wireless Mouse',
    lentText: 'Achal lent to Katherine 7 hours ago',
    returnText: 'Katherine will return in 1 day',
    lent: false,
    face: 'http://images.apple.com/magicmouse/images/hero_1.jpg'
  }, {
    id: 2,
    name: 'iPhone Charger',
    lentText: 'Achal lent to Katherine 7 hours ago',
    returnText: 'Katherine will return in 1 day',
    lent: true,
    face: 'http://cdn.cultofmac.com/wp-content/uploads/2012/05/221694178.jpg'
  }];

  var chats = [{
    id: 0,
    name: 'Yoga Mat',
    lentText: 'Achal lent to Katherine 7 hours ago',
    returnText: 'Katherine will return in 1 day',
    lent: false,
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Wireless Mouse',
    lentText: 'Achal lent to Katherine 7 hours ago',
    returnText: 'Katherine will return in 1 day',
    lent: true,
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
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
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});