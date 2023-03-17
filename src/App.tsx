import React, {FC, useEffect, useState} from 'react';
import './App.css';

interface RespI {
    resp: object;
    tracks: [];
    children?: React.ReactNode
}

interface RandI {
    title: null | string,
    realId: null | string
}

const App: FC = () => {
    const [loading, setLoading] = useState(true)
    const [rand, setRand] = useState<RandI>()
    const [resp, setResp] = useState<RespI>(Object)
    const [listen, setListen] = useState<boolean>(false)
    useEffect(() => {
        const setFetch = async () => {
            await fetch('artist.json', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(response => {
                    setResp(response)
                    setRand(response.tracks[Math.floor(Math.random() * 135)])
                    setLoading(false)
                })
        }
        setFetch()
    }, [])
    const getTrack = () => {
        setRand(resp.tracks[Math.floor(Math.random() * 135)])
    }

    return (
        <div className="App">
            <div className={"coolImg"} style={listen ? {animation: '2s infinite linear coolImgSpin'} : {}}><img
                src="https://i.pinimg.com/564x/aa/79/26/aa792605e63bc2e276bbdc1f4c7a6253.jpg" alt=""/></div>
            {/*// @ts-ignore*/}
            <div className="getTrackContainer">
                <button onClick={() => {
                    setListen(false)
                    getTrack()
                }}>ХОЧЮ ТРЕК
                </button>
                <p>MORGENSHTERN - {!loading && rand?.title}</p>
                <div className="search">
                    <button
                        onClick={() => setListen(!listen)
                        }>
                        послушать???
                    </button>
                </div>

                {listen &&
                    <iframe style={{border: 'none', width: '100%', height: '180px'}} width='100%' height='180'
                            allow='autoplay;' title="music"
                            src={`https://music.yandex.ru/iframe/#track/${!loading && rand?.realId}/23812350`}></iframe>
                }
            </div>
        </div>
    );
}

export default App;