const socket = io();

const q = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

var updateLayout = function(listItems){
    var zero_start = 270; // if you want to start from a different position, should be positive
    var offsetAngle = (180 / (listItems.length-1));
    for(var i = 0; i < listItems.length; i ++){
        var rotateAngle = zero_start + (offsetAngle * i || 0);
        $(listItems[i]).css("transform", "rotate(" + rotateAngle + "deg) translate(0, -200px) rotate(-" + rotateAngle + "deg)")
    };
};

$("#reveal").click(function() {
    $(".revealable").removeClass("back");
});

$("#reshuffle").click(function() {
    socket.emit('reshuffle');
});

socket.emit('joined', q.name);

socket.on('newPlayer', ({name, users}) => {
    var list = $("#list");
    list.empty();
    socket.emit('getUser');

    for (var i = 0; i < users.length; i++) {
        const hide = name === users[i].name ? ' back' : '';
        const cardName = cardNames[users[i].card];
        var listItem = $("<li class='list-item'><div class='revealable " + cardName + hide + "'></div><div>" + users[i].name + "</div></li>");
        list.append(listItem);
        var listItems = $(".list-item");
    }
    updateLayout(listItems);
});

socket.on('updatePlayers', (users) => {
    var list = $("#list");
    list.empty();
    socket.emit('getUser');

    for (var i = 0; i < users.length; i++) {
        const hide = q.name === users[i].name ? ' back' : '';
        const cardName = cardNames[users[i].card];
        var listItem = $("<li class='list-item'><div class='revealable " + cardName + hide + "'></div><div>" + users[i].name + "</div></li>");
        list.append(listItem);
        var listItems = $(".list-item");
    }
    updateLayout(listItems);
});

const cardNames =
    [
        "ace_clubs",
        "two_clubs",
        "three_clubs",
        "four_clubs",
        "five_clubs",
        "six_clubs",
        "seven_clubs",
        "eight_clubs",
        "nine_clubs",
        "ten_clubs",
        "jack_clubs",
        "queen_clubs",
        "king_clubs",
        "ace_hearts",
        "two_hearts",
        "three_hearts",
        "four_hearts",
        "five_hearts",
        "six_hearts",
        "seven_hearts",
        "eight_hearts",
        "nine_hearts",
        "ten_hearts",
        "jack_hearts",
        "queen_hearts",
        "king_hearts",
        "ace_spades",
        "two_spades",
        "three_spades",
        "four_spades",
        "five_spades",
        "six_spades",
        "seven_spades",
        "eight_spades",
        "nine_spades",
        "ten_spades",
        "jack_spades",
        "queen_spades",
        "king_spades",
        "ace_diamonds",
        "two_diamonds",
        "three_diamonds",
        "four_diamonds",
        "five_diamonds",
        "six_diamonds",
        "seven_diamonds",
        "eight_diamonds",
        "nine_diamonds",
        "ten_diamonds",
        "jack_diamonds",
        "queen_diamonds",
        "king_diamonds",
        "back"
    ];
