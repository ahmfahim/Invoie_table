import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [medicine_name, setMedicine_name] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [previousDue, setPreviousDue] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [noOfRows, setNoOfRows] = useState(1);

  let amount = (quantity * price);
  let total = amount - ((amount * discount) / 100);

  let grandTotal = total;
  let netTotal = grandTotal + Number(previousDue);
  let DueAmount = netTotal - Number(paidAmount);

  const deleteRowHandler = () => {
    let count = 1;
    if (noOfRows > count) {
      setNoOfRows(noOfRows - 1)
    }
  }

  const addRowHandler = () => {
    setNoOfRows(noOfRows + 1)
  }

  return (
    <div className="container-fluid">
      <div className='d-flex justify-content-between'>
        <div className=''>
          <h3>Add Invoice</h3>
        </div>
        <div>
          <button className='invoice-btn1'>Invoice List</button>
        </div>
      </div>
      <hr />
      <div className='customer info'>
        <div className='row'>
          <div className='col-6'>
            <div className='d-flex align-items-center text-end addInv-cInfo-wrapper'>
              <p className="addInv-cInfo-title">Customer Name* :</p>
              <input className="addInv-cInfo-input" placeholder="Customer Name" type="text" />
            </div>
            <div className='d-flex align-items-center text-end addInv-cInfo-wrapper'>
              <p className="addInv-cInfo-title">Invoice Number* :</p>
              <input className="addInv-cInfo-input" placeholder="Invoice Number" type="text" />
            </div>
            <div className='d-flex align-items-center text-end addInv-cInfo-wrapper'>
              <p class="addInv-cInfo-title" for="inputGroupSelect01">Payment Type* :</p>
              <select class="form-select addInv-cInfo-input" id="inputGroupSelect01">
                <option selected>Cash Payment</option>
                <option value="1">Bank Payment</option>
              </select>
            </div>
          </div>
          <div className='col-6'>
            <div className="d-flex align-items-center text-end addInv-cInfo-wrapper">
              <p className="addInv-cInfo-title">Date* :</p>
              <input className="addInv-cInfo-input" value={new Date()} />
            </div>
            <div className="d-flex align-items-center text-end addInv-cInfo-wrapper">
              <p className="addInv-cInfo-title">Details* :</p>
              <input className="addInv-cInfo-input" type="textarea" placeholder="Enter his Details" />
            </div>
          </div>
        </div>
      </div>
      {/* -------------- */}
      <div className="addInv-table-wrapper mt-5">
        <table>
          <thead>
            <tr >
              <th className="addInv-thead0 text-center">SI</th>
              <th className="addInv-thead1">Medicine Name</th>
              <th className="addInv-thead2">Quantity</th>
              <th className="addInv-thead3">Price</th>
              <th className="addInv-thead4">Discount %</th>
              <th className="addInv-thead5">Total</th>
              <th className="addInv-thead6">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(noOfRows)].map((elementInArray, index) => {
              return (
                <tr>
                  <td className='addInv-tbody text-center'>{index}</td>
                  <td className="addInv-tbody">
                    <input onChange={(e) => setMedicine_name(e.target.value)} placeholder="Medicine Name" name='medicine_name' type='text'></input>
                  </td>
                  <td className="addInv-tbody">
                    <input onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" name='quantity' type='number'></input>
                  </td>
                  <td className="addInv-tbody">
                    <input onChange={(e) => setPrice(e.target.value)} placeholder="Price" name='price' type='number'></input>
                  </td>
                  <td className="addInv-tbody">
                    <input onChange={(e) => setDiscount(e.target.value)} placeholder="0.00%" name='discount' type='number'></input>
                  </td>
                  <td className="addInv-tbody">
                    <input value={total} readonly />
                  </td>
                  <td className="addInv-tbody">
                    <button className='invoice-btn4' onClick={() => deleteRowHandler()}>delete</button>
                    <button className='invoice-btn3' onClick={() => addRowHandler()}>add</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* --------- */}
      <div className="d-flex justify-content-end mt-2">
        <table>
          <tbody>
            <tr>
              <td className='text-end addInv-calc-title'>Grand Total:</td>
              <td className="addInv-calc-input">
                <input value={grandTotal} name='grand_total' readonly />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Previous Due:</td>
              <td className="addInv-calc-input">
                <input onChange={(e) => setPreviousDue(e.target.value)} placeholder="Previous Due" type='number' name='previous_due' />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Net Total:</td>
              <td className="addInv-calc-input">
                <input value={netTotal} name='net_total' readonly />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Paid Amount:</td>
              <td className="addInv-calc-input">
                <input onChange={(e) => setPaidAmount(e.target.value)} placeholder="Paid Amount" type='number' name='paid_amount' />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Due Amount:</td>
              <td className="addInv-calc-input">
                <input value={DueAmount} name='due_amount' readonly />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* --------------- */}
      <div className="d-flex justify-content-end mt-3">
        <button className="invoice-btn1">Save</button>
        <button onClick={window.print} className="invoice-btn2">Paid</button>
      </div>

    </div>
  );
};

export default Table;