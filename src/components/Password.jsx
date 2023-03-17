export default function Password({passwordInput, setPasswordInput, passwordInputLabel}) {

    function handlePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="password-input">{passwordInputLabel}</label>
            <input
                type="password"
                name="password-input"
                maxLength="20"
                onChange={handlePasswordInput}
                value={passwordInput}
            ></input>
        </div>
    )
}