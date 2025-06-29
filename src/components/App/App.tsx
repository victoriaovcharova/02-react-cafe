import css from './App.module.css'

import CafeInfo from '../CafeInfo/CafeInfo'
import VoteOptions from '../VoteOptions/VoteOptions'
import VoteStats from '../VoteStats/VoteStats'
import Notification from '../Notification/Notification'

import { useState } from 'react'
import type { Votes } from '../../types/votes'
import type { VoteType } from '../../types/votes'


export default function App() {

    const [votes, setVotes] = useState<Votes>({
        good: 0,
        neutral: 0,
        bad: 0,
    })
    
    const handleVote = (type: VoteType) => {
        setVotes({
            ...votes,
            [type]: votes[type] + 1,
        })

    }

    const totalVotes = votes.good + votes.neutral + votes.bad;

    const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;

    const resetVotes = () => {
        setVotes({
            good: 0,
            neutral: 0,
            bad: 0,
        })
    }

    const isReset = totalVotes !== 0;


    return (
        
        <div className={css.app}>
            <CafeInfo />

            <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={isReset} />
            
            {totalVotes > 0 ?
                (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />)
                : (<Notification />)
            
            }
            
        </div>
    )
}