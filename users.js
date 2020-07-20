const users = [];
var cards = [];

function userJoin(id, name, card) {
    const user = {id, name, card};
    cards.push(card);
    users.push(user);
    return user;
}

function userExists(name) {
    return users.findIndex(user => user.name === name) !== -1;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const u_index = users.findIndex(user => user.id === id);
    if(u_index !== -1) {
        cards.splice(u_index, 1)
        return users.splice(u_index, 1)[0];
    }
}

function getUsers() {
    return users;
}

function getCards() {
    return cards;
}

function shuffle() {
    cards = [];
    for (i = 0; i < users.length; i++) {
        let card = -1;
        do {
            card = Math.floor(Math.random() * 52);
            users[i].card = card;
        } while(cards.includes(card));
        cards.push(card);
    }
}

module.exports = {
    userJoin,
    userExists,
    getCurrentUser,
    userLeave,
    getUsers,
    getCards,
    shuffle
};