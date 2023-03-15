export default function Password({passwordInput, setPasswordInput, passwordInputLabel, currentPasswordInput, setCurrentPasswordInput, currentPasswordInputLabel, newPasswordInput, setNewPasswordInput, newPasswordInputLabel}) {

    function handlePasswordInput(event) {
        if (setPasswordInput) {
            setPasswordInput(event.target.value)
        }
        if (setCurrentPasswordInput) {
            setCurrentPasswordInput(event.target.value);
        }
        if (setNewPasswordInput) {
            setNewPasswordInput(event.target.value);
        }
    }

    const passwordInputValue = passwordInput || currentPasswordInput || newPasswordInput;
    const passwordInputLabelName = passwordInputLabel || currentPasswordInputLabel || newPasswordInputLabel;

    return (
        <div>
            <label htmlFor="password-input">{passwordInputLabelName}</label>
            <input
                type="password"
                name="password-input"
                maxLength="20"
                onChange={handlePasswordInput}
                value={passwordInputValue}
            ></input>
        </div>
    )
}