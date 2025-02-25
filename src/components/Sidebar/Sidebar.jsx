import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, setInput } = useContext(context);

  const loadPrompt = async (prompt) => {
    setInput(prompt);
    setRecentPrompt(prompt);
    await onSent(prompt); // ✅ Load response properly
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt='' />
        <div onClick={() => onSent('')} className='new-chat'>
          <img src={assets.plus_icon} alt='' />
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className='recent-title'>Recent</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))
            ) : (
              <p className="no-recent">No recent prompts</p> // ✅ Display message when empty
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
