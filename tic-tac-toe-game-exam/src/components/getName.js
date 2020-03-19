import axios from 'axios';


const GetName = async(winnerName) => {
        const removeSpace = winnerName ? winnerName.split(' ')[0]: '';
        const playerName = await axios.get(`/db/showPlayer/${removeSpace}`).then(res => res.data)
        return playerName;
}

export default GetName;