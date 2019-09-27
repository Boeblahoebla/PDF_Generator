// Imports
//////////

// Dependencies
import React, { useState } from 'react';
import axios from 'axios'
import { saveAs } from 'file-saver';

// Styling
import './App.css';


// Component
////////////

function App() {

    // State handling
    const [ name, setName ] = useState('Adrian');
    const [ receiptId, setReceiptID ] = useState(0);
    const [ price1, setPrice1 ] = useState(0);
    const [ price2, setPrice2 ] = useState(0);


    // PDF creation handling
    const createAndDownloadPDF = () => {

        const receipt = {
            name: name,
            receiptId: receiptId,
            price1: price1,
            price2: price2
        };

        console.log('Creating & downloading pdf, using the following receipt info');
        console.log(receipt);

        axios.post('/create-pdf', receipt)
            .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'generatedDocument.pdf')
            })
            .catch(err => console.log('An error occurred, ' + err))
    };

    return (
        <div className="App">
            <input
                type="text" placeholder="Name" name="name"
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number" placeholder="Receipt ID" name="receiptId"
                onChange={e => setReceiptID(e.target.value)}
            />
            <input
                type="number" placeholder="Price 1" name="price1"
                onChange={e => setPrice1(e.target.value)}
            />
            <input
                type="number" placeholder="Price 2" name="price2"
                onChange={e => setPrice2(e.target.value)}
            />

            <button onClick={createAndDownloadPDF}>Create PDF</button>
        </div>
    );
}


// Exports
//////////

export default App;
