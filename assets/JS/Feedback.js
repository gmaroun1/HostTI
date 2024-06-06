function submitFeedback() {
    var rating = document.querySelector('input[name="rating"]:checked');
    var comment = document.getElementById('comment').value;

    if (rating) {
        // Criar objeto de feedback
        var feedback = {
            rating: rating.value,
            comment: comment
        };

        // Armazenar feedback no localStorage
        var feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedback);
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

        // Limpar campos após enviar feedback
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById('comment').value = "";

        alert("Feedback enviado com sucesso! Obrigado.");
    } else {
        alert("Por favor, selecione uma avaliação.");
    }
}

function viewFeedbacks() {
    var feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
    var feedbackListDiv = document.getElementById('feedback-list');
    
    // Limpar a lista atual
    feedbackListDiv.innerHTML = "";

    if (feedbackList.length === 0) {
        feedbackListDiv.innerHTML = "<p>Nenhum feedback armazenado.</p>";
    } else {
        feedbackList.forEach(function(feedback, index) {
            var feedbackDiv = document.createElement('div');
            feedbackDiv.style.border = "1px solid #000";
            feedbackDiv.style.padding = "10px";
            feedbackDiv.style.marginBottom = "10px";
            feedbackDiv.style.backgroundColor = "#fff";

            var rating = document.createElement('p');
            rating.innerText = "Avaliação: " + feedback.rating;

            var comment = document.createElement('p');
            comment.innerText = "Comentário: " + feedback.comment;

            feedbackDiv.appendChild(rating);
            feedbackDiv.appendChild(comment);
            feedbackListDiv.appendChild(feedbackDiv);
        });
    }
}
