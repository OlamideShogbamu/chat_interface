import React, { useState, useEffect, useRef } from 'react';
import './style.css';

function ChatAI({ apiKey, model }) {
  const [conversations, setConversations] = useState([]);
  const [input, setInput] = useState('');
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createNewConversation = () => {
    const newConversation = { name: `Conversation ${conversations.length + 1}`, messages: [] };
    setConversations([...conversations, newConversation]);
    setSelectedConversationIndex(conversations.length);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newConversations = [...conversations];
    const date = new Date().toISOString();
    const userMessage = { role: 'user', content: input, date };
    newConversations[selectedConversationIndex].messages.push(userMessage);
    setConversations(newConversations);
    setInput('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...newConversations[selectedConversationIndex].messages],
          max_tokens: 100,
        }),
      });
      const data = await response.json();
      if (data.error) {
        console.error(data.error.message);
        return;
      }
      const assistantMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        date: new Date().toISOString(),
      };
      newConversations[selectedConversationIndex].messages.push(assistantMessage);
      setConversations([...newConversations]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const loadConversation = (index) => {
    setSelectedConversationIndex(index);
  };

  return (
    <div className="chat-ai">
      <nav className="conversations">
        <button className="new-conversation" onClick={createNewConversation}>
          New Conversation
        </button>
        <div className="list">
          {conversations.map((conv, index) => (
            <button
              key={index}
              className={`conversation ${selectedConversationIndex === index ? 'selected' : ''}`}
              onClick={() => loadConversation(index)}
            >
              {conv.name}
            </button>
          ))}
        </div>
      </nav>
      <main className="content">
        {selectedConversationIndex === null ? (
          <div className="welcome">
            <h1>ChatAI</h1>
            <p>Made with love by CodeShack &lt;3</p>
          </div>
        ) : (
          <div className="messages">
            {conversations[selectedConversationIndex].messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="wrapper">
                  <div className="avatar">{message.role === 'assistant' ? 'AI' : <i className="fa-solid fa-user"></i>}</div>
                  <div className="details">
                    <div className="date">{new Date(message.date).toLocaleString()}</div>
                    <div className="text">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {selectedConversationIndex !== null && (
          <form className="message-form" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default ChatAI;