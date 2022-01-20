import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Searchresult(props) {
    const history = useHistory();
    const [userFriends, getUserFriend] = useState([]);
    const [flag, setFlag] = useState(0);
    const [activeUserId, setActiveUserId] = useState();
    const greetUser = () => {
        getUserFriend(props.location.state)
        setFlag(flag + 1)
    }

    const viewProfile = (id) => {
        history.push({ pathname: '/profile', state: [id] });
    }
    React.useEffect(() => {
        if (flag < 1) {
            greetUser();
            setFlag(flag + 1)
        }
    })
    return (
        <div>
            <p className='peopleYouMayKnow'>Search Results</p>
            <div className='friendCointainer'>
                {userFriends && userFriends.length >= 1 ? userFriends.map(eleme => <div className='friendBox' key={eleme.id}><div className='friendImageHolde' style={{ marginLeft: "29%", marginTop: "4%" }}><img src={eleme.profilePic} style={{ width: "100%", height: "auto", borderRadius: "50%" }} onClick={() => viewProfile(eleme.id)} /></div><div style={{ marginTop: "40%" }}><span style={{ marginLeft: "3%" }}><b>{eleme.firstname}</b></span><span style={{ marginLeft: "3%" }}><b>{eleme.lastname}</b></span></div></div>) : <p>No users Found</p>}
            </div>

        </div>
    )
}
export default Searchresult

