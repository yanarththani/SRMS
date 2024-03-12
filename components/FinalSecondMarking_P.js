export default function FinalSecondMarking_P(){
    return(
            <div className=''>
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
                            <label>Final First Marking Total</label>
                            <input type="text" name="final_first_P"/>
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
    )
}