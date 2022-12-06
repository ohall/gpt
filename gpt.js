
const go = async function (prompt) {
  console.log(prompt);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  };
  
  const method = 'POST';
  const body = JSON.stringify({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100,
    temperature: 0  
  });
  
  const request = await fetch('https://api.openai.com/v1/completions', { headers, method, body });
  
  const response = await request.json();

  console.log(response.choices[0].text);
  
}

go(promptWords.join(' '))