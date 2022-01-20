import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Friends(props) {
    const history = useHistory();
    const [frienList, getFriendList] = useState([]);
    const [userFriends, getUserFriend] = useState([]);
    const [flag, setFlag] = useState(0);
    const [activeUserId, setActiveUserId] = useState();
    const greetUser = async () => {
        let x = props.location.state.map(elem => elem.id);
        let tempDataStore;
        setActiveUserId(x[0])
        await fetch(`http://localhost:3000/Friendlist?id_ne=${x[0]}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    tempDataStore = data;
                    setFlag(flag + 1)
                }
            })
        await fetch(`http://localhost:3000/friends?uid=${x[0]}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    let x = data.map(elem => elem.friendId);
                    for (let i = 0; i < x.length; i++) {
                        let xval = x[i];
                        for (let i = 0; i < tempDataStore.length; i++) {
                            if (tempDataStore[i].id === xval) {
                                getUserFriend(arr => [...arr, tempDataStore[i]]);
                                tempDataStore.splice(i, 1)
                            }
                        }
                    }
                    getFriendList(tempDataStore)
                }
                else {
                    getFriendList(tempDataStore)
                }
            })
    }
    const addFriend = async (id) => {
        await fetch(`http://localhost:3000/friends`, {
            method: 'POST', body: JSON.stringify({
                uid: activeUserId, friendId: id
            }), headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        window.location.reload()
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
            <p className='peopleYouMayKnow'>Friend List</p>
            <div className='friendCointainer'>
                {userFriends && userFriends.length >= 1 ? userFriends.map(eleme => <div className='friendBox' key={eleme.id}><div className='friendImageHolde' style={{ marginLeft: "29%", marginTop: "4%" }}><img src={eleme.profilePic} style={{ width: "100%", height: "auto", borderRadius: "50%" }} onClick={() => viewProfile(eleme.id)} /></div><div style={{ marginTop: "40%" }}><span style={{ marginLeft: "3%" }}><b>{eleme.firstname}</b></span><span style={{ marginLeft: "3%" }}><b>{eleme.lastname}</b></span></div><div className='addFriendButton' onClick={() => addFriend(eleme.id)}>Friends</div></div>) : <p></p>}
            </div>
            <p className='peopleYouMayKnow'>People you may know</p>
            <div className='friendCointainer'>
                {frienList && frienList.length >= 1 ? frienList.map(eleme => <div className='friendBox' key={eleme.id}><div className='friendImageHolde' style={{ marginLeft: "29%", marginTop: "4%" }}><img src={eleme.profilePic} style={{ width: "100%", height: "auto", borderRadius: "50%" }} onClick={() => viewProfile(eleme.id)} /></div><div style={{ marginTop: "40%" }}><span style={{ marginLeft: "3%" }}><b>{eleme.firstname}</b></span><span style={{ marginLeft: "3%" }}><b>{eleme.lastname}</b></span></div><div className='addFriendButton' onClick={() => addFriend(eleme.id)}>Add Friend </div></div>) : <p></p>}
            </div>
        </div>
    )
}
export default Friends
