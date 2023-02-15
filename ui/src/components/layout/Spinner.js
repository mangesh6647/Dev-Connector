import React from 'react';
import spinner from './spinner.gif';
function Spinner() {
    return (
        <section className="container">
            <img
                src={spinner}
                style={{ width: '200px', margin: 'auto', display: 'block' }}
                alt="Loading..."
            />
        </section>
    )

}

export default Spinner;

