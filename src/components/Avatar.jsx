export default function Avatar({avatarUrlInput, setAvatarUrlInput, setIsAvatarUrlValid}) {

    function handleAvatarUrlInput(event) {
        setAvatarUrlInput(event.target.value);
        setIsAvatarUrlValid(null);
    }

    return (
        <div>
            <label htmlFor="sign-up-avatar-url">Avatar URL (optional):</label>
            <input
                type="text"
                id="sign-up-avatar-url"
                name="sign-up-avatar-url"
                placeholder="Leave blank for default avatar"
                value={avatarUrlInput}
                onChange={handleAvatarUrlInput}                
            ></input>
        </div>
        
    )
}