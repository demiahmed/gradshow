d3.csv(`../../../assets/drivers/2022.csv`, function(data){

    try {
        

    let studentName = window.location.href.split("/").at(-2)
    studentData = data.filter(e => e.key==String(studentName))[0]
    // console.log(studentData);

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
    typology="${studentData.Topic}"
    location="${studentData.Location}"
    email="${studentData.email}"
    issuu="${studentData.issuu}"
    website="${studentData.website}"
    instagram="${studentData.instagram}"
    linkedin="${studentData.linkedin}"
     ></project-bio>`)

     $(".titletext").css("padding-top", "16vh")
     $(".titletext").css("font-weight", "bold")
     $(".titletext").css("font-size", "3rem")
     $(".titletext").css("margin-top", "0")
     $(".abstract").css("padding-bottom", "4vh")



    for (let index = 1; index < 20; index++) {
        $("body").append(`<special-image url="./data/${index}.jpg"></special-image>`)
    }
    //  <special-image url="./data/Untitled-1.jpg"></special-image>
    JSON.parse(studentData.video).map(e => $("body").append(`<video-container url=${e}></video-container>`))

    } catch (error) {
        console.log(error)
    }

    $("body").append(`<div class="bottomlinks">
    <h3><a  href="javascript:window.scrollTo(0,0)">Back to Top</a></h3>
    </div>`)

    $("body").append(`<footer-i></footer-i>`)


    // Removing icons which aren't needed
    let icons = $(".contact > a")

    elemsToRemove = [studentData.email, studentData.issuu, studentData.website, studentData.instagram, studentData.linkedin].map((e,i) =>  e=="0"? i:"ig")
    // console.log(elemsToRemove);
    elemsToRemove.map(e => { if(e!=="ig") icons[e].remove()})

})

