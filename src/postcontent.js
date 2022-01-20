import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
function Postcontent(props) {
    const history = useHistory();
    const [flag, setFlag] = useState(0);
    const [userData, setData] = useState();
    const [dp, setDp] = useState();
    const [image, getImagePath] = useState();
    const greetUser = async () => {
        setData(props.location.state);
        // let x = props.location.state.map(elem => elem.profilePic)
        let id = props.location.state.map(elem => elem.id);
        await fetch(`http://localhost:3000/signup?id=${id[0]}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length) {
                    let pic = data.map(elem => elem.profilePic)
                    setDp(pic[0]);
                }
            })
        setFlag(flag + 1)
    }
    const postContent = () => {
        let firstname = userData.map(elem => elem.firstname);
        let lastname = userData.map(elem => elem.lastname);
        let fullname = firstname.concat(" ", lastname);
        let x = props.location.state.map(elem => elem.id);
        fetch(`http://localhost:3000/posts`, {
            method: 'POST', body: JSON.stringify({
                profile: fullname, profileUrl: dp, caption: document.getElementById('caption').value, imageUrl: image, uid: x
            }), headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        history.push({ pathname: '/home', state: userData });
    }
    const getFilePath = (event) => {
        let baseUrl
        if (event.target.files) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event1) => {
                baseUrl = event1.target.result;
                getImagePath(baseUrl)
            }
        }
    }
    React.useEffect(() => {
        if (flag < 1) {
            greetUser();
        }
    })

    return (

        <div className='postImages'>
            <p className='createPostStyle'>Create post</p>
            <div className='extraArrow' style={{ width: "97%", marginLeft: "0.1%", marginTop: "-4%" }}> </div>
            <div style={{ marginTop: "1%", position: "absolute", marginLeft: "4%" }}>
                {dp && dp.length ? <span><img src={dp} style={{ width: "50px", height: "auto", borderRadius: "50%" }} /></span> : <span></span>}
                {userData && userData.length >= 1 ? userData.map(elem => <span> {elem.firstname} </span>) : <span> </span>}
                {userData && userData.length >= 1 ? userData.map(elem => <span> {elem.lastname} </span>) : <span> </span>}
            </div>
            <input id='caption' type='text' className='postCapInput' placeholder="What's on your mind" style={{ width: "78%" }} />
            <input style={{ marginTop: "45%", marginLeft: "10%" }} onChange={getFilePath} type="file" />
            <button className='newAccountButton' onClick={postContent} style={{ marginTop: "50px", width: "90%", height: "6%", marginLeft: "5%", backgroundColor: "blue" }}>post</button>
        </div>

    )
}
export default Postcontent
