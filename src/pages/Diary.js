import { useParams, useNavigate } from "react-router-dom";
// import { DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { emotionList } from "../utils/emotion";
import { getStringDate } from "../utils/date";

const Diary = () => {
    const { id } = useParams();
    // const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Emotion Diary - ${id}th`
    })

    useEffect(() => {
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            setData(targetDiary);
            if(targetDiary) {
                // when a targetDiary exist
            } else {
                // when a targetDiary doesn't exist
                alert("This diary doesn't exist")
                navigate('/', {replace: true});
            }
        }
    }, [id, diaryList])


    if(!data) {
        return <div className="DiaryPage">Loading...</div>
    } else {

        const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion))
        return (
            <div className="DiaryPage">
                <MyHeader 
                    leftChild={<MyButton text={"< Back"} onClick={()=>navigate(-1)}/>}
                    rightChild={<MyButton text={"Edit"} onClick={()=>navigate(`/edit/${data.id}`)}/>}
                    headText={`${getStringDate(new Date(data.date))}`}
                />
                <article>
                    <section>
                        <h4>Today's feeling</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img} />
                            <div className='emotion_description'>
                                {curEmotionData.emotion_description}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>Today's diary</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}

export default Diary;