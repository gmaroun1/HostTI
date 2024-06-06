document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const inviteLinkDiv = document.getElementById('invite-link');
    const copyLinkBtn = document.getElementById('copy-link');
    const groupMembersDiv = document.getElementById('group-members');

    let groupMembers = [];

    container.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'generate-invite') {
            const randomUserId = Math.floor(Math.random() * 1000); // Simulating random user ID
            const inviteLink = `https://example.com/slash?invite=${randomUserId}`;
            inviteLinkDiv.innerHTML = `<a href="${inviteLink}" id="invite-link-anchor" target="_blank">${inviteLink}</a>`;
            copyLinkBtn.style.display = 'block';
            simulateMemberAdd(); // Simulate member add when generating invite link
        }
    });

    copyLinkBtn.addEventListener('click', function() {
        const inviteLink = inviteLinkDiv.querySelector('a').getAttribute('href');
        const tempInput = document.createElement('input');
        tempInput.value = inviteLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard!');
    });

    function addMember() {
        const newMember = {
            id: groupMembers.length + 1,
            name: 'Member ' + (groupMembers.length + 1)
        };
        groupMembers.push(newMember);
        updateGroupMembers();
    }

    function updateGroupMembers() {
        groupMembersDiv.innerHTML = '';
        if (groupMembers.length === 0) {
            groupMembersDiv.textContent = 'No members in the group yet.';
        } else {
            const membersList = document.createElement('ul');
            groupMembers.forEach(function(member) {
                const listItem = document.createElement('li');
                listItem.textContent = member.name;
                membersList.appendChild(listItem);
            });
            groupMembersDiv.appendChild(membersList);
        }
    }

    function simulateMemberAdd() {
        // Simulate adding a member when the link is clicked
        const inviteLinkAnchor = document.getElementById('invite-link-anchor');
        inviteLinkAnchor.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the link from navigating away
            addMember(); // Simulate adding a member
            alert('Member added to the group!');
        });
    }

});

