export default function DateOfDate({setDateInput,setIsDateValid}) {

    function handleDateInput(event) {
        const todaysDate = new Date().toLocaleDateString();
        const selectedDate = new Date(event.target.value).toLocaleDateString();
        if (selectedDate >= todaysDate) {
            setIsDateValid(true);
            setDateInput(event.target.value);
        } else {
            setIsDateValid(false);
        }
    }

    return (
        <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" onChange={handleDateInput}></input>
        </div>
    )
}