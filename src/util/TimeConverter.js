export function getConvertedTime(time, format) {
    let currentTime = new Date();
    let then = new Date(time);
    let formattedString = "";

    const unixDiff = time - currentTime;
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const yearDiff = then.getFullYear() - currentTime.getFullYear();
    const monthDiff = then.getMonth() - currentTime.getMonth();
    const dayDiff = then.getDate() - currentTime.getDate();

    const isSameDate = 
        dayDiff === 0 &&
        monthDiff === 0 &&
        yearDiff === 0;

    console.log(unixDiff);

    switch(format) {
        case "Relative":
            if(unixDiff < 1000 && unixDiff > -1000) return "Now";
            if(yearDiff >= 1) {
                if(monthDiff >= 0) {
                    
                }
            } else if(yearDiff <= -1) {
                if(monthDiff <= 0) {

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
                formattedString = `Today at ${then.getHours() > 12 ? then.getHours() - 12 : then.getHours()}:${then.getMinutes() < 10 ? "0" + then.getMinutes() : then.getMinutes()} ${then.getHours() > 11 ? " PM" : " AM"}`
            }
            break;
    }
    if(then instanceof Date && !isNaN(then)) {
        return formattedString;
    } else {
        return "Invalid Input"
    }
};