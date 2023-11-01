
export const timestampDateFormat = (date: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
};
