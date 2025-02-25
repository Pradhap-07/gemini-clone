import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../../context/context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, setRecentPrompt } = useContext(context);

  const handleCardClick = (text) => {
    setInput(text);
    setRecentPrompt(text);
    onSent(text);  // ✅ Ensure onSent() gets the prompt
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='' />
      </div>
      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className='cards'>
              {[
                { text: 'Tell me about Java', icon: assets.compass_icon },
                { text: 'Explain OOP concepts', icon: assets.bulb_icon },
                { text: 'How does Machine Learning work?', icon: assets.message_icon },
                { text: 'Improve this JavaScript code', icon: assets.code_icon }
              ].map((card, index) => (
                <div key={index} className='card' onClick={() => handleCardClick(card.text)}>
                  <p>{card.text}</p>
                  <img src={card.icon} alt='' />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt='' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt='' />
              {loading ? (
                <div className='loader'><div></div><div></div><div></div></div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              placeholder='Enter a prompt here'
              onKeyDown={(e) => e.key === 'Enter' && onSent(input)}
            />
            {input && <img onClick={() => onSent(input)} src={assets.send_icon} alt='Send' />}
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
