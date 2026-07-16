import React from 'react'
import './RealTimeClock.css'

interface RealTimeClockState {
    time: Date
}

class RealTimeClock extends React.Component<object, RealTimeClockState> {
    private timerID: ReturnType<typeof setInterval> | undefined

    constructor(props: object) {
        super(props)
        this.state = {
            time: new Date(),
        }
    }

    componentDidMount() {
        console.log('Clock mounted - Starting interval...')
        this.timerID = setInterval(() => {
            this.setState({
                time: new Date(),
            })
        }, 1000)
    }

    componentWillUnmount() {
        console.log('Clock will unmount - Cleaning up interval...')
        if (this.timerID) {
            clearInterval(this.timerID)
        }
    }

    formatTime(date: Date): string {
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    render() {
        return (
            <div className="clock-card">
                <div className="clock-header">⏰ ĐỒNG HỒ HỆ THỐNG</div>
                <div className="clock-time">{this.formatTime(this.state.time)}</div>
                <div className="clock-date">
                    {this.state.time.toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>
            </div>
        )
    }
}

export default RealTimeClock
