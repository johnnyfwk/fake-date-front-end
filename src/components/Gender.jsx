export default function Gender({genderInput, setGenderInput}) {

    function handleGenderInput(event) {
        setGenderInput(event.target.value);
    }

    return (
        <div id="component-gender">
            <label htmlFor="gender">Gender: </label>
            <select
                id="gender"
                name="gender"
                defaultValue={genderInput}
                onChange={handleGenderInput}>
                    <option disabled value="default">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
            </select>
        </div>
        
    )
}