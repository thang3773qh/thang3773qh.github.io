let currentQuestionIndex = 0;
let poin = 0;
let category = prompt("Category");
let urlData = 'https://script.google.com/macros/s/AKfycbwzrvFw1ELZuHSOf6NCMgGpZJHCO4pY8bntT8A2SQlo_wDuuCHPaFzRXvz5VJX6sAlB/exec?category=' + category;

async function fetchData() {
  try {
    const response = await fetch(urlData);
    if (!response.ok) {
      throw new Error('Không thể lấy dữ liệu từ URL.');
    }
    const data = await response.json();
    // Xử lý dữ liệu ở đây
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    
    shuffleArray(data);
    

    function showQuestion(index) {
      const questionContainer = document.getElementById('question');
      const answersContainer = document.getElementById('answers');
      questionContainer.textContent = data[index].question;
      answersContainer.innerHTML = '';
      const shuffledAnswers = shuffleArray(data[index].answers);

      shuffledAnswers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer.content;
        answerButton.classList.add('answer-button');
        if (answer.is_true) answerButton.id = 'trueAnswer';
        answerButton.onclick = () => {
          if (answer.is_true) {
            poin += 1;
            answerButton.style.backgroundColor='#64c374';
          } else {
answerButton.style.backgroundColor='#e52c45';
            document.getElementById('trueAnswer').style.backgroundColor='#64c374';
          }
        };
        answersContainer.appendChild(answerButton);
      });
    }

    document.getElementById('nextButton').addEventListener('click', () => {
      document.getElementById('numQuestions').innerHTML = currentQuestionIndex+"/"+data.length;
      if(currentQuestionIndex>=data.length-1) {
        alert(poin+"/"+data.length);
      }else{
        currentQuestionIndex = (currentQuestionIndex + 1);
        showQuestion(currentQuestionIndex);
      }
    });
    console.log(data);
    showQuestion(currentQuestionIndex);
    
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

fetchData();

