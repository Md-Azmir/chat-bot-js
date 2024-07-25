const readline = require('readline');

// Variable to store questions and  answers
const questions = [
    
    { 
        question: "What is your Name?", 
        answer: "Nothing."
    },
    { 
        question: "How do I reset my password?", 
        answer: "You can reset your password by visiting our password reset page."
    },
    { 
        question: "How can I contact support?", 
        answer: "You can contact our support team through live chat or email."
    },
    { 
        question: "What are your working hours?", 
        answer: "Our working hours are from 9 AM to 6 PM, Monday to Friday."
    },
];

// Function to match user input to the closest question
function findMatchingQuestion(userInput) {
    userInput = userInput.toLowerCase().replace(/\s/g, "");

    let bestMatch = { similarity: 0, index: -1 };
    questions.forEach((item, index) => {
        const similarity = calculateSimilarity(userInput, item.question.toLowerCase().replace(/\s/g, ""));
        if (similarity > bestMatch.similarity) {
            bestMatch.similarity = similarity;
            bestMatch.index = index;
        }
    });
    
    if (bestMatch.similarity >= 0.8) {
        return questions[bestMatch.index].answer;
    } else {
        return null; 
    }
}

function calculateSimilarity(str1, str2) {
    const maxLength = Math.max(str1.length, str2.length);
    let similarityScore = 0;

    for (let i = 0; i < maxLength; i++) {
        if (str1[i]  === str2[i]) {
            similarityScore++;
        }
    }

    return similarityScore / maxLength;
}

// Function to live chat link generation 
function generateLiveChatLink(email) {
    return "i am still working on it";
}

// Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function chatbot() {
    rl.question('Type your question: ', (userInput) => {
        const answer = findMatchingQuestion(userInput);

        if (answer) {
            console.log(answer);
        } else {
            // Redirect to live chat option
            rl.question('No suitable answer found. Would you like to start a live chat? (yes/no): ', (response) => {
                if (response.toLowerCase() === 'yes') {
                    rl.question('Please enter your email address for live chat: ', (userEmail) => {
                        const liveChatLink = generateLiveChatLink(userEmail);
                        console.log(`Please click on the following link to start live chat: ${liveChatLink}`);
                        askToContinue();
                    });
                } else {
                    console.log('Thank you for visiting. Goodbye!');
                    askToContinue();
                }
            });
        }
    });
}

// Function to ask user they want to continue chat
function askToContinue() {
    rl.question('Do you want to continue chatting? (yes/no): ', (response) => {
        if (response.toLowerCase() === 'yes') {
            chatbot(); 
        } else {
            rl.close();
        }
    });
}

chatbot();
