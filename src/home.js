import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faHome, faUserFriends, faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
function Home(props) {
    const history = useHistory();
    const [post, setPost] = useState();
    const [flag, setFlag] = useState(0);
    const [userData, setData] = useState();
    const [showProfile, showDiv] = useState(0);
    const [dp, setDp] = useState();
    const greetUser = async () => {
        await fetch(`http://localhost:3000/posts`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    setPost(data.reverse());
                    setFlag(flag + 1)
                    setData(props.location.state);
                    // let x = props.location.state.map(elem => elem.profilePic);
                    // setDp(x);
                }
            })
        let id = props.location.state.map(elem => elem.id);
        await fetch(`http://localhost:3000/signup?id=${id[0]}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    let x = data.map(elem => elem.profilePic);
                    setDp(x);
                }
            })

    }
    const setProfilePic = () => {
        if (showProfile === 1) {
            showDiv(0);
        }
        else {
            showDiv(1);
        }
    }

    const getFilePath = (event) => {
        let baseUrl
        if (event.target.files) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = async (event1) => {
                baseUrl = event1.target.result;
                let id = userData.map(elem => elem.id);
                await fetch(`http://localhost:3000/signup/${id}`, {
                    method: 'PATCH', body: JSON.stringify({
                        profilePic: baseUrl
                    }), headers: { "Content-Type": "application/json;charset=UTF-8" }
                })
                await fetch(`http://localhost:3000/Friendlist/${id}`, {
                    method: 'PATCH', body: JSON.stringify({
                        profilePic: baseUrl
                    }), headers: { "Content-Type": "application/json;charset=UTF-8" }
                })
                setDp(baseUrl);
            }
        }
        showDiv(0);
    }
    const uploadPic = () => {
        let profileUrl = userData.map(elem => elem.profilePic);
        if (profileUrl[0] === undefined) {
            userData[0].profilePic = dp;
            history.push({ pathname: '/post', state: userData });
        }
        else {
            history.push({ pathname: '/post', state: userData });
        }
    }
    const friendList = () => {
        history.push({ pathname: '/friends', state: userData });
    }

    const myProfile = () => {
        let id = userData.map(elem => elem.id);
        history.push({ pathname: '/profile', state: id });
    }

    const searchUser = async (event) => {
        if (event.which === 13) {
            let id = userData.map(elem => elem.id);
            await fetch(`http://localhost:3000/Friendlist?firstname_like=^${event.target.value}&id_ne=${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.length) {
                        history.push({ pathname: '/searchresult', state: data });
                    }
                })
        }
    }


    React.useEffect(() => {
        if (flag < 1) {
            greetUser();
        }

    })
    return (
        <div>
            <div className='homenav'>
                <FontAwesomeIcon icon={faFacebook} className='facebookicon'></FontAwesomeIcon>
                <input type='search' id='input1' onKeyUp={searchUser} className='searchBox' placeholder='Search Facebook' />
                <FontAwesomeIcon icon={faHome} className='facebookHome' onClick={() => window.location.reload()} ></FontAwesomeIcon>
                <FontAwesomeIcon icon={faUserFriends} className='fbFriends' style={{ marginLeft: "6%" }} onClick={friendList}></FontAwesomeIcon>
                {dp && dp.length ? <span style={{ marginLeft: "40%" }}><img src={dp} style={{ width: "30px", height: "auto", borderRadius: "50%" }} onClick={myProfile} /></span> : <span></span>}
                {userData && userData.length >= 1 ? userData.map(elem => <span style={{ marginLeft: "1%" }}> {elem.firstname} </span>) : <span> </span>}
                <span style={{ marginLeft: "30px", cursor: "pointer" }} onClick={uploadPic}><FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon></span>
                <span style={{ marginLeft: "30px", cursor: "pointer" }} onClick={setProfilePic}><FontAwesomeIcon icon={faCog} ></FontAwesomeIcon></span>
            </div>
            <div className='homecontent'>
                <div className='section1'> </div>
                <div className='section2'>
                    <div className='posts'>
                        {post && post.length >= 1 ? post.map(elem => <div> <div className='profileImageHolder' style={{ marginLeft: "2%", marginTop: "2%" }}><img src={elem.profileUrl} style={{ width: "100%", height: "auto", borderRadius: "50%" }} /></div> <div style={{ marginLeft: "15%", marginTop: "-8.5%", }}> {elem.profile}</div> <div className='caption'> {elem.caption} </div> <div> <img src={elem.imageUrl} style={{ width: "100%", height: "3%" }} /> </div></div>) : <div> </div>}
                    </div>
                </div>
                <div className='section3'>
                    {showProfile === 1 ? <div className='settingsDiv'>  <span><input type="file" id="myfile" name="myfile" onChange={getFilePath} /></span> </div> : <div> </div>}
                </div>
            </div>
        </div>
    )
}
export default Home