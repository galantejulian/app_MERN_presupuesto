import axios from 'axios';
import React from 'react'
import './Movements.css';
import { useState, useEffect } from 'react';

export default function Movements() {
    // states
    const [movements, setMovements] = useState([])
    const [token, setToken] = useState('')
    const [newMovement, setnewMovement] = useState({
        concept: "",
        amount: "",
        date: ""
    })
    const [total, setTotal] = useState(0)


    const URIbase = `http://app-presupuesto-mern.herokuapp.com`
    // auth token
    useEffect(() => {
        setToken(localStorage.getItem('tokenStore'))
        if (token) {
            getTransactions(token)
        }
    }, [token])

    useEffect(() => {
        if (movements.length > 0) {
            let total = 0
            movements.map(movement => {
                total += (+movement.amount)
            })
            setTotal(total)
        } else {
            setTotal(0)
        }
    }, [movements])


    // get all transactions
    const getTransactions = async (token) => {
        try {
            const res = await axios.get(`${URIbase}/api/movements`, {
                headers: { Authorization: token }
            })
            setMovements(res.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    // delete transaction
    const deleteMovement = async (id) => {
        try {
            if (token) {
                await axios.delete(`${URIbase}/api/movements`, {
                    headers: { Authorization: token },
                    data: { id: id }
                })
                getTransactions(token)
            }
        } catch (error) {
            window.location.href = "/";

        }
    }

    // create movement
    const createMovement = async e => {
        try {
            e.preventDefault()
            const token = localStorage.getItem('tokenStore')
            if (token) {
                await axios.post(`${URIbase}/api/movements`, newMovement, {
                    headers: { Authorization: token }
                })
                setMovements([...movements, newMovement])
            }
        } catch (error) {

        }
    }

    // input changes

    const handleInputChange = e => {
        const { name, value } = e.target
        setnewMovement({ ...newMovement, [name]: value })
    }

    // logout
    const logout = () => {
        localStorage.clear()
        window.location.replace('')
    }



    return (
        <div className="trackerBlock">
            {/* money total */}
            <div className="welcome">
                <span>Hello! you have:</span>
                <button className='exit' onClick={logout}>logout</button>
            </div>
            <div className="totalMoney">${total}</div>

            {/* new transaction */}
            <div className="newTransactionBlock">
                <div className="newTransaction">
                    <form onSubmit={createMovement}>
                        <input
                            placeholder='Movement Concept'
                            type="text"
                            name="concept"
                            onChange={handleInputChange}
                        />
                        <div className="inputGroup">
                            <input
                                placeholder='Amount'
                                type="number"
                                name="amount"
                                onChange={handleInputChange}
                            />
                            <input
                                placeholder='Date'
                                type="date"
                                name="date"
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="addTransaction">+ Add Transaction</button>
                    </form>
                </div>
            </div>
            {/* last transactions */}
            <div className="latestTransactions">
                <p>Latest Transactions</p>
                {
                    movements
                        .sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
                        .map(function (movement, i) {
                            return (
                                <div key={i}>
                                    <ul>
                                        <li>
                                            <div>{movement.concept}</div>
                                            <div>{movement.date}</div>
                                            <div><button className='delete' onClick={() => deleteMovement(movement._id)}>x</button></div>
                                            <div>{movement.amount}</div>

                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                }

            </div>
        </div>


    )
}

