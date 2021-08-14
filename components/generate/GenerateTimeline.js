import classes from "./GenerateTimeline.module.css"

const GenerateTimeline = () => {

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
                                <select id="gender" name="gender" className={classes.selecGender} >
                                <option>ชาย</option>
                                <option>หญิง</option>
                                </select>
                            </div>
                            <div>
                                <label className={classes.textInfo} >อายุ</label>
                                <input type="number" id="age" name="age" className={classes.ageInput} />
                            </div>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >อาชีพ</label>
                                <input type="text" id="job" name="job" className={classes.ageInput} />
                            </div>
                        </div>
                    </div>

                    <div className={classes.infoUser}>
                        <h3 className={classes.head}>ข้อมูลไทม์ไลน์</h3>
                        <div className={classes.inputFieldUser}>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >วันเวลา</label>
                                <input type="datetime-local" id="time" name="time" className={classes.ageInput} />
                            </div>
                            <div className={classes.spawn2}>
                                <label className={classes.textInfo} >รายละเอียด</label>
                                <textarea rows="5" id="description" name="description" className={classes.ageInput} />
                            </div>
                        </div>
                        <button type="submit" value="Submit" className={classes.submitButton}>+เพิ่มข้อมูล</button>
                    </div>
                </div>
                <div className={classes.timeline}>
                    Test
                </div>
            </div>
        </div>
    );
}

export default GenerateTimeline;