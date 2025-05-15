export const validatePhoneNumber = (value: string): string => {
console.log(value)
    if (!/^\d*$/.test(value) || value.length > 11) return "شماره فقط باید عدد و حداکثر 11 رقم باشد.";

    return "";
  };
  