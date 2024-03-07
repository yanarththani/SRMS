export default function FinalSecondMarking_T(){
    return(
        <>
            <div className='containerFM'>
                <h2>Final Marks</h2>
                <div className=''>
                    <form action="#">
                        <div className="">
                            <label>S.No</label>
                            <input type="text" name="s_no"/>
                        </div>
                        <div className="">
                            <label>Student indexNo</label>
                            <input type="text" name="stu_indexNo"/>
                        </div>
                        
                        <div className="">
                            <label>Q1</label>
                            <input type="text" name="que01"/>
                        </div>
                        <div className="">
                            <label>Q2</label>
                            <input type="text" name="que02"/>
                        </div>
                        <div className=''>
                            <label>Q3</label>
                            <input type='text' name='que03'/>
                        </div>
                        <div>
                            <label>Q4</label>
                            <input type='text' name='que04'/>
                        </div>
                        <div>
                            <label>Q5</label>
                            <input type='text' name='que05'/>
                        </div>
                        <div>
                            <label>Q6</label>
                            <input type='text' name='que06'/>
                        </div>
                        <div className="">
                            <label>Total</label>
                            <input type="text" name="total_marks"/>
                        </div>
                        <div className="">
                            <label>Average</label>
                            <input type="text" name="average"/>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}