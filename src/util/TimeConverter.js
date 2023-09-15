export function getConvertedTime(time, format) {
    let currentTime = new Date();
    let then = new Date(time);
    let formattedString = "";

    const unixDiff = Math.round((time - currentTime)/1000);

    console.log(unixDiff);
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const yearDiff = then.getFullYear() - currentTime.getFullYear();
    const monthDiff = then.getMonth() - currentTime.getMonth();
    const dayDiff = then.getDate() - currentTime.getDate();

    console.log(unixDiff);

    const isSameDate = 
        dayDiff === 0 &&
        monthDiff === 0 &&
        yearDiff === 0;

    switch(format) {
        case "Relative":
            if(unixDiff < 60 && unixDiff > -60) return `${unixDiff >= 0 ? "in " : ""}${Math.round(Math.abs(unixDiff)) === 1 ? "a second" : unixDiff + " seconds"}${unixDiff < 0 ? " ago" : ""}`;
            if(unixDiff < 3600 && unixDiff > -3600) return `${unixDiff >= 0 ? "in " : ""}${Math.round(Math.abs(unixDiff/60)) === 1 ? "a minute" : Math.round(Math.abs(unixDiff/60)) + " minutes"}${unixDiff < 0 ? " ago" : ""}`;
            if(unixDiff < 86400 && unixDiff > -86400) return `${unixDiff >= 0 ? "in " : ""}${Math.round(Math.abs(unixDiff/3600)) === 1 ? "an hour" : Math.round(Math.abs(unixDiff/3600)) + " hours"}${unixDiff < 0 ? " ago" : ""}`;
            if(unixDiff < 2419200 && unixDiff > -2419200) return `${unixDiff >= 0 ? "in " : ""}${Math.round(Math.abs(unixDiff/86400)) === 1 ? "a day" : Math.round(Math.abs(unixDiff/86400)) + " days"}${unixDiff < 0 ? " ago" : ""}`;
            if(yearDiff === 0) {
                if(monthDiff === 0) {
                    return `${unixDiff >= 0 ? "in " : ""}${unixDiff >= 0 ? then.getDate() - currentTime.getDate() : currentTime.getDate() - then.getDate()} " days"${unixDiff < 0 ? " ago" : ""}`;
                }
                if(monthDiff > 0) {
                    return `${monthDiff === 1 ? "in a month" : "in " + monthDiff + " months"}`;
                }
                if(monthDiff < 0) {
                    return `${monthDiff === -1 ? "a month ago" : Math.abs(monthDiff) + " months ago"}`;
                }
            }
            if(unixDiff > 31557600 || unixDiff < -31557600) return `${unixDiff >= 0 ? "in " : ""}${Math.round(Math.abs(unixDiff/31557600)) === 1 ? "a year" : Math.round(Math.abs(unixDiff/31557600)) + " years"}${unixDiff < 0 ? " ago" : ""}`;
            if (yearDiff === 1) {
                if(then.getMonth() >= currentTime.getMonth()) {
                    return `in a year`;
                } else {
                    return `in ${then.getMonth() - currentTime.getMonth() === 1 ? "a month" : 12 + then.getMonth() - currentTime.getMonth() + " months"}`;
                }
            }
            if (yearDiff === -1) {
                if(then.getMonth() <= currentTime.getMonth()) {
                    return `a year ago`;
                } else {
                    return `${currentTime.getMonth() - then.getMonth() === 1 ? "a month ago" : 12 + currentTime.getMonth() - then.getMonth() + " months ago"}`
                }
            }
            break;
        case "Time":
            formattedString = `${then.getHours() > 12 ? then.getHours() - 12 : then.getHours()}:${then.getMinutes() < 10 ? "0" + then.getMinutes() : then.getMinutes()} ${then.getHours() > 11 ? " PM" : " AM"}`
            break;
        case "Long Time":
            formattedString = `${then.getHours() > 12 ? then.getHours() - 12 : then.getHours()}:${then.getMinutes() < 10 ? "0" + then.getMinutes() : then.getMinutes()}:${then.getSeconds() < 10 ? "0" + then.getSeconds() : then.getSeconds()} ${then.getHours() > 11 ? " PM" : " AM"}`
            break;
        case "Date":
            formattedString = `${then.getMonth() < 10 ? "0" + (then.getMonth() + 1): then.getMonth() + 1}/${then.getDate() < 10 ? "0" + then.getDate() : then.getDate()}/${then.getFullYear()}`
            break;
        case "Long Date":
            formattedString = `${months[then.getMonth()]} ${then.getDate()}, ${then.getFullYear()}`
            break;
        case "Date Time":
            formattedString = `${months[then.getMonth()]} ${then.getDate()}, ${then.getFullYear()} ${then.getHours() > 12 ? then.getHours() - 12 : then.getHours()}:${then.getMinutes() < 10 ? "0" + then.getMinutes() : then.getMinutes()} ${then.getHours() > 11 ? " PM" : " AM"}`
            break;
        case "Date Weekday":
            formattedString = `${weekDays[then.getDay()]}, ${months[then.getMonth()]} ${then.getDate()}, ${then.getFullYear()} ${then.getHours() > 12 ? then.getHours() - 12 : then.getHours()}:${then.getMinutes() < 10 ? "0" + then.getMinutes() : then.getMinutes()} ${then.getHours() > 11 ? " PM" : " AM"}`
            break;
        default:
            if (isSameDate) {
                formattedString = `Today at ${then.getHours() > 12 ? then.getHours() - 12 : then.getHours() > 0 ? then.getHours() : "12" }:${then.getMinutes() < 10 ? "0" + then.getMinutes() : then.getMinutes()} ${then.getHours() > 11 ? " PM" : " AM"}`
            }
            break;
    }
    if(then instanceof Date && !isNaN(then)) {
        return formattedString;
    } else {
        return "Invalid Input"
    }
};