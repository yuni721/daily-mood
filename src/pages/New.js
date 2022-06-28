import DiaryEditor from "../components/DiaryEditor";
import { useEffect } from 'react';


const New = () => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Emotion Diary - new diary`
    })
    return(
        <div>
            <DiaryEditor />
        </div>
    )
}

export default New;