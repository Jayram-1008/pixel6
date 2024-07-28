import React, { useEffect, useState, useCallback } from 'react';
import UserData from './Components/UserData';

const API = "https://dummyjson.com/users";
const ITEMS_PER_PAGE = 10;

const InfiniteScrollUserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [order, setOrder] = useState("ASC");

    const [genderFilter, setGenderFilter] = useState("");
    const [cityFilter, setCityFilter] = useState("");

    // This function is helpful for filtering the userLists according to the city
    const getUniqueCities = (users) => {
        const cities = users.map(user => user.address.city);
        return [...new Set(cities)];  // Return unique city names using Set
    }

    // Get array of unique city names
    const uniqueCities = getUniqueCities(users);  

    // we pass this filteredUser as a props in the UserData Component
    const filteredUsers = users.filter(user => {
        return (genderFilter ? user.gender === genderFilter : true) && 
               (cityFilter ? user.address.city === cityFilter : true);
    });

    // This is responsible for reset out filter 
    const resetFilters = () => {
        setGenderFilter("");
        setCityFilter("");
    };

    // This is the main funciton for fetching the userData
    const fetchUsers = useCallback(async (page) => {
        setLoading(true);
        try {
            const res = await fetch(`${API}?limit=${ITEMS_PER_PAGE}&skip=${(page-1) * ITEMS_PER_PAGE}`);
            const data = await res.json();
            if (data.users && data.users.length > 0) {
                setUsers(prevUsers => [...prevUsers, ...data.users]);
                setHasMore(data.users.length === ITEMS_PER_PAGE);
            } else {
                setHasMore(false);
            }
            console.log("Fetched data for page:", page, data.users); // Debug log
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // This useEffect is responsible for fetching the UserData from API when page first time loading and it is dependent on the page                    
    useEffect(() => {
        fetchUsers(page);
    }, [page, fetchUsers]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && !loading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);


    const sorting = (col) => {
        const sorted = [...users].sort((a, b) => {
            if (typeof a[col] === 'string') {
                return order === "ASC"
                    ? a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
                    : a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
            } else {
                return order === "ASC"
                    ? a[col] > b[col] ? 1 : -1
                    : a[col] < b[col] ? 1 : -1;
            }
        });
        setUsers(sorted);
        setOrder(order === "ASC" ? "DESC" : "ASC");
    }

    return (
        <div style={{padding:'10px'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <h4>EMPLOYEE</h4>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px'}}>
                <select onChange={(e) => setGenderFilter(e.target.value)} value={genderFilter}>
                    <option value="">Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <select onChange={(e) => setCityFilter(e.target.value)} value={cityFilter}>
                    <option value="">Cities</option>
                    {uniqueCities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
                <button onClick={resetFilters}>Reset</button>
            </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sorting('id')}>ID</th>
                        <th onClick={() => sorting('firstName')}>Name</th>
                        <th onClick={() => sorting('age')}>Age</th>
                        <th onClick={() => sorting('gender')}>Gender</th>
                        <th onClick={() => sorting('address.city')}>Address</th>
                        <th onClick={() => sorting('email')}>Email</th>
                        <th onClick={() => sorting('phone')}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <UserData users={filteredUsers}/>
                </tbody>
            </table>
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default InfiniteScrollUserList;
