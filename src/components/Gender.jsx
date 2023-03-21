export default function Gender({genderInput, setGenderInput}) {

    function handleGenderInput(event) {
        setGenderInput(event.target.value);
    }

    return (
        <div className="component gender">
            <label htmlFor="gender-input">Gender: </label>
            <div>
                <select
                    id="gender-input"
                    name="gender-input"
                    defaultValue={genderInput}
                    onChange={handleGenderInput}>
                        <option disabled value="default">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                </select>
            </div>
        </div>
        
    )
}