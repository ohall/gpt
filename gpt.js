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
  const { url, ...remainingConfigs } = config;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  };
  
  const method = 'POST';
  const body = JSON.stringify({ ...remainingConfigs, prompt });
  const request = await fetch(url, { headers, method, body });
  const response = await request.json();

  process.stdout.write(response.choices[0].text.trim());  
}
promptWords = process.argv.slice(2)
go(promptWords.join(' '))