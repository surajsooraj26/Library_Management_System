import "./AdminDashboard.css";
import UserRegistration from "../../../components/UserRegistration.jsx";
import { useState } from "react";
import ActivityTable from "../../../components/ActivityTable/ActivityTable.jsx";
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm.jsx";
import { useCheckout } from "../../../context/CheckoutContext.jsx";
function AdminDashboard() {
  const { showCheckoutForm, setShowCheckoutForm } = useCheckout();
  return (
    <div className="desktop-container">
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        <div className="box">
          <p className="box-title">Total Books</p>
          <p className="box-value">1,890</p>
        </div>
        <div className="box">
          <p className="box-title">Borrowed Books</p>
          <p className="box-value">100</p>
        </div>
        <div className="box">
          <p className="box-title">Due Books</p>
          <p className="box-value">8</p>
        </div>
      </div>
      <div className="recent-activity">
        <div className="head">
          <h2>Recent Activity Logs</h2>
          <button className="btn" onClick={() => setShowCheckoutForm(true)}>
            Check Out
          </button>
        </div>
        <ActivityTable />
      </div>
      {showCheckoutForm && <CheckoutForm />}
    </div>
  );
}
export default AdminDashboard;
