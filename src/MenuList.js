import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
import { Link, useNavigate } from "react-router-dom";


const allCategories = ["all", ...new Set(items.map((item) => item.category))];

const MenuList = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const usenavigate = useNavigate();
   
    const[displayusername,displayusernameupdate]=useState('');
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            usenavigate('/login');
        }else{
            displayusernameupdate(username);
        }

        let jwttoken = sessionStorage.getItem('jwttoken');
        fetch("https://soal.staging.id/api/menu", {
            headers: {
                'Authorization': 'bearer ' + jwttoken
            }
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            console.log(resp);
        }
        ).catch((err) => {
            console.log(err.messsage)
        }
        );

    }, []);


  return (
    <main>
      <div className="header">
      <Link sx={{ my: 1, mx: 1.5 }} to={'/home'}>Home</Link>
                <Link sx={{ my: 1, mx: 1.5 }} to ={'/menulist'}>Menu</Link>
                <Link sx={{ my: 1, mx: 1.5 }} to={'/'}>Logout</Link>
            </div>
      <section className="menu section">
        <div className="title">
         
          <h2>MENU</h2>
         
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
        />
        <Menu items={menuItems} />
      </section>
    </main>
  );
};

export default MenuList;