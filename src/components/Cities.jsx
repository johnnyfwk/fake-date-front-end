export default function Cities({cityInput, setCityInput, componentCitiesStyle}) {

    function handleCityInput(event) {
        setCityInput(event.target.value);
    }

    const styleComponentCities = {
        display: componentCitiesStyle.display,
        flexWrap: componentCitiesStyle.flexWrap,
        alignItems: componentCitiesStyle.alignItems,
        gap: componentCitiesStyle.gap
    };

    return (
        <div style={styleComponentCities}>
            <label htmlFor="cities">City:</label>
            <div>
                <select id="cities" name="cities" value={cityInput} onChange={handleCityInput}>
                    <option disabled value="default">Select City</option>
                    <optgroup label="England">
                        <option value="Bath">Bath</option>
                        <option value="Birmingham">Birmingham</option>
                        <option value="Bradford">Bradford</option>
                        <option value="Brighton & Hove">Brighton & Hove</option>
                        <option value="Bristol">Bristol</option>
                        <option value="Cambridge">Cambridge</option>
                        <option value="Canterbury">Canterbury</option>
                        <option value="Carlisle">Carlisle</option>
                        <option value="Chelmsford">Chelmsford</option>
                        <option value="Chester">Chester</option>
                        <option value="Chichester">Chichester</option>
                        <option value="Colchester">Colchester</option>
                        <option value="Coventry">Coventry</option>
                        <option value="Derby">Derby</option>
                        <option value="Doncaster">Doncaster</option>
                        <option value="Durham">Durham</option>
                        <option value="Ely">Ely</option>
                        <option value="Exeter">Exeter</option>
                        <option value="Gloucester">Gloucester</option>
                        <option value="Hereford">Hereford</option>
                        <option value="Kingston-upon-Hull">Kingston-upon-Hull</option>
                        <option value="Lancaster">Lancaster</option>
                        <option value="Leeds">Leeds</option>
                        <option value="Leicester">Leicester</option>
                        <option value="Lichfield">Lichfield</option>
                        <option value="Lincoln">Lincoln</option>
                        <option value="Liverpool">Liverpool</option>
                        <option value="London">London</option>
                        <option value="Manchester">Manchester</option>
                        <option value="Milton Keynes">Milton Keynes</option>
                        <option value="Newcastle-upon-Tyne">Newcastle-upon-Tyne</option>
                        <option value="Norwich">Norwich</option>
                        <option value="Nottingham">Nottingham</option>
                        <option value="Oxford">Oxford</option>
                        <option value="Peterborough">Peterborough</option>
                        <option value="Plymouth">Plymouth</option>
                        <option value="Portsmouth">Portsmouth</option>
                        <option value="Preston">Preston</option>
                        <option value="Ripon">Ripon</option>
                        <option value="Salford">Salford</option>
                        <option value="Salisbury">Salisbury</option>
                        <option value="Sheffield">Sheffield</option>
                        <option value="Southampton">Southampton</option>
                        <option value="Southend-on-Sea">Southend-on-Sea</option>
                        <option value="St Albans">St Albans</option>
                        <option value="Stoke on Trent">Stoke on Trent</option>
                        <option value="Sunderland">Sunderland</option>
                        <option value="Truro">Truro</option>
                        <option value="Wakefield">Wakefield</option>
                        <option value="Wells">Wells</option>
                        <option value="Westminster">Westminster</option>
                        <option value="Winchester">Winchester</option>
                        <option value="Wolverhampton">Wolverhampton</option>
                        <option value="Worcester">Worcester</option>
                        <option value="York">York</option>
                    </optgroup>
                    <optgroup label="Northern Ireland">
                        <option value="Armagh">Armagh</option>
                        <option value="Bangor">Bangor</option>
                        <option value="Belfast">Belfast</option>
                        <option value="Lisburn">Lisburn</option>
                        <option value="Londonderry">Londonderry</option>
                        <option value="Newry">Newry</option>
                    </optgroup>
                    <optgroup label="Scotland">
                        <option value="Aberdeen">Aberdeen</option>
                        <option value="Dundee">Dundee</option>
                        <option value="Dunfermline">Dunfermline</option>
                        <option value="Edinburgh">Edinburgh</option>
                        <option value="Glasgow">Glasgow</option>
                        <option value="Inverness">Inverness</option>
                        <option value="Perth">Perth</option>
                        <option value="Stirling">Stirling</option>
                    </optgroup>
                    <optgroup label="Wales">
                        <option value="Bangor">Bangor</option>
                        <option value="Cardiff">Cardiff</option>
                        <option value="Newport">Newport</option>
                        <option value="St Asaph">St Asaph</option>
                        <option value="St Davids">St Davids</option>
                        <option value="Swansea">Swansea</option>
                        <option value="Wrexham">Wrexham</option>
                    </optgroup>
                </select>
            </div>
        </div>
    )
}