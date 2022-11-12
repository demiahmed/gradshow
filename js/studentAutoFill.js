d3.csv(`../../../assets/drivers/2022.csv`, function(data){
    // data.fil
    // console.log(data);
    let studentName = window.location.href.split("/").at(-2)
    // console.log(String(studentName));
    studentData = data.filter(e => e.key==String(studentName))[0]
    console.log(studentData);

    // $("body").append(``)
    $("body").append(`<title-text title="${studentData.title}"></title-text>`)
    $("body").append(`<project-bio 
    main-title="Abstract"
    summary="${studentData.summary}"
    student-title="About Me"
    aboutme="${studentData.aboutme}"
    name="${studentData.name}"
    portrait="./${studentData.key}.jpg"
    mentor="${studentData.mainAdvisor}"
    typology="${studentData.typology}"
    location="${studentData.location}"
    email="${studentData.email}"
    issuu="${studentData.issuu}"
    website="${studentData.website}"
    instagram="${studentData.instagram}"
    linkedin="${studentData.linkedin}"
     ></project-bio>`)

    //  <special-image url="./data/Untitled-1.jpg"></special-image>
    $("body").append(`<div class="bottomlinks">
    <h3><a  href="javascript:window.scrollTo(0,0)">Back to Top</a></h3>
</div>`)
    $("body").append(`<footer-i></footer-i>`)

})

