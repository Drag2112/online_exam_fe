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