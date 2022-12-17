/**
 * Define Classes to Encapsulate Our Data Structures Needed for each use case
 */
class Trainer {
    //Constructor of the class, setting the values passed as the values of this object.
    constructor(fname,lname,subject)
    {
        this.fname = fname;
        this.lname = lname;
        this.subject = subject;
    }
    /**
     * Test if the input is corect,
     * use Regular expressions for text,
     * IsNaN for numbers
     * and let dates be handled by html's type="date" and the browser
     */
    IsValid()
    {
        if(!(/^[a-zA-Z ]+$/.test(this.fname )))
        {
            return false;
        }
        if(!(/^[a-zA-Z ]+$/.test(this.lname)))
        {
            return false;
        }
        if(!(/^[a-zA-Z ]+$/.test(this.subject)))
        {
            return false;
        }
        return true;
    }

    //Return the current teacher as am html row, ready to be inserted dynamically into our table
    GetAsTableRow(index)
    {
        let temp = `<tr><td>`+this.fname+`</td>
        <td>`+this.lname+`</td>
        <td>`+this.subject+`</td>
        <td><button value=`+index+`>Edit</button></td></tr>`;
        return temp;
    }
};
//Same as above
class Assignment {
    constructor(title,description,subDateTime,oralMark,totalMark)
    {
        this.title = title;
        this.description = description;
        this.subDateTime = subDateTime;
        this.oralMark = oralMark;
        this.totalMark = totalMark;
    }

    IsValid()
    {
       if(!(/^[a-zA-Z ]+$/.test(this.title )))
        {
            return false;
        }
        if(!(/^[a-zA-Z ]+$/.test(this.description)))
        {
            return false;
        }
        if(isNaN(this.oralMark) || isNaN(this.oralMark))
        {
            return false;
        }
        if(this.oralMark > this.totalMark)
        {
            return false;
        }
        
        return true;
    }

    GetAsTableRow(index)
    {
        let temp = `<tr><td>`+this.title+`</td>
        <td>`+this.description+`</td>
        <td>`+this.subDateTime+`</td>
        <td>`+this.oralMark+`</td>
        <td>`+this.totalMark+`</td>
        <td><button value=`+index+`>Edit</button></td></tr>`;
        return temp;
    }

};
//Same as above
class Student {
    constructor(fname,lname,dateOfBirth,tuitionFees)
    {
        this.fname = fname;
        this.lname = lname;
        this.dateOfBirth = dateOfBirth;
        this.tuitionFees = tuitionFees;
    }

    IsValid()
    {
        if(!(/^[a-zA-Z ]+$/.test(this.fname )))
        {
            return false;
        }
        if(!(/^[a-zA-Z ]+$/.test(this.lname )))
        {
            return false;
        }
        if(isNaN(this.tuitionFees))
        {
            return false;
        }
        return true;
    }

    GetAsTableRow(index)
    {
        let temp = `<tr><td>`+this.fname+`</td>
        <td>`+this.lname+`</td>
        <td>`+this.dateOfBirth+`</td>
        <td>`+this.tuitionFees+`</td>
        <td><button value=`+index+`>Edit</button></td></tr>`;
        return temp;
    }
};
//Same as above
class Course {
    constructor(title,stream,type,startDate,endDate)
    {
        this.title = title;
        this.stream = stream;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    IsValid()
    {
        if(!(/^[a-zA-Z ]+$/.test(this.title )))
        {
            return false;
        }
        if(!(/^[a-zA-Z ]+$/.test(this.stream )))
        {
            return false;
        }
        if(!(/^[a-zA-Z ]+$/.test(this.type )))
        {
            return false;
        }
        return true;
    }

    GetAsTableRow(index)
    {
        let temp = `<tr><td>`+this.title+`</td>
        <td>`+this.stream+`</td>
        <td>`+this.type+`</td>
        <td>`+this.startDate+`</td>
        <td>`+this.endDate+`</td>
        <td><button value=`+index+`>Edit</button></td></tr>`;
        return temp;
    }
};


let _EDITMODE = false; // Control the state of the form, false being add and true being update
let _EDITID = 0; //The id of the form being updated

let trainers = new Array(); //store all our trainer objects localy
let assignments = new Array(); //store all our assignments objects localy
let students = new Array();  //store all our students objects localy
let courses = new Array(); //store all our courses objects localy


function Init()
{
    /**
     * Require needed Libs
     * 
     */
    var express = require('express');
    var  router = express.Router();
    var db = require()

    /**
     * Check if there is a cookie already containing our data
     * if it does, load the data to the correct array
     * if not make a new cookie and pass the empty array over to it
     * (JSON is used to store the data since cookies only accept strings,
     * so we need to turn our objects into strings to store, and turn them
     * back into objects when we need them).
     */

     /**
      * TODO:
      * -- REPLACE WITH SQL
    if(window.localStorage.getItem("trainers") == null)
    {
        window.localStorage.setItem("trainers",JSON.stringify(trainers));
    }
    else
    {
        trainers = JSON.parse(window.localStorage.getItem("trainers"));
        
    }
    if(window.localStorage.getItem("assignments") == null)
    {
        window.localStorage.setItem("assignments",JSON.stringify(assignments));
    }
    else
    {
        assignments = JSON.parse(window.localStorage.getItem("assignments"));
    }
    if(window.localStorage.getItem("students") == null)
    {
        window.localStorage.setItem("students",JSON.stringify(students));
    }
    else
    {
        students = JSON.parse(window.localStorage.getItem("students"));
    }
    if(window.localStorage.getItem("courses") == null)
    {
        window.localStorage.setItem("courses",JSON.stringify(courses));
    }
    else
    {
        courses = JSON.parse(window.localStorage.getItem("courses"));
    }
     */
    /** Fill any table pressent at the current page with the pre-existing data we got from our cookies
     * */ 
    PopulateTrainerHTMLTable();
    PopulateAssignmentHTMLTable();
    PopulateStudentsHTMLTable();
    PopulateCoursesHTMLTable();

    /**
     * Add event handlers to all our form button, and our delete buttons
     */
    HandleTrainerForm();
    HandleDeleteTrainersButton();
    HandleAssignmentForm();
    HandleDeleteAssignmentsButton();
    HandleStudentForm();
    HandleDeleteStudentsButton();
    HandleCourseForm();
    HandleDeleteCoursesButton();
}


/***------------------TRAINERS--------------- */
/***
 * Handle the events from the trainer Form
 * and update our local parameters
 */
function HandleTrainerForm()
{
    /** Try to find the form, if it's there
     * add a listener to the submit button so we can execute code
     * when the button is being clicked
     */
    let formElement = document.querySelector("#TrainerForm");
    if(formElement != null)
    {
        formElement.addEventListener("submit", OnSubmit, false);
    }
    /**Handles the button click */
    function OnSubmit(e)
    {
        // Stops Browser from handling the form with the default behaviour,
        // letting us use the data and stopping the page from refreshing
        e.stopImmediatePropagation();
        e.preventDefault();
        /**
         * Save the new Data in a temp variable
         */
        let tempTrainer = new Trainer(
            e.target.elements.fname.value,
            e.target.elements.lname.value,
            e.target.elements.subject.value
        );
        if(_EDITMODE)
        {
            /**
             * if we are in editmode, check if the data is valid
             * if it is update the correct trainer, save the data back to the cookie
             * and change the mode of the form back to Addition
             * Finally we repopulate the table
             */

            if(tempTrainer.IsValid())
            {
                SaveUpdatedTrainer(tempTrainer);
                _EDITID = 0;
                _EDITMODE = false;
    
                let header = document.querySelector("h2");
                header.innerHTML = "Add Trainer";
                
                let submitbtn = document.querySelector("input[type='submit']");
                submitbtn.value = "Submit";
            }
            else
            {
                alert("Invalid Input.");
            }

        }
        else
        {
            /**if we are in addition mode
             * we check the validity of the data from the form , add the trainer to 
             * our array , update the cookie and repopulate the table
             */
            if(tempTrainer.IsValid())
            {
                SaveNewTrainer(tempTrainer);
            }
            else
            {
                alert("Invalid Input.");
            }
        }

    }
    //Add the trainer to the array and update the cookie, repopulate the table
    function SaveNewTrainer(trainer)
    {
        trainers.push(trainer);
        //window.localStorage.setItem("trainers",JSON.stringify(trainers));
        PopulateTrainerHTMLTable();
    }
    //edit the trainer to the array and update the cookie, repopulate the table
    function SaveUpdatedTrainer(trainer)
    {
        trainers[_EDITID].fname = trainer.fname;
        trainers[_EDITID].lname = trainer.lname;
        trainers[_EDITID].subject = trainer.subject;
        //window.localStorage.setItem("trainers",JSON.stringify(trainers));
        PopulateTrainerHTMLTable();
    }

}
/**
 * Try to find the table element of the trainers, if it exists 
 * append the HTML generated by our trainers to fill the rows with the correct data,
 * as well as generate a button that hold the value of the trainer , so we can know, which one we are editting
 */
function PopulateTrainerHTMLTable()
{
    let table = document.querySelector("#TrainerTable tbody");
    if(table != null)
    {
        table.innerHTML = "";
        let data = "";
        for(i =0;i<trainers.length;i++)
        {
            let tempTrainer = new Trainer(trainers[i].fname,trainers[i].lname,trainers[i].subject);
            data += tempTrainer.GetAsTableRow(i);
        }
        table.innerHTML = data;
    
    
        let buttons = document.querySelectorAll("#TrainerTable button");
        buttons.forEach(
            function(d)
            {
                d.addEventListener("click", OnTrainerEditClicked,false);
            }
            
        );   
    }
    /**Handle the click of the Edit button
     * Change to edit mode, 
     * update the form with the data of the person we wish to edit
     * and change the names on the ui so the user knows he is currently editting
     */
    function OnTrainerEditClicked(e)
    {
        _EDITID= e.target.value;
        _EDITMODE = true;
        let form = document.querySelector("#TrainerForm");
        
        form.elements.fname.value = trainers[_EDITID].fname;
        form.elements.lname.value = trainers[_EDITID].lname;
        form.elements.subject.value = trainers[_EDITID].subject;

        let header = document.querySelector("h2");
        header.innerHTML = "Edit Trainer";
        
        let submitbtn = document.querySelector("input[type='submit']");
        submitbtn.value = "Edit";
    }
}
/**
 * Handle the OnClick of the Delete ALL button for the trainers,
 * when clicked, we create a confirmation prompt, if it's confirmed
 * we clear our local array, clear our cookie, then clear the Table
 */
function HandleDeleteTrainersButton()
{
    let btn = document.querySelector("#DeleteTrainers");
    if(btn!=null)
    {
        btn.addEventListener("click",OnDeleteTrainersClicked,false);
    }

    function OnDeleteTrainersClicked(e)
    {
        let test = confirm("are you sure");
        if(test)
        {
            DeleteAllTrainers();
        }
    }
}

function DeleteAllTrainers()
{
    trainers = [];
    //window.localStorage.setItem("trainers",JSON.stringify(trainers));
    PopulateTrainerHTMLTable();

}




/**------------ASSIGNMENTS--------------- */
/**
 * The same logic applies as the Trainers Handling
 */
function HandleAssignmentForm()
{
    let formElement = document.querySelector("#AssignmentsForm");
    if(formElement != null)
    {
        formElement.addEventListener("submit", OnSubmit, false);
    }

    function OnSubmit(e)
    {
        // Stops Browser from handling the form with the default behaviour,
        // letting us use the data and stopping the page from refreshing
        e.stopImmediatePropagation();
        e.preventDefault();
        
        let tempAssignment = new Assignment(
            e.target.elements.title.value,
            e.target.elements.description.value,
            e.target.elements.subDateTime.value,
            e.target.elements.oralMark.value,
            e.target.elements.totalMark.value
        );

        if(_EDITMODE)
        {

            if(tempAssignment.IsValid())
            {
                SaveUpdatedAssignment(tempAssignment);
                _EDITID = 0;
                _EDITMODE = false;
    
                let header = document.querySelector("h2");
                header.innerHTML = "Add Assignment";
                
                let submitbtn = document.querySelector("input[type='submit']");
                submitbtn.value = "Submit";
            }
            else
            {
                alert("Invalid Input.");
            }
        }
        else
        {         
            if(tempAssignment.IsValid())
            {
                SaveNewAssignment(tempAssignment);
            }
            else
            {
                alert("Invalid Input.");
            }
        }

    }
    
    function SaveNewAssignment(assignment)
    {
        assignments.push(assignment);
        window.localStorage.setItem("assignments",JSON.stringify(assignments));
        PopulateAssignmentHTMLTable();
    }
    function SaveUpdatedAssignment(assignment)
    {
        assignments[_EDITID].title = assignment.title;
        assignments[_EDITID].description = assignment.description;
        assignments[_EDITID].subDateTime = assignment.subDateTime;
        assignments[_EDITID].oralMark = assignment.oralMark;
        assignments[_EDITID].totalMark = assignment.totalMark;
        window.localStorage.setItem("assignments",JSON.stringify(assignments));
        PopulateAssignmentHTMLTable();
    }

}

function PopulateAssignmentHTMLTable()
{
    let table = document.querySelector("#AssignmentsTable tbody");
    if(table != null)
    {
        table.innerHTML = "";
        let data = "";
        for(i =0;i<assignments.length;i++)
        {
            let tempAssignment = new Assignment(
                assignments[i].title,
                assignments[i].description,
                assignments[i].subDateTime,
                assignments[i].oralMark,
                assignments[i].totalMark
            );
            data += tempAssignment.GetAsTableRow(i);
        }
        table.innerHTML = data;
    
    
        let buttons = document.querySelectorAll("#AssignmentsTable button");
        buttons.forEach(
            function(d)
            {
                d.addEventListener("click", OnAssignmentEditClicked,false);
            }
            
        );   
    }

    function OnAssignmentEditClicked(e)
    {
        _EDITID= e.target.value;
        _EDITMODE = true;
        let form = document.querySelector("#AssignmentsForm");
        form.elements.title.value = assignments[_EDITID].title;
        form.elements.description.value = assignments[_EDITID].description;
        form.elements.subDateTime.value = assignments[_EDITID].subDateTime;
        form.elements.oralMark.value = assignments[_EDITID].oralMark;
        form.elements.totalMark.value = assignments[_EDITID].totalMark;

        let header = document.querySelector("h2");
        header.innerHTML = "Edit Assignment";
        
        let submitbtn = document.querySelector("input[type='submit']");
        submitbtn.value = "Edit";
    }
}

function HandleDeleteAssignmentsButton()
{
    let btn = document.querySelector("#DeleteAssignments");
    if(btn!=null)
    {
        btn.addEventListener("click",OnDeleteAssignmentsClicked,false);
    }

    function OnDeleteAssignmentsClicked(e)
    {
        let test = confirm("are you sure");
        if(test)
        {
            DeleteAllAssignments();
        }
    }
}

function DeleteAllAssignments()
{
    assignments = [];
    //window.localStorage.setItem("assignments",JSON.stringify(assignments));
    PopulateAssignmentHTMLTable();

}



/**----------STUDENTS--------------- */
/**
 * The same logic applies as the Trainers Handling
 */
function HandleStudentForm()
{
    let formElement = document.querySelector("#StudentsForm");
    if(formElement != null)
    {
        formElement.addEventListener("submit", OnSubmit, false);
    }

    function OnSubmit(e)
    {
        // Stops Browser from handling the form with the default behaviour,
        // letting us use the data and stopping the page from refreshing
        e.stopImmediatePropagation();
        e.preventDefault();
        let tempStudent = new Student(
            e.target.elements.fname.value,
            e.target.elements.lname.value,
            e.target.elements.dateOfBirth.value,
            e.target.elements.tuitionFees.value
        );
        if(_EDITMODE)
        {

            if(tempStudent.IsValid())
            {
                SaveUpdatedStudent(tempStudent);
                _EDITID = 0;
                _EDITMODE = false;
    
                let header = document.querySelector("h2");
                header.innerHTML = "Add Student";
                
                let submitbtn = document.querySelector("input[type='submit']");
                submitbtn.value = "Submit";
            }
            else
            {
                alert("Invalid Input.");
            }
        }
        else
        {       
            if(tempStudent.IsValid())
            {
                SaveNewStudent(tempStudent);
            }
            else
            {
                alert("Invalid Input.");
            }
        }

    }
    
    function SaveNewStudent(student)
    {
        students.push(student);
        window.localStorage.setItem("students",JSON.stringify(students));
        PopulateStudentsHTMLTable();
    }
    function SaveUpdatedStudent(student)
    {
        students[_EDITID].fname = student.fname;
        students[_EDITID].lname = student.lname;
        students[_EDITID].dateOfBirth =student.dateOfBirth;
        students[_EDITID].tuitionFees = student.tuitionFees;
        window.localStorage.setItem("students",JSON.stringify(students));
        PopulateStudentsHTMLTable();
    }

}

function PopulateStudentsHTMLTable()
{
    let table = document.querySelector("#StudentsTable tbody");
    if(table != null)
    {
        table.innerHTML = "";
        let data = "";
        for(i =0;i<students.length;i++)
        {
            let tempStudent = new Student(
                students[i].fname,
                students[i].lname,
                students[i].dateOfBirth,
                students[i].tuitionFees
            );

            data += tempStudent.GetAsTableRow(i);
        }
        table.innerHTML = data;
    
    
        let buttons = document.querySelectorAll("#StudentsTable button");
        buttons.forEach(
            function(d)
            {
                d.addEventListener("click", OnStudentEditClicked,false);
            }
            
        );   
    }

    function OnStudentEditClicked(e)
    {
        _EDITID= e.target.value;
        _EDITMODE = true;
        let form = document.querySelector("#StudentsForm");
        form.elements.fname.value = students[_EDITID].fname;
        form.elements.lname.value = students[_EDITID].lname;
        form.elements.dateOfBirth.value = students[_EDITID].dateOfBirth;
        form.elements.tuitionFees.value = students[_EDITID].tuitionFees;

        let header = document.querySelector("h2");
        header.innerHTML = "Edit Student";
        
        let submitbtn = document.querySelector("input[type='submit']");
        submitbtn.value = "Edit";
    }
}

function HandleDeleteStudentsButton()
{
    let btn = document.querySelector("#DeleteStudents");
    if(btn!=null)
    {
        btn.addEventListener("click",OnDeleteStudentsClicked,false);
    }

    function OnDeleteStudentsClicked(e)
    {
        let test = confirm("are you sure");
        if(test)
        {
            DeleteAllStudents();
        }
    }
}

function DeleteAllStudents()
{
    students = [];
    //window.localStorage.setItem("students",JSON.stringify(students));
    PopulateStudentsHTMLTable();

}



/**-----------Courses----------------- */
/**
 * The same logic applies as the Trainers Handling
 */
function HandleCourseForm()
{
    let formElement = document.querySelector("#CoursesForm");
    if(formElement != null)
    {
        formElement.addEventListener("submit", OnSubmit, false);
    }

    function OnSubmit(e)
    {
        // Stops Browser from handling the form with the default behaviour,
        // letting us use the data and stopping the page from refreshing
        e.stopImmediatePropagation();
        e.preventDefault();
        let tempCourse = new Course(
            e.target.elements.title.value,
            e.target.elements.stream.value,
            e.target.elements.type.value,
            e.target.elements.startDate.value,
            e.target.elements.endDate.value
        );
        if(_EDITMODE)
        {

            if(tempCourse.IsValid())
            {
                SaveUpdatedCourse(tempCourse);
                _EDITID = 0;
                _EDITMODE = false;
    
                let header = document.querySelector("h2");
                header.innerHTML = "Add Course";
                
                let submitbtn = document.querySelector("input[type='submit']");
                submitbtn.value = "Submit";
            }
            else
            {
                alert("Invalid Input.");
            }
        }
        else
        {       
            if(tempCourse.IsValid())
            {
                SaveNewCourse(tempCourse);
            }
            else
            {
                alert("Invalid Input.");
            }
        }

    }
    
    function SaveNewCourse(course)
    {
        courses.push(course);
        window.localStorage.setItem("courses",JSON.stringify(courses));
        PopulateCoursesHTMLTable();
    }
    function SaveUpdatedCourse(course)
    {
        courses[_EDITID].title = course.title;
        courses[_EDITID].stream = course.stream;
        courses[_EDITID].type = course.type;
        courses[_EDITID].startDate = course.startDate;
        courses[_EDITID].endDate = course.endDate;
        window.localStorage.setItem("courses",JSON.stringify(courses));
        PopulateCoursesHTMLTable();
    }

}

function PopulateCoursesHTMLTable()
{
    let table = document.querySelector("#CoursesTable tbody");
    if(table != null)
    {
        table.innerHTML = "";
        let data = "";
        for(i =0;i<courses.length;i++)
        {
            let tempCourse = new Course(
                courses[i].title,
                courses[i].stream,
                courses[i].type,
                courses[i].startDate,
                courses[i].endDate
            );

            data += tempCourse.GetAsTableRow(i);
        }
        table.innerHTML = data;
    
    
        let buttons = document.querySelectorAll("#CoursesTable button");
        buttons.forEach(
            function(d)
            {
                d.addEventListener("click", OnCourseEditClicked,false);
            }
            
        );   
    }

    function OnCourseEditClicked(e)
    {
        _EDITID= e.target.value;
        _EDITMODE = true;
        let form = document.querySelector("#CoursesForm");
        form.elements.title.value = courses[_EDITID].title;
        form.elements.stream.value = courses[_EDITID].stream;
        form.elements.type.value = courses[_EDITID].type;
        /**Find the Selected OptionBox by itteration over all of them and checking for the correct value
         * When found exit the loop, we don't need to check the rest of them since we have already found the correct one
        */
        for(i =0;i<elements.type.options;i++)
        {
            if (form.elements.type.options[i] == courses[_EDITID].value)
            {
                form.type.options.selectedIndex = i;
                break;
            }
        }

        form.elements.startDate.value = courses[_EDITID].startDate;
        form.elements.endDate.value = courses[_EDITID].endDate;


        let header = document.querySelector("h2");
        header.innerHTML = "Edit Course";
        
        let submitbtn = document.querySelector("input[type='submit']");
        submitbtn.value = "Edit";
    }
}

function HandleDeleteCoursesButton()
{
    let btn = document.querySelector("#DeleteCourses");
    if(btn!=null)
    {
        btn.addEventListener("click",OnDeleteCoursesClicked,false);
    }

    function OnDeleteCoursesClicked(e)
    {
        let test = confirm("are you sure");
        if(test)
        {
            DeleteAllCourses();
        }
    }
}

function DeleteAllCourses()
{
    courses = [];
    //window.localStorage.setItem("courses",JSON.stringify(courses));
    PopulateCoursesHTMLTable();

}

/** Finally we Call our Initialization Script to Bind all the keys to their listeners and make everything work */
//Init();