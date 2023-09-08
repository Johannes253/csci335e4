window.onload = function () {
    let correctAnswer = "";

    fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple')
        .then(response => response.json())
        .then(data => {
            const trivia = data.results[0];
            document.querySelector("#question").textContent = trivia.question;

            correctAnswer = trivia.correct_answer;

            const answers = [...trivia.incorrect_answers, trivia.correct_answer].sort(() => Math.random() - 0.5);
            const answerForm = document.querySelector("#answerForm .row");
            
            answers.forEach((answer, index) => {
                const radioContainer = document.createElement('div');
                radioContainer.className = 'col-3';

                const radioLabel = document.createElement('label');
                const radioInput = document.createElement('input');

                radioInput.type = 'radio';
                radioInput.name = 'triviaAnswer';
                radioInput.value = answer;
                radioInput.id = 'answer' + index;

                radioLabel.setAttribute("for", 'answer' + index);
                radioLabel.innerHTML = answer;

                radioContainer.appendChild(radioInput);
                radioContainer.appendChild(radioLabel);
                answerForm.appendChild(radioContainer);
            });
        });

    document.getElementById("answerForm").addEventListener("submit", function(event){
        event.preventDefault();


        const selectedAnswer = document.querySelector('input[name="triviaAnswer"]:checked').value;
        if(selectedAnswer === correctAnswer) {
            const imageUrl = "https://random.dog/9b906030-b598-4647-8f34-d68014c195f2.jpg";

            document.body.innerHTML = '<div style="text-align:center;">' + '<h1>Congratulations, that was correct!</h1>' + '<p>Here is a picture of a cute dog:</p>' + '<img src="' + imageUrl + '" alt="Random Dog">' +
                                      '<br>' +
                                      '<button onclick="location.reload();" style="margin-top:20px;">Get another question</button>' +
                                      '</div>';
        } else {
            alert("Incorrect. Try again.");
        }
    });
}
