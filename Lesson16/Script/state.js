const root = ReactDOM.createRoot(document.getElementById('root'));

function CheckBox() {
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <div>
            <input type="checkbox" id="check" name="check"
            defaultChecked={isChecked}             
            onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="check"> {isChecked ? 'checked' : 'unchecked'}</label>
        </div>
    );
}

root.render(<CheckBox />);