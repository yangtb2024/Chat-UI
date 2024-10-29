addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const requestBody = await request.json()
      const { messages, model } = requestBody

      const response = await fetch('https://api.yangtb2024.me/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-MYrsVPK6wPm7gfl65b4dC132C9C74b71B51c5aF452157f5a'
        },
        body: JSON.stringify({
          model: model,
          messages: messages
        })
      })

      const responseData = await response.json()
      return new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } else {
    return new Response(`
    <!DOCTYPE html>
    <html>
    
    <head>
      <title>AI-Chat</title>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #e0ffff, #a4d0ed);
          overflow: hidden;
        }
    
        h1 {
          color: #343a40;
          margin-bottom: 20px;
          font-size: 2.5em;
          font-weight: 600;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
    
        #container {
          background-color: #fff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          width: 85%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          height: 85vh;
        }
    
        #chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
    
        #modelSelect {
          padding: 12px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 14px;
          appearance: none;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'/%3E%3C/svg%3E") no-repeat right 10px center;
          background-size: 16px;
          outline: none;
          width: 250px; /* 调整宽度 */ 
        }
    
        #chat-history {
          flex-grow: 1;
          overflow-y: auto;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background-color: #f8f9fa;
          box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.05);
        }
    
        .message-container {
          display: flex;
          margin-bottom: 15px;
          animation: fadeIn 0.3s ease-in-out;
        }
    
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
        }
    
        .message {
          padding: 14px 18px;
          border-radius: 15px;
          max-width: 70%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          word-break: break-word;
          position: relative;
          overflow: hidden;
        }
    
        .user .message {
          background: linear-gradient(to bottom right, #e9ecef, #ced4da);
          border-top-right-radius: 22px;
          border-bottom-left-radius: 6px;
          text-align: left;
        }
    
        .user .message::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 10px;
          border-bottom: 10px solid #ced4da;
          border-right: 10px solid transparent;
        }
    
        .ai .message {
          background: linear-gradient(to bottom right, #e0f7fa, #d1e7dd);
          border-top-right-radius: 22px;
          border-bottom-left-radius: 6px;
          text-align: left;
        }
    
        .ai .message::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 10px;
          border-bottom: 10px solid #d1e7dd;
          border-right: 10px solid transparent;
        }
    
        #input-area {
          display: flex;
          align-items: flex-end; /* 垂直方向底部对齐 */
          margin-top: 15px; /* 调整 input-area 与上面内容的间距 */
        }
    
        #userInput {
          flex-grow: 1;
          padding: 12px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          margin-right: 10px;
          resize: none; /* 禁止拖动调整大小 */
          font-size: 14px;
          min-height: 50px; 
          max-height: 150px; /* 设置最大高度，防止输入框过高 */
          overflow-y: auto; /* 自动换行 */
          outline: none;
        }
    
        button {
          background-color: #007bff;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          align-self: flex-end; /* 按钮底部对齐 */
        }
    
        button:hover {
          background-color: #0056b3;
        }
    
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
    
          to {
            opacity: 1;
          }
        }
      </style>
    </head>
    
    <body>
      <div id="container">
        <div id="chat-header">
          <h1>AI-Chat</h1>
          <select id="modelSelect">
            <option value="Meta-Llama-3-405B-Instruct">Meta-Llama-3-405B-Instruct</option>
            <option value="gemini-1.0-pro">gemini-1.0-pro</option>
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
            <option value="gemini-1.5-flash-002">gemini-1.5-flash-002</option>
            <option value="gemini-1.5-flash-exp-0827">gemini-1.5-flash-exp-0827</option>
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            <option value="gemini-1.5-pro-002">gemini-1.5-pro-002</option>
            <option value="gemini-1.5-pro-exp-0801">gemini-1.5-pro-exp-0801</option>
            <option value="gemini-1.5-pro-exp-0827">gemini-1.5-pro-exp-0827</option>
            <option value="glm-4">glm-4</option>
            <option value="glm-4v">glm-4v</option>
            <option value="gpt-4o-2024-08-06">gpt-4o-2024-08-06</option>
            <option value="gpt-4o-mini">gpt-4o-mini</option>
          </select>
        </div>
        <div id="chat-history"></div>
        <div id="input-area">
          <textarea id="userInput" placeholder="请输入您的问题..."></textarea>
          <button onclick="sendMessage()">发送</button>
        </div>
      </div>
    
      <script>
        let messages = [];
    
        async function sendMessage() {
          const model = document.getElementById('modelSelect').value;
          const userInput = document.getElementById('userInput').value;
    
          messages.push({
            role: 'user',
            content: userInput
          });
          displayMessage(userInput, 'user');
    
          document.getElementById('userInput').value = '';
    
          const response = await fetch(self.location.href, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages,
              model
            })
          });
    
          const responseData = await response.json();
          const aiResponse = responseData.choices[0].message.content;
    
          messages.push({
            role: 'assistant',
            content: aiResponse
          });
          displayMessage(aiResponse, 'ai');
        }
    
        function displayMessage(message, sender) {
          const chatHistory = document.getElementById('chat-history');
    
          const messageContainer = document.createElement('div');
          messageContainer.classList.add('message-container');
    
          const avatar = document.createElement('img');
          avatar.classList.add('avatar');
          avatar.src = sender === 'user' ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' : 'https://api.yangtb2024.me/logo.png';
    
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message');
          messageDiv.textContent = message;
    
          messageContainer.appendChild(avatar);
          messageContainer.appendChild(messageDiv);
    
          chatHistory.appendChild(messageContainer);
    
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }
      </script>
    </body>
    
    </html>      
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}