export default function Description({setDescriptionInput}) {
    
    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="description">Description:</label>
            <textarea
                id="descrption"
                name="description"
                onChange={handleDescriptionInput}
            ></textarea>
        </div>
    )
}