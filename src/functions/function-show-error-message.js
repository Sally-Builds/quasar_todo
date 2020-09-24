import {Dialog, Loading} from 'quasar'

export function showErrorMessage(errMsg) {
    Loading.hide()
    Dialog.create({
        title: 'Error',
        message: errMsg
    })
}