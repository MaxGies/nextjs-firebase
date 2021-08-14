import { useState } from "react";
import classes from "./GenerateTimeline.module.css"

const DUMMY_INFO = {
    "2020-08-13" : {
        "10:30" : "ไปร้านขายข้าวแกงแล้วเจอแหวนทองแดงก็เลยเก็บไว้ซื้อกับข้าว",
        "16:30" : "ไปซื้อชาย4หมี่เกี๊ยวแล้วร้องไห้เพราะเป็นเฟมินิส"
    },
    "2020-08-14" : {
        "08:30" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia dui vel rhoncus tempus. Integer eget ante elit. Mauris pretium lorem et nisl rutrum, in mattis lorem dignissim. Nulla mi lectus, faucibus nec ultricies vel, ornare in ligula. Maecenas eu vulputate orci, in luctus odio. Proin cursus ligula nisl, dictum bibendum odio luctus ac. Donec pulvinar nunc dui, ac tempor est luctus id. Vivamus elementum rhoncus elit a mollis. Pellentesque ullamcorper dui sit amet gravida vulputate. Ut sit amet aliquet quam, et sollicitudin sapien.",
        "12:30" : "ไปออกกำลังกายยามเที่ยง แดดร้อนๆ วิ่งได้ฟิลดี",
        "18:30" : "ซื้อเฉาก๋วยชากังลาวมาเพราะแดดร้อนๆก็ต้องเฉาก๋วยชากังลาว"
    }
}

const GenerateTimeline = (props) => {
    const [ userAge, setUserAge ] = useState(0)
    const [ userGender, setUserGender ] = useState("ชาย")
    const [ userJob, setUserJob ] = useState("")
    const [ userDate, setUserDate ] = useState("")
    const [ userDescription, setUserDescription ] = useState("")

    const userSubmitHandler = () => {

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
                                <select id="gender" name="gender" className={classes.selecGender} onChange={e => setUserGender(e.target.value)} >
                                <option>ชาย</option>
                                <option>หญิง</option>
                                </select>
                            </div>
                            <div>
                                <label className={classes.textInfo} >อายุ</label>
                                <input type="number" id="age" name="age" className={classes.ageInput} onChange={e => setUserAge(e.target.value)} />
                            </div>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >อาชีพ</label>
                                <input type="text" id="job" name="job" className={classes.ageInput} onChange={e => setUserJob(e.target.value)} />
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


                <div className={classes.timeline}>
                    <h1 className={classes.topic}>Timeline</h1>
                    <div className={classes.timelineUser}>
                        <h3 className={classes.timelineUserInfo}>{`ผู้ป่วย${userGender} อายุ ${ userAge} ปี`}</h3>
                        <p className={classes.timelineUserInfoJob}>{`อาชีพ ${userJob}`}</p>
                    </div>
                    {DUMMY_INFO?
                        <div>
                            {Object.entries(DUMMY_INFO).map((info, index)=>{
                                return(
                                    <div key={index}>
                                        {info[0]}
                                        {
                                            Object.entries(info[1]).map((info, index)=>{
                                                return(
                                                    <div key={index}>
                                                        {info[0]}
                                                        <p>
                                                            {info[1]}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }) }
                        </div>
                        :
                        <h1>กรุณากรอกข้อมูลของท่าน</h1>
                    }
                </div>
            </div>
        </div>
    );
}

export default GenerateTimeline;