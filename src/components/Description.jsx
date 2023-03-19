export default function Description({descriptionInput, setDescriptionInput}) {
    
    function handleDescriptionInput(event) {
        setDescriptionInput(event.target.value);
    }

    return (
        <div className="component description">
            <label htmlFor="description">Description:</label>
            <div className="component-input-and-character-length">
                <textarea
                    id="description"
                    name="description"
                    value={descriptionInput}
                    onChange={handleDescriptionInput}
                    maxLength="300"
                ></textarea>
                <div id="input-character-count">{descriptionInput.length}/300</div>
            </div>
        </div>
    )
}