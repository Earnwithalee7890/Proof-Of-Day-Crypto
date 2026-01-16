export const shortenAddress = (address: string, chars = 4): string => {
    if (!address) return ''
    return `${address.substring(0, chars + 2)}...${address.substring(
        address.length - chars
    )}`
}

export const formatCurrency = (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount)
}

export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num)
}
