class Vehicle{
    private vehicleCompany: string;
    private vehicleType: string;
    private vehicleNo: string;
    private empId: string;

    constructor(){
        this.vehicleCompany = '';
        this.vehicleType = '';
        this.vehicleNo = '';
        this.empId = '';
    }

    setVehicleCompany(vehicleCompany: string){
        this.vehicleCompany = vehicleCompany;
    }

    setVehicleType(vehicleType: string){
        this.vehicleType = vehicleType;
    }

    setVehicleNo(vehicleNo: string){
        this.vehicleNo = vehicleNo;
    }

    setEmployeeId(empId: string){
        this.empId = empId;
    }

    getVehicleCompany() : string{
        return this.vehicleCompany;
    }

    getVehicleType() : string{
        return this.vehicleType;
    }

    getVehicleNo() : string{
        return this.vehicleNo;
    }

    getEmployeeId() : string{
        return this.empId;
    }

    validateFormVehicle() : boolean{
        let valid = true;
        const forminputV = document.getElementsByClassName("tabVehicle")[currentTabV];
        const inputValueV = forminputV.querySelector("input");
        

        if(currentTabV == 2){
            const Vtype = (document.getElementsByClassName("tabVehicle")[2].querySelector("select") as HTMLSelectElement).value;
            vehicleObj.setVehicleType(Vtype);
            if(!(Vtype.match('Bicycle') || Vtype.match('Motorcycle') || Vtype.match('Four Wheeler'))){
                valid = false;
                alert("Choose your vehicle Type");
            }
        }
        else{
            let val = (inputValueV as HTMLInputElement);
            if(val.value.length === 0){
                valid = false;
                alert("Enter required information");
            }
            else{
                switch((forminputV as HTMLElement).id){
                    case "Company":{
                        vehicleObj.setVehicleCompany(val.value);
                        break;
                    }
                    
                    case "VNumber":{
                        vehicleObj.setVehicleNo(val.value);
                        break;
                    }

                    case "EmpID":{
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
    }
}

const vehicleObj = new Vehicle();

var currentTabV = 0; // Current tabVehicle is set to be the first tabVehicle (0)
showTabVehicle(currentTabV); // Display the current tabVehicle


function showTabVehicle(n: number) : void {
    // This function will display the specified tabVehicle of the form ...
    var x = document.getElementsByClassName("tabVehicle");
    (x[n] as HTMLElement).style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == (x.length - 1)) {
        (document.getElementById("nextBtn") as HTMLElement).innerHTML = "Submit";
    } else {
        (document.getElementById("nextBtn") as HTMLElement).innerHTML = "Next";
    }
}

function nextPrevVehicle(n: number) : void | boolean{
    // This function will figure out which tabVehicle to display
    var x = document.getElementsByClassName("tabVehicle");
    // Exit the function if any field in the current tabVehicle is invalid:
    if (n == 1 && !vehicleObj.validateFormVehicle()) return false;
    // Hide the current tabVehicle:
    (x[currentTabV] as HTMLElement).style.display = "none";
    // Increase or decrease the current tabVehicle by 1:
    currentTabV = currentTabV + n;
    // if you have reached the end of the form... :
    if (currentTabV >= x.length) {
        //...the form gets submitted:
        //document.getElementById("regForm").submit();
        (document.getElementById("regForm") as HTMLElement).style.display = "none";
        (document.getElementById("vehicleForm") as HTMLElement).style.display = "none";
        (document.getElementById("nextBtn") as HTMLElement).style.display = "none";
        var vType = vehicleObj.getVehicleType();
        (document.getElementById("Price") as HTMLElement).style.display = "inline";
        switch(vType){

        case "Bicycle" : {
            (document.getElementById("Price-Sec1") as HTMLElement).innerHTML = "Bicycle <br><br> $5/Day  <br><br>  <button>Purchase Now</button>";

            (document.getElementById("Price-Sec2") as HTMLElement).innerHTML = "Bicycle <br><br> $100/Monthly <br><br> <button>Purchase Now</button>";

            (document.getElementById("Price-Sec3") as HTMLElement).innerHTML = "Bicycle <br><br> $500/Yearly <br><br> <button>Purchase Now</button>";
            break;
        }

        case "Motorcycle" : {
            (document.getElementById("Price-Sec1") as HTMLElement).innerHTML = "Motorcycle <br><br> $10/Day  <br><br>  <button>Purchase Now</button>";

            (document.getElementById("Price-Sec2") as HTMLElement).innerHTML = "Motorcycle <br><br> $200/Monthly <br><br> <button>Purchase Now</button>";

            (document.getElementById("Price-Sec3") as HTMLElement).innerHTML = "Motorcycle <br><br> $1000/Yearly <br><br> <button>Purchase Now</button>";
            break;
        }

        case "Four Wheeler" : {
            (document.getElementById("Price-Sec1") as HTMLElement).innerHTML = "Four Wheeler <br><br> $20/Day  <br><br>  <button>Purchase Now</button>";

            (document.getElementById("Price-Sec2") as HTMLElement).innerHTML = "Four Wheeler <br><br> $500/Monthly <br><br> <button>Purchase Now</button>";

            (document.getElementById("Price-Sec3") as HTMLElement).innerHTML = "Four Wheeler <br><br> $3500/Yearly <br><br> <button>Purchase Now</button>";
            break;
        }
        }
        return false;

    }
    // Otherwise, display the correct tabVehicle:
    showTabVehicle(currentTabV);
}

