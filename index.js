function createEmployeeRecord(array){
       return {
            firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
        };
}

function createEmployeeRecords(array){
    let newArray = [];
    
    array.forEach(record => {
        let newRecord = createEmployeeRecord(record);
        newArray.push(newRecord);
    })
    return newArray;
}

function createTimeInEvent(object, dateStamp){
    let [date, hour] = dateStamp.split(" ");

    object.timeInEvents.push({
        type: "TimeIn",
        hour: Math.round(hour),
        date: date
    })
    return object;
}

function createTimeOutEvent(object, dateStamp){
    let [date, hour] = dateStamp.split(" ");

    object.timeOutEvents.push({
        type: "TimeOut",
        hour: Math.round(hour),
        date: date
    })
    return object;
}

function hoursWorkedOnDate(object, date) {
    let timeIn = object.timeInEvents.find(event => event.date === date);
    let timeOut = object.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(object, date){
    return (hoursWorkedOnDate(object, date) * object.payPerHour);
}

function allWagesFor(object){
    let workedDates = object.timeInEvents.map(event => event.date);

    return workedDates.reduce((total, date) => { return total + wagesEarnedOnDate(object, date)}, 0);

}

function calculatePayroll(array) {
    return array.reduce((totalPayroll, record) => {
        return totalPayroll + allWagesFor(record);
    }, 0);
}
