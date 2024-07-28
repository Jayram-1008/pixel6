import { useState } from 'react';
import './App.css';
import UserLists from './UserLists';
import InfiniteScrollUserList from './InfiniteScrollUserList';

function App() {
  const [resultYtpe, setResultType] = useState("paging")
  return (
    <>
      <div style={{width:'100%', border:'1px solid gray', borderRadius:'10px' }}>
        <div style={{display:'flex', justifyContent:'space-between', padding:'10px 20px' }}>  
          <img  src='https://pixel6.co/wp-content/themes/new-pixel6-wp/screenshot.png' style={{width:'50px',height:'50px',borderRadius:'50%', objectFit:'cover', mixBlendMode:'multiply'}} alt=''/>
          <select onChange={(e) => setResultType(e.target.value)}>
            <option value="paging">Paging</option>
            <option value="infinite">Infinite Scroll</option>
          </select>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxM5ql2S6H5ODRD4Ol4RFcTwCXoL4d53Z9Rg&s' alt='' style={{width:'50px',height:'50px',borderRadius:'50%', objectFit:'cover', mixBlendMode:'multiply'}}/>
        </div>
        
        {
          resultYtpe === "paging" ? 
          ( <div style={{border:'1px solid gray',borderRadius:'10px', padding:'10px 20px', margin:'10px'}}>
              <UserLists/>
            </div>
          ) 
          :
          (
            <InfiniteScrollUserList/>
          )
        }
      </div>

    </>
  );
}

export default App;
