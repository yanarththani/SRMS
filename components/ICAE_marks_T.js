export default function ICAE_marks_T(){
    return(
        <>
            <label>Subject code</label>
            <input type="text" name="sub_code"/><br/>
            <label>S.No</label>
            <input type="text" name="s_no"/>
            <label>Reg.No</label>
            <input type="text" name="regno"/><br/>
            <label>ICA01</label>
            <input type="text" name="ica01"/><br/>
            <label>ICA02</label>
            <input type="text" name="ica02"/><br/>
            <label>ICA03</label>
            <input type="text" name="ica03"/><br/>
            <label>Average of Best Two ICAEs(30%)</label>
            <input type="text" name="total_ica_marks"/><br/>

            <button>Back</button>
            <button>Submit</button>
        </>
    )
}