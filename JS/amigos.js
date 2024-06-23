document.getElementById('friend-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const friendNameInput = document.getElementById('friend-name');
    const friendName = friendNameInput.value.trim();

    if (friendName) {
        addFriend(friendName);
        friendNameInput.value = '';
    }
});

function addFriend(name) {
    const friendList = document.getElementById('friend-list');
    const listItem = document.createElement('li');
    listItem.textContent = name;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
        friendList.removeChild(listItem);
    });

    listItem.appendChild(removeButton);
    friendList.appendChild(listItem);
}
