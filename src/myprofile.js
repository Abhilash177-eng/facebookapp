import React, { useState } from 'react'
function Myprofile(props) {
    let userid = props.location.state[0]
    const [flag, setFlag] = useState(0);
    const [post, setPost] = useState();
    const [userData, setData] = useState();
    const [dp, setDp] = useState();
    const [frienList, getFriendList] = useState([]);
    const [userFriends, getUserFriend] = useState([]);
    const greetUser = async () => {
        let tempDataStore;
        setFlag(flag + 1)
        await fetch(`http://localhost:3000/posts?uid=${userid}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    setPost(data.reverse());
                }
            })
        await fetch(`http://localhost:3000/signup?id=${userid}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    setData(data);
                    let x = data.map(elem => elem.profilePic);
                    setDp(x);
                }
            })

        await fetch(`http://localhost:3000/Friendlist?id_ne=${userid}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    tempDataStore = data;
                }
            })
        await fetch(`http://localhost:3000/friends?uid=${userid}`)
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

    React.useEffect(() => {
        if (flag < 1) {
            greetUser();
        }
    })
    return (
        <div>
            <div className='profilePageImg'>
                {dp && dp.length ? <span style={{ marginLeft: "40%" }}><img src={dp} style={{ width: "100%", height: "auto", borderRadius: "50%" }} /></span> : <span></span>}
            </div>
            <div className='profilePageName'>
                {userData && userData.length >= 1 ? userData.map(elem => <span> {elem.firstname} {elem.lastname}  </span>) : <span> </span>}
            </div>
            <div className='profilePageName' style={{ marginTop: "-6%" }}>
                {userFriends.length} Friends
            </div>
            <p className='peopleYouMayKnow'>Friend List</p>
            <div className='friendCointainer'>
                {userFriends && userFriends.length >= 1 ? userFriends.map(eleme => <div className='friendBox' key={eleme.id}><div className='friendImageHolde' style={{ marginLeft: "29%", marginTop: "4%" }}><img src={eleme.profilePic} style={{ width: "100%", height: "auto", borderRadius: "50%" }} /></div><div style={{ marginTop: "40%" }}><span style={{ marginLeft: "3%" }}><b>{eleme.firstname}</b></span><span style={{ marginLeft: "3%" }}><b>{eleme.lastname}</b></span></div><div className='addFriendButton'>Friends</div></div>) : <p></p>}
            </div>
            <p className='peopleYouMayKnow'>My Posts</p>
            <div className='section2'>
                <div className='posts'>
                    {post && post.length >= 1 ? post.map(elem => <div> <div className='profileImageHolder' style={{ marginLeft: "2%", marginTop: "2%" }}><img src={elem.profileUrl} style={{ width: "100%", height: "auto", borderRadius: "50%" }} /></div> <div style={{ marginLeft: "15%", marginTop: "-8.5%", }}> {elem.profile}</div> <div className='caption' style={{ fontSize: "1.25rem" }}> {elem.caption} </div> <div> <img src={elem.imageUrl} style={{ width: "100%", height: "3%" }} /> </div></div>) : <div> </div>}
                </div>
            </div>
        </div>
    )
}

export default Myprofile
