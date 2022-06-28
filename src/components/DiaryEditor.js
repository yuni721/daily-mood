import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
// import { DiaryDispatchContext } from "./../App.js"

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotioinItem";
import { getStringDate } from "../utils/date.js";
import { emotionList } from "../utils/emotion.js";

const DiaryEditor = ({isEdit, originData}) => {

    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const navigate = useNavigate();
    // const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const [date, setDate] = useState(getStringDate(new Date()));

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    },[]);

    const handleSubmit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "Do you want to edit a diary?" : "Do you want to create a new diary?")) {
            if(isEdit) {
                onEdit(originData.id, date, content, emotion);
            } else {
                onCreate(date, content, emotion);
            }
        }
        navigate('/',{ replace: true }); // replace: true doesn't allow user come back to this again
    }

    const handleRemove = () => {
        if(window.confirm('Do you really want to remove this diary?')) {
            onRemove(originData.id);
            navigate('/',{replace:true});
        }
    }

    // by passing true to isEdit only from Edit page component, this runs only on Edit page
    useEffect(() => {
        if(isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit, originData])
    
    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={isEdit ? "Edit a diary" : "Write a new diary"} 
                leftChild={<MyButton text={"< Back"} onClick={() => navigate(-1)} />}
                rightChild={
                    isEdit &&
                    <MyButton text={"Remove"} type={"negative"} onClick={handleRemove}/>
                }
            />
            <div>
                <section>
                    <h4>What date is today?</h4>
                    <div className="input_box">
                        <input 
                            className="input_date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date" 
                        />
                    </div>
                </section>
                <section>
                    <h4>Today's Feeling</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem 
                                key={it.emotion_id} {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today's diary</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                            placeholder="How was today?"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        >

                        </textarea>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={'Cancel'} onClick={() => navigate(-1)}/>
                        <MyButton 
                            text={'Complete'} 
                            type={"positive"} 
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
} 

export default DiaryEditor;