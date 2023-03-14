export default function GenderOfDate({genderOfDateInput, setGenderOfDateInput}) {

    function handleGenderOfDateInput(event) {
        setGenderOfDateInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="gender-of-date">Seeking:</label>
            <select id="gender-of-date" name="gender-of-date" defaultValue={genderOfDateInput} onChange={handleGenderOfDateInput}>
                <option disabled value="default">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Either">Either</option>
            </select>
        </div>
    )
}