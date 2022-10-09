import {FormItemRule} from 'naive-ui'

export function validateFirstName(rule: FormItemRule, value: string): boolean {
    if (value && !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(value)) {
        return false
    }
    return true
}

export function validateLastName(rule: FormItemRule, value: string): boolean {
    if (value && !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(value)) {
        return false
    }
    return true
}

export function validateEmail(rule: FormItemRule, value: string): boolean {
    if (value && !/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value)) {
        return false
    }
    return true
}

export function validatePhone(rule: FormItemRule, value: string): boolean {
    if (value && !/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(value)) {
        return false
    }
    return true
}

export function validateIsValue(rule: FormItemRule, value: string): boolean {
    return !!value
}

export function validateAge(rule: FormItemRule, value: string): boolean {
    const differenceInMs: number = Date.now() - parseInt(value)
    const checkYear: number = Math.floor(differenceInMs / 31536000000)
    return !(value && checkYear < 18)
}