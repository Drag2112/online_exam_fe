import moment from 'moment'
import { toast } from 'react-toastify'

export function getLastSevenDay() {
    let result = []

    for (let i = 0; i < 7; i++) {
        let thisDate = new Date()
        let date = new Date(thisDate.setDate(thisDate.getDate() - i))
        result.push(moment(date).format('YYYY-MM-DD'))
    }
    
    return result.reverse()
}

export function initToast(toastId) {
    if (toast.isActive(toastId)) {
        toast.update(toastId, { render: "Đang xử lý ...", isLoading: true })
    } else {
        toast.loading("Đang xử lý ...", { toastId: toastId })
    }
}

export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber || typeof(phoneNumber) !== 'string') {
        return phoneNumber
    }

    const newPhoneNumber = phoneNumber.substring(0, 4) + '.' + phoneNumber.substring(4, 7) + '.' + phoneNumber.substring(7, 10)
    return newPhoneNumber
}

export function getFirstNameCharacter(fullName) {
    if (typeof(fullName) !== 'string') {
        return 'N/A'
    }

    let splitName = fullName.split(' ')
    let mainName = splitName[splitName.length - 1]
    return mainName.charAt(0)
}

export function isValidURL(urlStr) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(urlStr)
}

export function getCountDownTime(totalSeconds) {
    if (typeof(totalSeconds) !== 'number') {
        return '00:00:00'
    }

    let _totalSeconds = totalSeconds
    let hours = Math.floor(_totalSeconds / 3600)

    _totalSeconds = _totalSeconds - hours * 3600
    let minutes = Math.floor(_totalSeconds / 60)
    let seconds = _totalSeconds - minutes * 60
    
    return `0${hours}`.slice(-2) + ':' + `0${minutes}`.slice(-2) + ':' + `0${seconds}`.slice(-2)
}