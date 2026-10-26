export const formatPhoneNumber = (phone?: string): string => {
    if (!phone) return "";

    const cleaned = phone.replace(/\D/g, '');

    const areaCode = cleaned.slice(0, 3);
    const middle = cleaned.slice(3, 6);
    const last = cleaned.slice(6, 10);

    return `(${areaCode}) ${middle}-${last}`;
}