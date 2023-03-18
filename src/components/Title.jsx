export default function Title({titleInput, setTitleInput}) {
    
    function handleTitleInput(event) {
        setTitleInput(event.target.value);
    }

    return (
        <div className="component title">
            <label htmlFor="title">Title:</label>
            <div className="component-input-and-character-length">
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={titleInput}
                    onChange={handleTitleInput}
                    maxLength="50"
                ></input>
                <div>{titleInput.length}/50</div>
            </div>
        </div>
    )
}