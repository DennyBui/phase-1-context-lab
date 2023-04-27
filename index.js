/* Your Code Here */
function createEmployeeRecord(testEmployee) {
    return {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
};

const createEmployeeRecords = employees => employees.map(employee => createEmployeeRecord.call(this, employee), this);

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return this;
};

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return this;
};

function hoursWorkedOnDate(date) {
    let TimeIn = this.timeInEvents.find(event => event.date === date)
    let TimeOut = this.timeOutEvents.find(event => event.date === date)
    return (TimeOut.hour - TimeIn.hour) / 100
};

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
};
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};
const findEmployeeByFirstName = function(src, firstName) {
    return src.find(employee => employee.firstName === firstName);
}
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(totalPayroll, employeeRecord) {
        return totalPayroll + allWagesFor.apply(employeeRecord);
    }, 0);
};