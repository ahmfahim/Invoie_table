import React, { useEffect, useState } from 'react';
import './Table.css';

const _defaultCosts = [
  {
    name: "",
    quantity: '',
    price: '',
    discount: ''
  },
];

const Table = () => {
  const [costs, setCosts] = useState(_defaultCosts);
  const [previousDue, setPreviousDue] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const handleCostsChange = event => {
    const _tempCosts = [...costs];
    _tempCosts[event.target.dataset.id][event.target.name] = event.target.value;

    setCosts(_tempCosts);
  };

  const addRowHandler = () => {
    setCosts(prevCosts => [...prevCosts, { name: "", quantity: '', price: '', discount: '' }]);
  };

  useEffect(() => {
    return costs.reduce((total, item) => {
      let amount = Number((item.price) * (item.quantity));
      let grandTotal = amount - ((amount * Number(item.discount)) / 100);
      setTotalAmount(total + grandTotal);
      return total + grandTotal;
    }, 0);
  })

  let netTotal = totalAmount + Number(previousDue);
  let dueAmount = netTotal - Number(paidAmount);

  return (
    <div className="container-fluid">
      <div className="addInv-table-wrapper mt-5">
        <table>
          <thead>
            <tr >
              <th className="addInv-thead0 text-center">SI</th>
              <th className="addInv-thead1">Medicine Name</th>
              <th className="addInv-thead2">Quantity</th>
              <th className="addInv-thead3">Price</th>
              <th className="addInv-thead4">Discount %</th>
              <th className="addInv-thead6">Action</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((item, index) => {
              return (
                <tr>
                  <td className='addInv-tbody text-center'>{index}</td>
                  <td className="addInv-tbody">
                    <input
                      name="name"
                      data-id={index}
                      type="text"
                      value={item.name}
                      onChange={handleCostsChange} />
                  </td>
                  <td className="addInv-tbody">
                    <input
                      name="quantity"
                      data-id={index}
                      type="number"
                      value={item.quantity}
                      onChange={handleCostsChange}
                    />
                  </td>
                  <td className="addInv-tbody">
                    <input
                      name="price"
                      data-id={index}
                      type="number"
                      value={item.price}
                      onChange={handleCostsChange}
                    />
                  </td>
                  <td className="addInv-tbody">
                    <input
                      name="discount"
                      data-id={index}
                      type="number"
                      value={item.discount}
                      onChange={handleCostsChange}
                    />
                  </td>
                  <td className="addInv-tbody">
                    <button className='invoice-btn4'>delete</button>
                    <button className='invoice-btn3' onClick={() => addRowHandler()}>add</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* --- */}
      <div className="d-flex justify-content-end mt-2">
        <table>
          <tbody>
            <tr>
              <td className='text-end addInv-calc-title'>Grand Total:</td>
              <td className="addInv-calc-input">
                <input
                  value={totalAmount}
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Previous Due:</td>
              <td className="addInv-calc-input">
                <input
                  onChange={(e) => setPreviousDue(e.target.value)}
                  placeholder="Previous Due"
                  type='number'
                />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Net Total:</td>
              <td className="addInv-calc-input">
                <input
                  value={netTotal}
                  name='net_total'
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Paid Amount:</td>
              <td className="addInv-calc-input">
                <input
                  onChange={(e) => setPaidAmount(e.target.value)}
                  placeholder="Paid Amount"
                  type='number'
                />
              </td>
            </tr>
            <tr>
              <td className='text-end addInv-calc-title'>Due Amount:</td>
              <td className="addInv-calc-input">
                <input
                  value={dueAmount}
                  readonly />
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