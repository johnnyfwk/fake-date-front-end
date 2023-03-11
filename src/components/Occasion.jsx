export default function Occasion({setOccasionInput}) {
    
    function handleOccasionInput(event) {
        setOccasionInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="occasion">Occasion:</label>
            <select id="occasion" name="occasion" defaultValue="default" onChange={handleOccasionInput}>
                <option disabled value="default">Select Occasion</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Meet the Parents">Meet the Parents</option>
                <option value="Meet the Friends">Meet the Friends</option>
                <option value="Family Gathering">Family Gathering</option>
                <option value="Night Out">Night Out</option>
                <option value="Party">Party</option>
                <option value="Double Date">Double Date</option>
                <option value="Activity">Activity</option>
                <option value="Confidence Building">Confidence Building</option>
            </select>
        </div>
    )
}