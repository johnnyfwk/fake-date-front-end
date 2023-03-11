export default function Gender({setGenderOfDateInput}) {

    function handleGenderOfDateInput(event) {
        setGenderOfDateInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="gender-of-date">Gender of Date:</label>
            <select id="gender-of-date" name="gender-of-date" defaultValue="default" onChange={handleGenderOfDateInput}>
                <option disabled value="default">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Either">Either</option>
            </select>
        </div>
    )
}