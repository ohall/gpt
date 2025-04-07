curl "https://api.deepinfra.com/v1/openai/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPINFRA_TOKEN" \
  -d '{
      "model": "meta-llama/Meta-Llama-3-8B-Instruct",
      "stream": false,
      "messages": [
        {
          "role": "user",
          "content": "Hello!"
        }
      ]
    }'