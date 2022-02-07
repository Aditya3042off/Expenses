import React, { useEffect, useState } from "react";
import axios from "axios";
import NewExpense from "./NewExpense/NewExpense";
import Expenses from "./Expenses/Expenses";
import { useNavigate } from "react-router-dom";


import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [userExpenses, setUserExpenses] = useState([]);


  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    const token = localStorage.getItem("token");

    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/home", { headers: { Authorization: `Bearer ${token}` } });
        // console.log(response);
        const { expenseList } = response.data;
        setUserExpenses(prevState => {
          return (
            expenseList.map(expense => {
              //convert ISODate to Date. by default dates are stored as ISODates in mongo database
              let date = new Date(expense.date);
              date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
              return {
                id: expense._id,
                title: expense.title,
                amount: expense.amount,
                date: date
              };
            })
          );
        });
      } catch (err) {
        console.log(err.response);
      }
    };
    getData();
  }, []);


  const addUserExpenseHandler = (expense) => {
    if (!localStorage.getItem("token")) navigate("/");
    const token = localStorage.getItem("token");

    const getData = async () => {
      const response = await axios.post("http://localhost:8000/expense/save", {
        title: expense.title,
        amount: expense.amount,
        date: expense.date
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      const { expenseList } = response.data;
      setUserExpenses(prevState => {
        return (
          expenseList.map(expense => {
            //convert ISODate to Date. by default dates are stored as ISODates in mongo database
            let date = new Date(expense.date);
            date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
            return {
              id: expense._id,
              title: expense.title,
              amount: expense.amount,
              date: date
            };
          })
        );
      });
    };
    getData();
  };

  const logoutHandler = () => {
    navigate("/");
    setUserExpenses([]);
    localStorage.clear();
  };

  return (
    <div>
      <div className={"btn-container"}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <NewExpense onAddExpense={addUserExpenseHandler} />
      <Expenses items={userExpenses} />
    </div>
  );
};

export default Home;
