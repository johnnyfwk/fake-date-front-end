export default function Gender({setGenderInput}) {

    function handleGenderInput(event) {
        setGenderInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" defaultValue="default" onChange={handleGenderInput}>
                <option disabled value="default">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Either">Either</option>
            </select>
        </div>
    )
}