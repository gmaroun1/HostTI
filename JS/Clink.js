/*document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container-link');
    const inviteLinkDiv = document.getElementById('invite-link');
    const copyLinkBtn = document.getElementById('copy-link');


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

    

});*/

