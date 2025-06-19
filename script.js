const questions = [
    {
      question: "What is 2 + 2?",
      image: "https://via.placeholder.com/400x200?text=Question+1",
      options: ["3", "4", "5"],
      answer: "4"
    },
    {
      question: "What is the capital of France?",
      image: "https://via.placeholder.com/400x200?text=Question+2",
      options: ["Paris", "London", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      image: "https://via.placeholder.com/400x200?text=Question+3",
      options: ["Java", "Python", "JavaScript"],
      answer: "JavaScript"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
  
    const image = document.getElementById("quiz-image");
    image.src = q.image || "";
    image.style.display = q.image ? "block" : "none";
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    document.getElementById("quiz-result").textContent = "";
    document.getElementById("next-btn").style.display = "none";
  
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const correct = questions[currentQuestion].answer;
    const result = document.getElementById("quiz-result");
    if (selected === correct) {
      result.textContent = "Correct! 🎉";
      score++;
    } else {
      result.textContent = "Wrong answer. Try again.";
    }
  
    document.getElementById("score-display").textContent = `Score: ${score}`;
    document.getElementById("next-btn").style.display = "inline-block";
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz-container").innerHTML = `
        <p>You've completed the quiz! 🎊</p>
        <p>Your final score is: ${score}/${questions.length}</p>`;
    }
  }
  
  function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(response => response.json())
      .then(data => {
        document.getElementById("joke").textContent = `${data.setup} — ${data.punchline}`;
      })
      .catch(() => {
        document.getElementById("joke").textContent = "Failed to fetch joke.";
      });
  }
  function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(response => response.json())
      .then(data => {
        const jokeText = `${data.setup} 😂 ${data.punchline} 🤣`;
        document.getElementById("joke").textContent = jokeText;
      })
      .catch(() => {
        document.getElementById("joke").textContent = "Oops! Couldn't load a joke. 😢";
      });
  }
  
  // Load the first question when the page loads
  window.onload = loadQuestion;
  