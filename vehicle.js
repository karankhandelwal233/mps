var Vehicle = /** @class */ (function () {
    function Vehicle() {
        this.vehicleCompany = '';
        this.vehicleType = '';
        this.vehicleNo = '';
        this.empId = '';
    }
    Vehicle.prototype.setVehicleCompany = function (vehicleCompany) {
        this.vehicleCompany = vehicleCompany;
    };
    Vehicle.prototype.setVehicleType = function (vehicleType) {
        this.vehicleType = vehicleType;
    };
    Vehicle.prototype.setVehicleNo = function (vehicleNo) {
        this.vehicleNo = vehicleNo;
    };
    Vehicle.prototype.setEmployeeId = function (empId) {
        this.empId = empId;
    };
    Vehicle.prototype.getVehicleCompany = function () {
        return this.vehicleCompany;
    };
    Vehicle.prototype.getVehicleType = function () {
        return this.vehicleType;
    };
    Vehicle.prototype.getVehicleNo = function () {
        return this.vehicleNo;
    };
    Vehicle.prototype.getEmployeeId = function () {
        return this.empId;
    };
    Vehicle.prototype.validateFormVehicle = function () {
        var valid = true;
        var forminputV = document.getElementsByClassName("tabVehicle")[currentTabV];
        var inputValueV = forminputV.querySelector("input");
        if (currentTabV == 2) {
            var Vtype = document.getElementsByClassName("tabVehicle")[2].querySelector("select").value;
            vehicleObj.setVehicleType(Vtype);
            if (!(Vtype.match('Bicycle') || Vtype.match('Motorcycle') || Vtype.match('Four Wheeler'))) {
                valid = false;
                alert("Choose your vehicle Type");
            }
        }
        else {
            var val = inputValueV;
            if (val.value.length === 0) {
                valid = false;
                alert("Enter required information");
            }
            else {
                switch (forminputV.id) {
                    case "Company": {
                        vehicleObj.setVehicleCompany(val.value);
                        break;
                    }
                    case "VNumber": {
                        vehicleObj.setVehicleNo(val.value);
                        break;
                    }
                    case "EmpID": {
                        vehicleObj.setEmployeeId(val.value);
                        break;
                    }
                }
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("tabVehicle")[currentTabV].className += " finish";
        }
        return valid; // return the valid status
    };
    return Vehicle;
}());
var vehicleObj = new Vehicle();
var currentTabV = 0; // Current tabVehicle is set to be the first tabVehicle (0)
showTabVehicle(currentTabV); // Display the current tabVehicle
function showTabVehicle(n) {
    // This function will display the specified tabVehicle of the form ...
    var x = document.getElementsByClassName("tabVehicle");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    }
    else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}
function nextPrevVehicle(n) {
    // This function will figure out which tabVehicle to display
    var x = document.getElementsByClassName("tabVehicle");
    // Exit the function if any field in the current tabVehicle is invalid:
    if (n == 1 && !vehicleObj.validateFormVehicle())
        return false;
    // Hide the current tabVehicle:
    x[currentTabV].style.display = "none";
    // Increase or decrease the current tabVehicle by 1:
    currentTabV = currentTabV + n;
    // if you have reached the end of the form... :
    if (currentTabV >= x.length) {
        //...the form gets submitted:
        //document.getElementById("regForm").submit();
        document.getElementById("regForm").style.display = "none";
        document.getElementById("vehicleForm").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        var vType = vehicleObj.getVehicleType();
        document.getElementById("Price").style.display = "inline";
        switch (vType) {
            case "Bicycle": {
                document.getElementById("Price-Sec1").innerHTML = "Bicycle <br><br> $5/Day  <br><br>  <button>Purchase Now</button>";
                document.getElementById("Price-Sec2").innerHTML = "Bicycle <br><br> $100/Monthly <br><br> <button>Purchase Now</button>";
                document.getElementById("Price-Sec3").innerHTML = "Bicycle <br><br> $500/Yearly <br><br> <button>Purchase Now</button>";
                break;
            }
            case "Motorcycle": {
                document.getElementById("Price-Sec1").innerHTML = "Motorcycle <br><br> $10/Day  <br><br>  <button>Purchase Now</button>";
                document.getElementById("Price-Sec2").innerHTML = "Motorcycle <br><br> $200/Monthly <br><br> <button>Purchase Now</button>";
                document.getElementById("Price-Sec3").innerHTML = "Motorcycle <br><br> $1000/Yearly <br><br> <button>Purchase Now</button>";
                break;
            }
            case "Four Wheeler": {
                document.getElementById("Price-Sec1").innerHTML = "Four Wheeler <br><br> $20/Day  <br><br>  <button>Purchase Now</button>";
                document.getElementById("Price-Sec2").innerHTML = "Four Wheeler <br><br> $500/Monthly <br><br> <button>Purchase Now</button>";
                document.getElementById("Price-Sec3").innerHTML = "Four Wheeler <br><br> $3500/Yearly <br><br> <button>Purchase Now</button>";
                break;
            }
        }
        return false;
    }
    // Otherwise, display the correct tabVehicle:
    showTabVehicle(currentTabV);
}
