// Your code here
function createEmployeeRecord(employeeArray){
    let newEmployee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords(arrayOfEmployeeArrays){
    let arrayOfEmployeeRecords = arrayOfEmployeeArrays.map(createEmployeeRecord)
    return arrayOfEmployeeRecords
}

function createTimeInEvent(employeeRecordObj, dateStamp){
    let splitDate = dateStamp.split(" ")
    employeeRecordObj.timeInEvents = [...employeeRecordObj.timeInEvents, {
        type: "TimeIn",
        hour: parseInt(splitDate[1], 10),
        date: splitDate[0]
    }]
    return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, dateStamp){
    let splitDate = dateStamp.split(" ")
    employeeRecordObj.timeOutEvents = [...employeeRecordObj.timeOutEvents, {
        type: "TimeOut",
        hour: parseInt(splitDate[1], 10),
        date: splitDate[0]
    }]
    return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date){
    let timeInEventsArray = employeeRecordObj.timeInEvents
    let timeOutEventsArray = employeeRecordObj.timeOutEvents
    let targetInEvent = timeInEventsArray.find(function(timeInEventObj){
      return timeInEventObj.date === date
    })
    let targetOutEvent = timeOutEventsArray.find(function(timeOutEventObj){
    return timeOutEventObj.date === date
    })
    let hourIn = targetInEvent.hour
    let hourOut = targetOutEvent.hour
    let hourDiff = hourOut - hourIn
    return hourDiff/100
  }

function wagesEarnedOnDate(employeeRecordObj, date){
    let payRate = employeeRecordObj.payPerHour
    let hoursWorked = hoursWorkedOnDate(employeeRecordObj, date)
    return payRate * hoursWorked
}

function allWagesFor(employeeRecordObj){
    let timeInEventArray = employeeRecordObj.timeInEvents
    let dateArray = []
    timeInEventArray.forEach(function(timeInEventObj){
      let {date} = timeInEventObj
      dateArray = [...dateArray, date]
    })
    let wageArray = []
    dateArray.forEach(function(date){
      let wagesEarned = wagesEarnedOnDate(employeeRecordObj, date)
      wageArray.push(wagesEarned)
      return wageArray
    })
  
    let accumulatedWages = wageArray.reduce(function(totalAmount, wages){
      return totalAmount + wages
      })
    return accumulatedWages
}   

function calculatePayroll(arrayOfEmployeeRecords){
    let allEmployeeWages = []
    arrayOfEmployeeRecords.forEach(function(employeeRecordObj){
      let individualWage = allWagesFor(employeeRecordObj)
      allEmployeeWages = [...allEmployeeWages, individualWage]
    })
    let totalWagesAllEmployees = allEmployeeWages.reduce(function(totalAmount, wages){
      return totalAmount + wages
    })
    return totalWagesAllEmployees
}

function findEmployeeByFirstName(arrayOfEmployeeRecords, searchName){
    let matchedEmployee = arrayOfEmployeeRecords.find(function(employeeRecordObj){
       return employeeRecordObj.firstName === searchName
    })
    return matchedEmployee
  }