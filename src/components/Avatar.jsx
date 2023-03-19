export default function Avatar({avatarUrlInput, setAvatarUrlInput, setIsAvatarUrlValid}) {

    function handleAvatarUrlInput(event) {
        setAvatarUrlInput(event.target.value);
        setIsAvatarUrlValid(null);
    }

    return (
        <div className="component avatar">
            <label htmlFor="avatar-url-input">Avatar URL (optional): </label>
            <input
                type="text"
                id="avatar-url-input"
                name="avatar-url-input"
                placeholder="Leave blank for default avatar"
                value={avatarUrlInput}
                onChange={handleAvatarUrlInput}                
            ></input>
        </div>
        
    )
}