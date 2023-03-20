export default function Password({passwordInput, setPasswordInput, passwordInputLabel}) {

    function handlePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    return (
        <div id="component-password">
            <label htmlFor="password-input">{passwordInputLabel}</label>
            <div>
                <input
                    type="password"
                    name="password-input"
                    maxLength="20"
                    onChange={handlePasswordInput}
                    value={passwordInput}
                ></input>
            </div>
        </div>
    )
}