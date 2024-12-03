import React, { useState } from "react";

const FormInput = () => {
  const [numberInv, setNumberInv] = useState("");
  const [clientName, setClientName] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [clientList, setClientList] = useState([
    "Client A",
    "Client B",
    "Client C",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [invoiceSearchTerm, setInvoiceSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState("newest");

  const validateInputs = () => {
    const newErrors = {};
    if (!numberInv) newErrors.numberInv = "Invoice number is required.";
    if (!clientName) newErrors.clientName = "Client name is required.";
    if (!itemName) newErrors.itemName = "Item name is required.";
    if (quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
    if (amount <= 0) newErrors.amount = "Amount must be greater than 0.";
    return newErrors;
  };

  const handleAddOrEditInvoice = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === editId
            ? {
                ...invoice,
                numberInv,
                clientName,
                itemName,
                quantity,
                amount,
                total: quantity * amount,
              }
            : invoice
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newInvoice = {
        id: Date.now(),
        numberInv,
        clientName,
        itemName,
        quantity,
        amount,
        total: quantity * amount,
        date: new Date().toISOString(),
      };

      setInvoices([...invoices, newInvoice]);
    }

    resetForm();
  };

  const handleEdit = (id) => {
    const invoiceToEdit = invoices.find((invoice) => invoice.id === id);
    if (invoiceToEdit) {
      setNumberInv(invoiceToEdit.numberInv);
      setClientName(invoiceToEdit.clientName);
      setItemName(invoiceToEdit.itemName);
      setQuantity(invoiceToEdit.quantity);
      setAmount(invoiceToEdit.amount);
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );
    if (isConfirmed) {
      setInvoices(invoices.filter((invoice) => invoice.id !== id));
    }
  };

  const resetForm = () => {
    setNumberInv("");
    setClientName("");
    setItemName("");
    setQuantity(0);
    setAmount(0);
    setErrors({});
  };

  const filteredInvoices = invoices
    .filter(
      (invoice) =>
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        invoice.numberInv.toString().includes(invoiceSearchTerm)
    )
    .sort((a, b) =>
      sortByDate === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>{isEditing ? "Edit Invoice" : "Add Invoice"}</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Number Invoice</label>
        <input
          type="number"
          value={numberInv}
          onChange={(e) => setNumberInv(e.target.value)}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        />
        {errors.numberInv && <p style={{ color: "red" }}>{errors.numberInv}</p>}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Client Name</label>
        <select
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        >
          <option value="">Select a client</option>
          {clientList.map((client, index) => (
            <option key={index} value={client}>
              {client}
            </option>
          ))}
        </select>
        {errors.clientName && (
          <p style={{ color: "red" }}>{errors.clientName}</p>
        )}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Item Name</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        />
        {errors.itemName && <p style={{ color: "red" }}>{errors.itemName}</p>}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        />
        {errors.quantity && <p style={{ color: "red" }}>{errors.quantity}</p>}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
        />
        {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleAddOrEditInvoice}
          style={{ padding: "10px 20px" }}
        >
          {isEditing ? "Save Changes" : "Add Invoice"}
        </button>
        {isEditing && (
          <button
            onClick={resetForm}
            style={{ padding: "10px 20px", marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Search and Filter</h3>
        <input
          type="text"
          placeholder="Search by client name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Search by invoice number"
          value={invoiceSearchTerm}
          onChange={(e) => setInvoiceSearchTerm(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <select
          value={sortByDate}
          onChange={(e) => setSortByDate(e.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div>
        <h3>Invoices</h3>
        {filteredInvoices.length > 0 ? (
          <table
            border="1"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>Number</th>
                <th>Client</th>
                <th>Item</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.numberInv}</td>
                  <td>{invoice.clientName}</td>
                  <td>{invoice.itemName}</td>
                  <td>{invoice.total}</td>
                  <td>{new Date(invoice.date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(invoice.id)}>Edit</button>
                    <button
                      onClick={() => handleDelete(invoice.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
