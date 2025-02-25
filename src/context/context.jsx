import { createContext, useState } from "react";
import run from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 20 * index)

    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        let usedPrompt = prompt !== undefined ? prompt : input; // Ensure we always use a valid prompt

        if (usedPrompt.trim() === "") return; // Prevent empty prompts

        setPrevPrompts(prev => [usedPrompt, ...prev]); // ✅ Ensure prevPrompts is updated
        setRecentPrompt(usedPrompt);

        response = await run(usedPrompt);

        // 🏆 Enhance response formatting
        let formattedResponse = response
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold (**bold**)
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics (*italic*)
            .replace(/###### (.*?)\n/g, "<h6>$1</h6>") // H6 Headings (###### Title)
            .replace(/##### (.*?)\n/g, "<h5>$1</h5>") // H5 Headings (##### Title)
            .replace(/#### (.*?)\n/g, "<h4>$1</h4>") // H4 Headings (#### Title)
            .replace(/### (.*?)\n/g, "<h3>$1</h3>") // H3 Headings (### Title)
            .replace(/## (.*?)\n/g, "<h2>$1</h2>") // H2 Headings (## Title)
            .replace(/# (.*?)\n/g, "<h2>$1</h2>") // H1 Headings (# Title)
            .replace(/```([\s\S]+?)```/g, "<pre><code>$1</code></pre>") // Code block (```code```)
            .replace(/`([^`]+)`/g, "<code>$1</code>") // Inline code (`inline code`)
            .replace(/- (.*?)\n/g, "<li>$1</li>") // Bullet points (- List item)
            .replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>") // Wrap all list items in <ul>
            .replace(/\n/g, "<br>"); // Line breaks



        let responseWords = formattedResponse.split(" ");
        for (let i = 0; i < responseWords.length; i++) {
            delayPara(i, responseWords[i] + " ");
        }



        setLoading(false);
        setInput("");
    };



    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider
