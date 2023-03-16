import React, {FC, useEffect, useState} from 'react';
import './App.css';

interface respI {
    tracks: []
}

const App: FC<respI> = () => {
    const [loading, setLoading] = useState(true)
    const [rand, setRand] = useState<any>()
    const [resp, setResp] = useState<any>()
    useEffect(() => {
        fetch('artist.json', {
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
    }, [])

    const getTrack = () => {
        setRand(resp.tracks[Math.floor(Math.random() * 135)])
    }
    return (
        <div className="App">
            <div className={"coolImg"}><img
                src="https://i.pinimg.com/564x/aa/79/26/aa792605e63bc2e276bbdc1f4c7a6253.jpg" alt=""/></div>
            <div className="getTrackContainer">
                <button onClick={() => {
                    getTrack()
                }}>ХОЧЮ ТРЕК
                </button>
                <p>MORGENSHTERN - {!loading && rand.title}</p>
                <div className="search">
                    <button
                        onClick={() => window.open(`https://www.youtube.com/results?search_query=MORGENSHTERN+ - +${rand.title}`)}>
                        послушать???
                    </button>
                </div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/cdk4hVPN_F0?autoplay=1"
                        title="YouTube video player" frameBorder="0"
                        allow="autoplay"
                        allowFullScreen>
                </iframe>
            </div>
        </div>
    );
}

export default App;
