const fs = require('fs');
const configPath = `${process.env.HOME}/.node-gpt-config.json`;
let config; 
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.log(`Unable to read ${configPath}`);
  process.exit(1);
}

const go = async function (prompt) {
  console.log(prompt);
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  };
  
  const method = 'POST';
  const body = JSON.stringify({ ...config, prompt });
  const request = await fetch('https://api.openai.com/v1/completions', { headers, method, body });
  const response = await request.json();

  console.log(response.choices[0].text);  
}
promptWords = process.argv.slice(2)
go(promptWords.join(' '))