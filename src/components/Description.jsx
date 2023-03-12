export default function Description({descriptionInput, setDescriptionInput}) {
    
    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="description">Description:</label>
            <textarea
                id="descrption"
                name="description"
                value={descriptionInput}
                onChange={handleDescriptionInput}
                maxLength="300"
            ></textarea>
            <span>{descriptionInput.length}/300</span>
        </div>
    )
}