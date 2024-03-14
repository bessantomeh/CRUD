var employeenameinput=document.getElementById('employeename');
var employeedepartmentinput=document.getElementById('employeedepartment');
var employeeageinput=document.getElementById('employeeage');
var employeesalaryinput=document.getElementById('employeesalary');
 var addbtn=document.getElementById('click');
 var inputs=document.getElementsByClassName('inputs');
 var deletebtn=document.getElementById('deletebtn');
 var namealert=document.getElementById('namealert');
 var employees = [] ;
 var currentIndex=0;
 var data=document.getElementById('data');
 if(localStorage.getItem("employeelist")==null){
   var employees = [] ;
 }
 else{
     var employees=JSON.parse(localStorage.getItem("employeelist"));
   displaydata();
 }

 addbtn.onclick=function(){
    if(addbtn.innerHTML=="Add employee"){
        addcource()
    }
    else{
       updatecourse()
    }
  displaydata()
  clearform()
 }
 function addcource(){
  var employee ={
      name:employeenameinput.value,
      department:employeedepartmentinput.value,
      age:employeeageinput.value,
      salary:employeesalaryinput.value
  }
  employees.push(employee);
  localStorage.setItem("employeelist",JSON.stringify(employees));
  Swal.fire({
   position: 'top-end',
   icon: 'success',
   title: 'Your work has been saved',
   showConfirmButton: false,
   timer: 1500
 })
 }
 function displaydata(){
    var result="";
    for(var i=0;i<employees.length;i++){
        result+=`<tr>
         <td> ${i} </td>
          <td> ${employees[i].name} </td> 
           <td> ${employees[i].department} </td>
            <td> ${employees[i].age} </td> 
            <td> ${employees[i].salary} </td>
            <td> <button class="btn btn-outline-info" onclick="getcoursedata(${i})"> update </button> </td>
         <td> <button class="btn btn-outline-danger" onclick="deleteemployee(${i})"> delete </button> </td>
         </tr>
         ` ;
    }
    data.innerHTML =result;
 }
 
 function clearform(){
 
  for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
 }}
 function deleteemployee(index){

   Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          employees.splice(index,1);
          localStorage.setItem("employeelist",JSON.stringify(employees));
          displaydata();
        Swal.fire(
          'Deleted!',
          'employee has been deleted.',
          'success'
        )
      }
    })
 }
 deletebtn.onclick=function(){
  localStorage.removeItem("employeelist");
  employees = [] ;
  data.innerHTML ="";
}
function search(searchText){
   var result = "";
   for(var i=0;i<employees.length;i++){
       if(employees[i].name.toLowerCase().includes(searchText.toLowerCase())){
       result+=`
       <tr>
           <td> ${i} </td>
           <td> ${employees[i].name} </td> 
            <td> ${employees[i].department} </td>
             <td> ${employees[i].age} </td> 
             <td> ${employees[i].salary} </td>
           <td><button class="update"> update </button></td>
           <td><button class="delete" onclick="deleteemployee(${i})"> delete </button></td>
       </tr>
       `;
   }
   }
   data.innerHTML = result;
}


 function getcoursedata(index){
    var employee = employees[index];
 
 employeenameinput.value=employee.name;
 employeedepartmentinput.value=employee.department;
 employeeageinput.value=employee.age;
 employeesalaryinput.value=employee.salary;
 addbtn.innerHTML="update employee";
 currentIndex=index;
 }

  function updatecourse(){
   var employee ={
      name:employeenameinput.value,
      department:employeedepartmentinput.value,
      age:employeeageinput.value,
      salary:employeesalaryinput.value
  };
  employees[currentIndex].name=employee.name;
  employees[currentIndex].department=employee.department;
  employees[currentIndex].age=employee.age;
  employees[currentIndex].salary=employee.salary;
  localStorage.setItem("employeelist",JSON.stringify(employees));
  displaydata();
  Swal.fire({
   position: 'top-end',
   icon: 'success',
   title: 'Your work has been saved',
   showConfirmButton: false,
   timer: 1500
 })
  }
  employeename.onkeyup=function(){
     var namepattern =/^[A-Z][a-z]{2,8}$/
     if(namepattern.test(employeename.value)){
        addbtn.removeAttribute("disabled");
        employeename.classList.add('is-valid');
        employeename.classList.remove('is-invalid');
        namealert.classList.add('d-none');
     }else{
        addbtn.setAttribute("disabled","true")
        employeename.classList.add('is-invalid');
        employeename.classList.remove('is-valid');
        namealert.classList.remove('d-none');
     }
  }