import { useEffect, useState } from "react";
import classes from "./GenerateTimeline.module.css";
import { useCollection } from "react-firebase-hooks/firestore"
import { firestore } from "../../utils/firebase";

const GenerateTimeline = () => {
    const [ user, setUser ] = useState([]);
    const [ timeline, setTimeline] = useState({});
    const [ userAge, setUserAge ] = useState(0)
    const [ userGender, setUserGender ] = useState("ชาย")
    const [ userJob, setUserJob ] = useState("")
    const [ userDate, setUserDate ] = useState("")
    const [ userDescription, setUserDescription ] = useState("")
    const sortObject = obj => Object.keys(obj).sort().reduce((res, key) => (res[key] = obj[key], res), {});

    //recieve database isers info
    const [dataUser, dataUserLoading, error] = useCollection(
        firestore.collection('users'),
        {}
    );

    //set recieve database to user
    useEffect(()=>{
        if(!dataUserLoading && dataUser){
            const getUserDataFromDB = dataUser.docs.map( (doc) => ({
            id: doc.id,...doc.data(),timeline: doc.data().timeline || {}
            }))

            setTimeline(getUserDataFromDB[0].timeline)
            setUser(getUserDataFromDB[0]);
            setUserAge(getUserDataFromDB[0].age)
            setUserJob(getUserDataFromDB[0].job)
            setUserGender(getUserDataFromDB[0].gender)
        }
    },[dataUser])

    //click to deploy to database
    const userSubmitHandler = async () => {
        let dateTime = userDate.split('T')
        
        if(user.timeline != undefined){
            if(Object.keys(user.timeline).length > 0 ){

                if(user.timeline[dateTime[0]] != undefined){
                    user.timeline[dateTime[0]][dateTime[1]] = userDescription
                }

                await setTimeline(Object.assign({ [dateTime[0]] : { [dateTime[1]] : userDescription },}, user.timeline));
                await sendDataFireStore(Object.assign({ [dateTime[0]] : { [dateTime[1]] : userDescription },}, user.timeline));
                
            }
            else{
                await setTimeline(Object.assign({ [dateTime[0]] : { [dateTime[1]] : userDescription }, }))
                await sendDataFireStore(Object.assign({ [dateTime[0]] : { [dateTime[1]] : userDescription }, }));
            }
        }

        document.getElementById('description').value = ''
    }

    const sendDataFireStore = async (dataToFireStore) => {
        await firestore.collection("users").doc(user.id).set({
            age: userAge,
            gender: userGender,
            job: userJob,
            timeline : dataToFireStore
        })
        .catch(error => {throw new Error('Error: Getting document:');});
    }

    const deleteInfoFromTimeline = async (date,time) => {

        delete user.timeline[date][time];
        
        Object.keys(user.timeline).forEach(key => Object.keys(user.timeline[key]).length == 0 ? delete user.timeline[key] : 1  );

        await firestore.collection("users").doc(user.id).set({
            age: userAge,
            gender: userGender,
            job: userJob,
            timeline : user.timeline
            ,
        });
    }

    return(
        <div className={classes.root}>
            <h1 className={classes.topic}>COVID Timeline Generator </h1>
            <div className={classes.base}>
                <div className={classes.info}>
                    <div className={classes.infoUser}>
                        <h3 className={classes.head}>ข้อมูลผู้ป่วย</h3>
                        <div className={classes.inputFieldUser}>
                            <div>
                                <label className={classes.textInfo} >เพศ</label>
                                <select id="gender" name="gender" defaultValue={user.gender} className={classes.selecGender} onChange={e => setUserGender(e.target.value)} >
                                <option>ชาย</option>
                                <option>หญิง</option>
                                </select>
                            </div>
                            <div>
                                <label className={classes.textInfo} >อายุ</label>
                                <input type="number" id="age" name="age" defaultValue={user.age} className={classes.ageInput} onChange={e => setUserAge(e.target.value)} />
                            </div>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >อาชีพ</label>
                                <input type="text" id="job" name="job" defaultValue={user.job} className={classes.ageInput} onChange={e => setUserJob(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className={classes.infoUser}>
                        <h3 className={classes.head}>ข้อมูลไทม์ไลน์</h3>
                        <div className={classes.inputFieldUser}>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >วันเวลา</label>
                                <input type="datetime-local" id="time" name="time" className={classes.ageInput} onChange={e => setUserDate(e.target.value)} />
                            </div>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >รายละเอียด</label>
                                <textarea rows="5" id="description" name="description" className={classes.ageInput} onChange={e => setUserDescription(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit" value="Submit" onClick={userSubmitHandler} className={classes.submitButton}>+เพิ่มข้อมูล</button>
                    </div>
                </div>


                <div className={classes.tableTimeline}>
                    <h1 className={classes.topic}>Timeline</h1>
                    <div className={classes.timelineUser}>
                        <h3 className={classes.timelineUserInfo}>{`ผู้ป่วย${userGender} อายุ ${ userAge} ปี`}</h3>
                        <p className={classes.timelineUserInfoJob}>{`อาชีพ ${userJob}`}</p>
                    </div>
                    {timeline != undefined ? Object.keys(timeline).length > 0 ?
                        <div className={classes.timeline}>
                            {Object.entries(sortObject(timeline)).map((infoDate, index)=>{
                                return(
                                    <div key={index} className={classes.entireTimeline}>
                                        <div className={classes.titleTimeline}>
                                            {infoDate[0]}
                                        </div>
                                        <div className={classes.contentTimeline}>
                                        {
                                            Object.entries(sortObject(infoDate[1])).map((infoTime, index)=>{
                                                return(
                                                    <div key={index} className={classes.contentTimeTelling}>
                                                        <p>
                                                            <span className={classes.timeTelling}>{infoTime[0]}</span>
                                                            {infoTime[1]}
                                                        </p>
                                                        <button className={classes.deleteTimeline} onClick={() => deleteInfoFromTimeline(infoDate[0],infoTime[0])}>x</button>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                )
                            }) }
                        </div>
                        :
                        <h1 className={classes.insertPlz}>กรุณากรอกข้อมูลของท่านเข้าสู่ระบบ</h1> 
                        : 
                        <h1 className={classes.insertPlz}>กรุณากรอกข้อมูลของท่านเข้าสู่ระบบ</h1>
                    }
                </div>
            </div>
        </div>
    );
}

export default GenerateTimeline;