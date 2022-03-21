var Employee = /** @class */ (function () {
    function Employee() {
        this.empName = '';
        this.email = '';
        this.password = '';
        this.phoneNo = 0;
    }
    Employee.prototype.setEmpName = function (empName) {
        this.empName = empName;
    };
    Employee.prototype.setEmpEmail = function (email) {
        this.email = email;
    };
    Employee.prototype.setEmpPassword = function (password) {
        this.password = password;
    };
    Employee.prototype.setEmpPhoneNo = function (phoneNo) {
        this.phoneNo = phoneNo;
    };
    Employee.prototype.getEmpName = function () {
        return this.empName;
    };
    Employee.prototype.getEmpEmail = function () {
        return this.email;
    };
    Employee.prototype.getEmpPassword = function () {
        return this.password;
    };
    Employee.prototype.getEmpPhoneNo = function () {
        return this.phoneNo;
    };
    Employee.prototype.validateForm = function () {
        var forminput = document.getElementsByClassName("tab")[currentTab];
        var inputValue = forminput.querySelector("input").value;
        var valid = true;
        switch (forminput.id) {
            case "Name": {
                if (inputValue.length < 2 || !inputValue.match(/^[A-za-z\s]+$/)) {
                    valid = false;
                }
                if (valid == false) {
                    alert("Name length should atleast 2 charaters");
                }
                else {
                    empObj.setEmpName(inputValue);
                }
                break;
            }
            case "Email": {
                if (inputValue.length < 10 ||
                    !inputValue.match(/^[0-9A-Z0-9a-z0-9@A-Za-z.A-Za-z]+$/)) {
                    valid = false;
                }
                if (valid == false) {
                    alert("Enter a valid email");
                }
                else {
                    empObj.setEmpEmail(inputValue);
                }
                break;
            }
            case "Password": {
                if (inputValue.length < 8) {
                    valid = false;
                    alert("Password length should be atleast 8 charaters");
                }
                else {
                    if (pass_strength != "strong") {
                        valid = false;
                        alert("Use a strong password");
                    }
                    else {
                        empObj.setEmpPassword(inputValue);
                    }
                }
                break;
            }
            case "RePassword": {
                if (inputValue != empObj.getEmpPassword()) {
                    valid = false;
                }
                if (valid == false) {
                    alert("Password does not match");
                }
                break;
            }
            case "Phone": {
                if (inputValue.length != 10 || !inputValue.match(/^([0-9]{10})+$/)) {
                    valid = false;
                }
                if (valid == false) {
                    alert("Mobile number should be of 10 digits");
                }
                else {
                    empObj.setEmpPhoneNo(+inputValue);
                }
                break;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("tab")[currentTab].className += " finish";
        }
        return valid; // return the valid status
    };
    return Employee;
}());
var empObj = new Employee();
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    var inputLabel = "";
    if (currentTab == 1) {
        inputLabel = "Hi! " + empObj.getEmpName() + " Can I Know your gender.";
    }
    else if (currentTab == 2) {
        inputLabel = empObj.getEmpName() + " Enter your email : ";
    }
    else if (currentTab == 3) {
        inputLabel = "Enter password :";
    }
    else if (currentTab == 4) {
        inputLabel = "Confirm password again : ";
    }
    else if (currentTab == 5) {
        inputLabel = "Enter phone number : ";
    }
    document.getElementsByTagName("span")[currentTab].innerText = inputLabel;
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == x.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    }
    else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}
function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !empObj.validateForm())
        return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regID").style.display = "block";
        document.getElementById("nextBtn").style.display = "none";
        var xy = Math.floor(Math.random() * 1000 + 8999);
        document.getElementById("regID").innerHTML = empObj.getEmpName() + " your resgisteration id is " + xy;
        //document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}
var pass_strength;
function testPassword() {
    var strength = 0;
    var input = document.getElementById("Password_Strength").value;
    console.log(input);
    strength += /[A-Z]+/.test(input) ? 1 : 0;
    strength += /[a-z]+/.test(input) ? 1 : 0;
    strength += /[0-9]+/.test(input) ? 1 : 0;
    strength += /[\W]+/.test(input) ? 1 : 0;
    switch (strength) {
        case 3:
            if (input.length > 8) {
                var medium = "Medium Password";
                document.getElementById("strength").innerText = medium;
                document.getElementById("Password_Strength").style.border = "4px solid blue";
                pass_strength = "medium";
                break;
            }
        case 4:
            if (input.length > 8) {
                var strong = "Strong Password";
                document.getElementById("Password_Strength").style.border = "4px solid green";
                document.getElementById("strength").innerText = strong;
                pass_strength = "strong";
                break;
            }
        default: {
            var weak = "Weak Password ";
            document.getElementById("Password_Strength").style.border = "4px solid red";
            document.getElementById("strength").innerText = weak;
            pass_strength = "weak";
            // it's weak!
            break;
        }
    }
}
