class Employee{
    private empName : string;
    private email : string;
    private password : string;
    private phoneNo : number;

    constructor(){
        this.empName = '';
        this.email = '';
        this.password = '';
        this.phoneNo = 0;
    }

    setEmpName(empName : string){
        this.empName = empName;
    }

    setEmpEmail(email : string){
        this.email = email;
    }

    setEmpPassword( password : string){
        this.password = password;
    }

    setEmpPhoneNo(phoneNo: number){
        this.phoneNo = phoneNo;
    }

    getEmpName() : string{
        return this.empName;
    }
 
    getEmpEmail() : string{
        return this.email;
    }

    getEmpPassword() : string{
        return this.password;
    }

    getEmpPhoneNo() : number{
        return this.phoneNo;
    }

    
    validateForm() : void | boolean {
        const forminput = document.getElementsByClassName("tab")[currentTab];
        const inputValue = (forminput.querySelector("input") as unknown as HTMLInputElement).value;
        var valid = true;

        switch (forminput.id) {
            case "Name": {
                if (inputValue.length < 2 || !inputValue.match(/^[A-za-z\s]+$/)) {
                    valid = false;
                }
                if (valid == false) {
                    alert("Name length should atleast 2 charaters");
                }
                else{
                    empObj.setEmpName(inputValue);
                }
                break;
            }

            case "Email": {
                if (
                    inputValue.length < 10 ||
                    !inputValue.match(/^[0-9A-Z0-9a-z0-9@A-Za-z.A-Za-z]+$/)
                ) {
                    valid = false;
                }
                if (valid == false) {
                    alert("Enter a valid email");
                }else{
                    empObj.setEmpEmail(inputValue);
                }
                break;
            }

            case "Password": {
                if (inputValue.length < 8) {
                    valid = false;
                    alert("Password length should be atleast 8 charaters");
                } else {
                    if (pass_strength != "strong") {
                    valid = false;
                    alert("Use a strong password");
                    }
                    else{
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
                else{
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
    }
}

const empObj = new Employee();

var currentTab:number = 0;// Current tab is set to be the first tab (0)

showTab(currentTab); // Display the current tab


function showTab(n : number) : void {
    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("tab");
    
    var inputLabel = "";
    if (currentTab == 1) {
        inputLabel = "Hi! " + empObj.getEmpName()  + " Can I Know your gender.";
    } else if (currentTab == 2) {
        inputLabel = empObj.getEmpName() + " Enter your email : ";
    } else if (currentTab == 3) {
        inputLabel = "Enter password :";
    } else if (currentTab == 4) {
        inputLabel = "Confirm password again : ";
    } else if (currentTab == 5) {
        inputLabel = "Enter phone number : ";
    }

    document.getElementsByTagName("span")[currentTab].innerText = inputLabel;
    (x[n] as HTMLElement).style.display = "block";

    // ... and fix the Previous/Next buttons:
    if (n == x.length - 1) {
        (document.getElementById("nextBtn") as HTMLElement).innerHTML = "Submit";
    } else {
        (document.getElementById("nextBtn") as HTMLElement).innerHTML = "Next";
    }
}

function nextPrev(n : number): void | boolean {
    // This function will figure out which tab to display

    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !empObj.validateForm()) return false;
    // Hide the current tab:
    (x[currentTab] as HTMLElement).style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        (document.getElementById("regID") as HTMLElement).style.display = "block";
        (document.getElementById("nextBtn") as HTMLElement).style.display = "none";
        let xy = Math.floor(Math.random() * 1000 + 8999);
        (document.getElementById("regID") as HTMLElement).innerHTML = empObj.getEmpName() + " your resgisteration id is " + xy;
        //document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

var pass_strength:string;
function testPassword() :void {
    let strength = 0;
    const input = (document.getElementById("Password_Strength") as unknown as HTMLInputElement).value;
    console.log(input);
    strength += /[A-Z]+/.test(input) ? 1 : 0;
    strength += /[a-z]+/.test(input) ? 1 : 0;
    strength += /[0-9]+/.test(input) ? 1 : 0;
    strength += /[\W]+/.test(input) ? 1 : 0;

    switch (strength) {
        case 3:
        if (input.length > 8) {
            let medium = "Medium Password";
            (document.getElementById("strength") as HTMLElement).innerText = medium;
            (document.getElementById("Password_Strength") as HTMLElement).style.border = "4px solid blue";
            pass_strength = "medium";
            break;
        }
        case 4:
        if (input.length > 8) {
            let strong = "Strong Password";
            (document.getElementById("Password_Strength") as HTMLElement).style.border ="4px solid green";
            (document.getElementById("strength") as HTMLElement).innerText = strong;
            pass_strength = "strong";
            break;
        }
        default:{
            let weak = "Weak Password ";
            (document.getElementById("Password_Strength") as HTMLElement).style.border = "4px solid red";
            (document.getElementById("strength") as HTMLElement).innerText = weak;
            pass_strength = "weak";
            // it's weak!
            break;
        }
    }
}
