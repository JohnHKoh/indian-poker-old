const users = [];
var cards = [];

function userJoin(id, name, card) {
    const user = {id, name, card};
    cards.push(card);
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const u_index = users.findIndex(user => user.id === id);
    if(u_index !== -1) {
        const cardv = users[u_index].card;
        const c_index = cards.findIndex(card => card === cardv);
        return users.splice(u_index, 1)[0] && cards.splice(c_index, 1)[0];
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
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getUsers,
    getCards,
    shuffle
};