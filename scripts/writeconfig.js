#!/usr/bin/env node

const fs = require('fs');

const data = {
  url: 'https://api.openai.com/v1/completions',
  model: 'text-davinci-003',
  max_tokens: 2048,
  temperature: 0  
};

const filePath = `${process.env.HOME}/.node-gpt-config.json`;

fs.writeFile(filePath, JSON.stringify(data), err => {
  if (err) {
    console.error(`An error occurred while writing to ${filePath}: ${err}`);
  } else {
    console.log(`JSON data successfully written to ${filePath}`);
  }
});