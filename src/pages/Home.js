import { useContext, useEffect, useState } from 'react';
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton'
// import { DiaryStateContext } from '../App';
import DiaryList from './../components/DiaryList';
import { useReducer } from 'react';

const Home = () => {

    // const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()} / ${curDate.getMonth() + 1}`

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Emotion Diary`
    })

    useEffect(() => {
        if(diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();
            
            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
        }
    },[curDate, diaryList])
    

    

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        )
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        )
    }

    return (
        <div>
            <MyHeader 
                headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data}/>
        </div>
    )
}


export default Home;