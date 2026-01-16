export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const isValidUrl = (urlString: string): boolean => {
    try {
        return Boolean(new URL(urlString))
    } catch (e) {
        return false
    }
}

export const isValidEthAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
}
