let mainPath = window.location.href
let studentPath = mainPath.split("/")[mainPath.split("/").length-2]
let imgPath = `${mainPath}${studentPath}-project.jpg`
// let description = "Annual Graduate Exhibition Showcase of the Singapore University of Technology and Design's outgoing Architecture students. Visit asd.sutd.edu.sg/gradshow/"
// console.log(imgPath);
var ogMetaImgtag = document.createElement('meta');
var ogMetaTitletag = document.createElement('meta');
var ogMetaDesctag = document.createElement('meta');

ogMetaImgtag.setAttribute('property', 'og:image');
ogMetaImgtag.setAttribute('content', imgPath);

ogMetaTitletag.setAttribute('property', 'og:title');
ogMetaDesctag.setAttribute('property', 'og:description');

document.head.appendChild(ogMetaImgtag);
document.head.appendChild(ogMetaTitletag);
document.head.appendChild(ogMetaDesctag);


class VideoContainer extends HTMLElement {
    connectedCallback() {
        this.attachShadow( { mode: 'open' } )
            .innerHTML = `<div class="iframe-container">
            <iframe class="video" width="100%" height="1005" src="${this.getAttribute('url')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
        </div>` 
    }
}

class HeroImage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `<section class="cover">
            <div class="mainimage">
                <img src="${this.getAttribute('url')}" alt="Hero Image">
            </div>
        </section>`
    }
}

class TitleText extends HTMLElement {
    
    connectedCallback() {

        let title = this.getAttribute('title')
        let tabTitle = `${title} | Design Beyond Zero | ASD GradShow 2021`
        document.title = tabTitle
        ogMetaTitletag.setAttribute('content', tabTitle);
        this.innerHTML = 
        `<div  class="titletext">
        ${title}
        </div>`
    }
}


class ProjectBio extends HTMLElement {
    connectedCallback() {
        
        let mainTitle = this.getAttribute('main-title')
        let summary = this.getAttribute('summary')
        let aboutme = this.getAttribute('aboutme')
        let studentTitle = this.getAttribute('student-title')
        let name = this.getAttribute('name')
        let portrait = this.getAttribute('portrait')
        let mentor = this.getAttribute('mentor')
        let typology = this.getAttribute('typology')
        let location = this.getAttribute('location')
        let email = this.getAttribute('email')
        let issuu = this.getAttribute('issuu')
        let website = this.getAttribute('website')
        let instagram = this.getAttribute('instagram')
        let linkedin = this.getAttribute('linkedin')

        document.querySelector('meta[name="description"]').content = summary
        ogMetaDesctag.setAttribute('content', summary);

        
        this.innerHTML = 
        `<div class="twocols invert">
        <div class="abstract">
            <h2>${mainTitle}</h2>
            ${summary}
            <br><br>
            <h4>${studentTitle}</h4>
            ${aboutme}
        </div>

        <div class="table">
            <div class="thumb">
                <img src="${portrait}" alt="Student Image"></div>
                <div class="fields">
                <h3>Name</h3>
                <p>${name}</p>
                </div>
                <div class="fields">
                </div>
                <div class="fields">
                <h3>Mentor</h3>
                <p>${mentor}</p>
                </div>
                <div class="fields">
                <h3 >Typology</h3>
                <p>${typology}</p>
                </div>
                <div class="fields">
                <h3>Site Location</h3>
                <p>${location}</p>
                </div>


                    <div class="contact">
                        ${  email === ""? "" :`<a href="mailto:${email}">                            
                        <img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgLjAyYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyem02Ljk5IDYuOThsLTYuOTkgNS42NjYtNi45OTEtNS42NjZoMTMuOTgxem0uMDEgMTBoLTE0di04LjUwNWw3IDUuNjczIDctNS42NzJ2OC41MDR6Ii8+PC9zdmc+" alt="Email me">
                        </a>`
                        }

                        ${ issuu === ""? "" :`
                        <a href="${issuu}">
                            <img class="icon" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1OTUuMjggNTk0Ljg5Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmlzc3V1LWljb24tMDwvdGl0bGU+PHBhdGggZD0iTTExLjU4LDEwLjcySDE4LjJjOTYuOSwwLDE5My44MS0uNjYsMjkwLjY5LjMzLDM3LjY3LjM4LDc0LDkuNzMsMTA4LjY4LDI1LjEyLDM2LDE2LDY2LjcsMzkuMyw5My4xOCw2OC4xMywyOC42OCwzMS4yMSw0OC44MSw2Ny4zOCw2MS42LDEwNy44OUM1ODQuMjYsMjUwLDU4Ni42NiwyODguNzMsNTg0LDMyNy42Yy0zLjc3LDU0LjcyLTIyLjI1LDEwNC41MS01NiwxNDguMzNhMjgwLjEzLDI4MC4xMywwLDAsMS04My4xNCw3Mi43M2MtMjguMzcsMTYuMjktNTksMjYuNS05MS4xLDMyLjQzLTIzLjYzLDQuMzYtNDcuNDMsMi4yNy03MS4xNSwyLjQ3LTM2LjUuMzEtNzAuNzItOS44NS0xMDMuODctMjQuMi0zMi42NC0xNC4xMy02MC44Ny0zNC42Ni04NS41Mi02MC4xMi0yNy44OS0yOC44Mi00OC42OS02Mi02MS4xMy0xMDAuMzctOC40LTI1Ljg3LTEyLjgzLTUyLjQ1LTE1LjkzLTc5LjQxLTQuNS0zOS00LjY4LTc4LjA5LTQuNi0xMTcuMjUuMTMtNjEuMDcsMC0xMjIuMTQsMC0xODMuMjFaTTEwNCwyOTkuMzJDMTAxLDQwNi4wNiwxOTIuODcsNDkzLjUsMjk3LjIyLDQ5NS4wN2MxMjMuNjksMS44NiwyMDEuNTYtOTMuNzksMjAzLTE5NC4xMSwxLjY2LTExNS43NS04Ni42MS0xOTYuMTktMTg3LjktMjAwQzE4OC45Myw5Ni4zLDEwMS42OSwxOTAuNzUsMTA0LDI5OS4zMloiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDQsMjk5LjMyYy0yLjMtMTA4LjU3LDg0Ljk0LTIwMywyMDguMzItMTk4LjM3LDEwMS4yOSwzLjgyLDE4OS41Niw4NC4yNiwxODcuOSwyMDAtMS40MywxMDAuMzItNzkuMywxOTYtMjAzLDE5NC4xMUMxOTIuODcsNDkzLjUsMTAxLDQwNi4wNiwxMDQsMjk5LjMyWm01MS4zNi0yLjc0QzE1My43MSwzODAuNzIsMjIxLjI3LDQ0NCwyOTYuNjEsNDQ1LjRjODcuNDgsMS42OCwxNDkuMjQtNjMuNTMsMTUwLjUzLTE0My45MywxLjQ0LTg5LjkyLTYzLjM0LTE0NC44OC0xMzguNDMtMTQ3LjkxQzIxMi4zNywxNDkuNjksMTU1LjIsMjE5LjQ4LDE1NS4zNSwyOTYuNThaIi8+PHBhdGggZD0iTTE1NS4zNSwyOTYuNThjLS4xNS03Ny4xLDU3LTE0Ni44OSwxNTMuMzYtMTQzLDc1LjA5LDMsMTM5Ljg3LDU4LDEzOC40MywxNDcuOTEtMS4yOSw4MC40LTYzLjA1LDE0NS42MS0xNTAuNTMsMTQzLjkzQzIyMS4yNyw0NDQsMTUzLjcxLDM4MC43MiwxNTUuMzUsMjk2LjU4Wm0xNDguNzQtNjkuODRjLTQyLjUzLS41NC03My42MywyNy4wOS03My44OCw2OS0uMjYsNDQuNDQsMjkuNTEsNzYsNzIsNzUuNDcsNDMtLjUsNjkuNTgtMjcsNjkuNzEtNzMuODRDMzcyLjA2LDI1OC4yLDM0NS4zMSwyMjUuNywzMDQuMDksMjI2Ljc0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMwNC4wOSwyMjYuNzRjNDEuMjItMSw2OCwzMS40Niw2Ny44Nyw3MC42NC0uMTMsNDYuODctMjYuNyw3My4zNC02OS43MSw3My44NC00Mi41My40OS03Mi4zLTMxLTcyLTc1LjQ3QzIzMC40NiwyNTMuODMsMjYxLjU2LDIyNi4yLDMwNC4wOSwyMjYuNzRaIi8+PC9zdmc+" alt="My Portfolio">
                        </a>`
                        }

                        ${ website === ""? "" :`
                        <a href="${website}">
                            <img class="icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yOTYuMDAwMDAwLCAtMjk2LjAwMDAwMCkiPjxnIGlkPSJsYW5ndWFnZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjk2LjAwMDAwMCwgMjk2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE0xNi45LDYgTDE0LDYgQzEzLjcsNC43IDEzLjIsMy42IDEyLjYsMi40IEMxNC40LDMuMSAxNiw0LjMgMTYuOSw2IEwxNi45LDYgWiBNMTAsMiBDMTAuOCwzLjIgMTEuNSw0LjUgMTEuOSw2IEw4LjEsNiBDOC41LDQuNiA5LjIsMy4yIDEwLDIgTDEwLDIgWiBNMi4zLDEyIEMyLjEsMTEuNCAyLDEwLjcgMiwxMCBDMiw5LjMgMi4xLDguNiAyLjMsOCBMNS43LDggQzUuNiw4LjcgNS42LDkuMyA1LjYsMTAgQzUuNiwxMC43IDUuNywxMS4zIDUuNywxMiBMMi4zLDEyIEwyLjMsMTIgWiBNMy4xLDE0IEw2LDE0IEM2LjMsMTUuMyA2LjgsMTYuNCA3LjQsMTcuNiBDNS42LDE2LjkgNCwxNS43IDMuMSwxNCBMMy4xLDE0IFogTTYsNiBMMy4xLDYgQzQuMSw0LjMgNS42LDMuMSA3LjQsMi40IEM2LjgsMy42IDYuMyw0LjcgNiw2IEw2LDYgWiBNMTAsMTggQzkuMiwxNi44IDguNSwxNS41IDguMSwxNCBMMTEuOSwxNCBDMTEuNSwxNS40IDEwLjgsMTYuOCAxMCwxOCBMMTAsMTggWiBNMTIuMywxMiBMNy43LDEyIEM3LjYsMTEuMyA3LjUsMTAuNyA3LjUsMTAgQzcuNSw5LjMgNy42LDguNyA3LjcsOCBMMTIuNCw4IEMxMi41LDguNyAxMi42LDkuMyAxMi42LDEwIEMxMi42LDEwLjcgMTIuNCwxMS4zIDEyLjMsMTIgTDEyLjMsMTIgWiBNMTIuNiwxNy42IEMxMy4yLDE2LjUgMTMuNywxNS4zIDE0LDE0IEwxNi45LDE0IEMxNiwxNS43IDE0LjQsMTYuOSAxMi42LDE3LjYgTDEyLjYsMTcuNiBaIE0xNC40LDEyIEMxNC41LDExLjMgMTQuNSwxMC43IDE0LjUsMTAgQzE0LjUsOS4zIDE0LjQsOC43IDE0LjQsOCBMMTcuOCw4IEMxOCw4LjYgMTguMSw5LjMgMTguMSwxMCBDMTguMSwxMC43IDE4LDExLjQgMTcuOCwxMiBMMTQuNCwxMiBMMTQuNCwxMiBaIiBpZD0iU2hhcGUiLz48L2c+PC9nPjwvZz48L3N2Zz4=" alt="My Website">
                        </a>`
                        }

                        ${ instagram === ""? "" :`
                        <a href="${instagram}">
                            <img class="icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNTYsMGMxNDEuMjksMCAyNTYsMTE0LjcxIDI1NiwyNTZjMCwxNDEuMjkgLTExNC43MSwyNTYgLTI1NiwyNTZjLTE0MS4yOSwwIC0yNTYsLTExNC43MSAtMjU2LC0yNTZjMCwtMTQxLjI5IDExNC43MSwtMjU2IDI1NiwtMjU2Wm0wLDk2Yy00My40NTMsMCAtNDguOTAyLDAuMTg0IC02NS45NjgsMC45NjNjLTE3LjAzLDAuNzc3IC0yOC42NjEsMy40ODIgLTM4LjgzOSw3LjQzN2MtMTAuNTIxLDQuMDg5IC0xOS40NDQsOS41NiAtMjguMzM5LDE4LjQ1NWMtOC44OTUsOC44OTUgLTE0LjM2NiwxNy44MTggLTE4LjQ1NSwyOC4zMzljLTMuOTU1LDEwLjE3NyAtNi42NTksMjEuODA4IC03LjQzNywzOC44MzhjLTAuNzc4LDE3LjA2NiAtMC45NjIsMjIuNTE1IC0wLjk2Miw2NS45NjhjMCw0My40NTMgMC4xODQsNDguOTAyIDAuOTYyLDY1Ljk2OGMwLjc3OCwxNy4wMyAzLjQ4MiwyOC42NjEgNy40MzcsMzguODM4YzQuMDg5LDEwLjUyMSA5LjU2LDE5LjQ0NCAxOC40NTUsMjguMzRjOC44OTUsOC44OTUgMTcuODE4LDE0LjM2NiAyOC4zMzksMTguNDU1YzEwLjE3OCwzLjk1NCAyMS44MDksNi42NTkgMzguODM5LDcuNDM2YzE3LjA2NiwwLjc3OSAyMi41MTUsMC45NjMgNjUuOTY4LDAuOTYzYzQzLjQ1MywwIDQ4LjkwMiwtMC4xODQgNjUuOTY4LC0wLjk2M2MxNy4wMywtMC43NzcgMjguNjYxLC0zLjQ4MiAzOC44MzgsLTcuNDM2YzEwLjUyMSwtNC4wODkgMTkuNDQ0LC05LjU2IDI4LjM0LC0xOC40NTVjOC44OTUsLTguODk2IDE0LjM2NiwtMTcuODE5IDE4LjQ1NSwtMjguMzRjMy45NTQsLTEwLjE3NyA2LjY1OSwtMjEuODA4IDcuNDM2LC0zOC44MzhjMC43NzksLTE3LjA2NiAwLjk2MywtMjIuNTE1IDAuOTYzLC02NS45NjhjMCwtNDMuNDUzIC0wLjE4NCwtNDguOTAyIC0wLjk2MywtNjUuOTY4Yy0wLjc3NywtMTcuMDMgLTMuNDgyLC0yOC42NjEgLTcuNDM2LC0zOC44MzhjLTQuMDg5LC0xMC41MjEgLTkuNTYsLTE5LjQ0NCAtMTguNDU1LC0yOC4zMzljLTguODk2LC04Ljg5NSAtMTcuODE5LC0xNC4zNjYgLTI4LjM0LC0xOC40NTVjLTEwLjE3NywtMy45NTUgLTIxLjgwOCwtNi42NiAtMzguODM4LC03LjQzN2MtMTcuMDY2LC0wLjc3OSAtMjIuNTE1LC0wLjk2MyAtNjUuOTY4LC0wLjk2M1ptMCwyOC44MjljNDIuNzIyLDAgNDcuNzgyLDAuMTYzIDY0LjY1NCwwLjkzM2MxNS42LDAuNzEyIDI0LjA3MSwzLjMxOCAyOS43MDksNS41MDljNy40NjksMi45MDIgMTIuNzk5LDYuMzcgMTguMzk3LDExLjk2OWM1LjYsNS41OTggOS4wNjcsMTAuOTI5IDExLjk2OSwxOC4zOTdjMi4xOTEsNS42MzggNC43OTgsMTQuMTA5IDUuNTA5LDI5LjcwOWMwLjc3LDE2Ljg3MiAwLjkzMywyMS45MzIgMC45MzMsNjQuNjU0YzAsNDIuNzIyIC0wLjE2Myw0Ny43ODIgLTAuOTMzLDY0LjY1NGMtMC43MTEsMTUuNiAtMy4zMTgsMjQuMDcxIC01LjUwOSwyOS43MDljLTIuOTAyLDcuNDY5IC02LjM2OSwxMi43OTkgLTExLjk2OSwxOC4zOTdjLTUuNTk4LDUuNiAtMTAuOTI4LDkuMDY3IC0xOC4zOTcsMTEuOTY5Yy01LjYzOCwyLjE5MSAtMTQuMTA5LDQuNzk4IC0yOS43MDksNS41MDljLTE2Ljg2OSwwLjc3IC0yMS45MjksMC45MzMgLTY0LjY1NCwwLjkzM2MtNDIuNzI1LDAgLTQ3Ljc4NCwtMC4xNjMgLTY0LjY1NCwtMC45MzNjLTE1LjYsLTAuNzExIC0yNC4wNzEsLTMuMzE4IC0yOS43MDksLTUuNTA5Yy03LjQ2OSwtMi45MDIgLTEyLjc5OSwtNi4zNjkgLTE4LjM5OCwtMTEuOTY5Yy01LjU5OSwtNS41OTggLTkuMDY2LC0xMC45MjggLTExLjk2OCwtMTguMzk3Yy0yLjE5MSwtNS42MzggLTQuNzk4LC0xNC4xMDkgLTUuNTEsLTI5LjcwOWMtMC43NywtMTYuODcyIC0wLjkzMiwtMjEuOTMyIC0wLjkzMiwtNjQuNjU0YzAsLTQyLjcyMiAwLjE2MiwtNDcuNzgyIDAuOTMyLC02NC42NTRjMC43MTIsLTE1LjYgMy4zMTksLTI0LjA3MSA1LjUxLC0yOS43MDljMi45MDIsLTcuNDY4IDYuMzY5LC0xMi43OTkgMTEuOTY4LC0xOC4zOTdjNS41OTksLTUuNTk5IDEwLjkyOSwtOS4wNjcgMTguMzk4LC0xMS45NjljNS42MzgsLTIuMTkxIDE0LjEwOSwtNC43OTcgMjkuNzA5LC01LjUwOWMxNi44NzIsLTAuNzcgMjEuOTMyLC0wLjkzMyA2NC42NTQsLTAuOTMzWm0wLDQ5LjAwOWMtNDUuMzc3LDAgLTgyLjE2MiwzNi43ODUgLTgyLjE2Miw4Mi4xNjJjMCw0NS4zNzcgMzYuNzg1LDgyLjE2MiA4Mi4xNjIsODIuMTYyYzQ1LjM3NywwIDgyLjE2MiwtMzYuNzg1IDgyLjE2MiwtODIuMTYyYzAsLTQ1LjM3NyAtMzYuNzg1LC04Mi4xNjIgLTgyLjE2MiwtODIuMTYyWm0wLDEzNS40OTVjLTI5LjQ1NSwwIC01My4zMzMsLTIzLjg3OCAtNTMuMzMzLC01My4zMzNjMCwtMjkuNDU1IDIzLjg3OCwtNTMuMzMzIDUzLjMzMywtNTMuMzMzYzI5LjQ1NSwwIDUzLjMzMywyMy44NzggNTMuMzMzLDUzLjMzM2MwLDI5LjQ1NSAtMjMuODc4LDUzLjMzMyAtNTMuMzMzLDUzLjMzM1ptMTA0LjYwOSwtMTM4Ljc0MWMwLDEwLjYwNCAtOC41OTcsMTkuMTk5IC0xOS4yMDEsMTkuMTk5Yy0xMC42MDMsMCAtMTkuMTk5LC04LjU5NSAtMTkuMTk5LC0xOS4xOTljMCwtMTAuNjA0IDguNTk2LC0xOS4yIDE5LjE5OSwtMTkuMmMxMC42MDQsMCAxOS4yMDEsOC41OTYgMTkuMjAxLDE5LjJaIi8+PC9zdmc+" alt="My Instagram">
                        </a>`
                        }

                        ${ linkedin === ""? "" :`
                        <a href="${linkedin}">
                            <img class="icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwMCUiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNTYsMGMxNDEuMjksMCAyNTYsMTE0LjcxIDI1NiwyNTZjMCwxNDEuMjkgLTExNC43MSwyNTYgLTI1NiwyNTZjLTE0MS4yOSwwIC0yNTYsLTExNC43MSAtMjU2LC0yNTZjMCwtMTQxLjI5IDExNC43MSwtMjU2IDI1NiwtMjU2Wm0tODAuMDM3LDM5OS44NzFsMCwtMTk5LjkyMWwtNjYuNDY0LDBsMCwxOTkuOTIxbDY2LjQ2NCwwWm0yMzkuNjIsMGwwLC0xMTQuNjQ2YzAsLTYxLjQwOSAtMzIuNzg3LC04OS45NzYgLTc2LjUwOSwtODkuOTc2Yy0zNS4yNTUsMCAtNTEuMDQ3LDE5LjM4OSAtNTkuODg5LDMzLjAwN2wwLC0yOC4zMDZsLTY2LjQ0NywwYzAuODgxLDE4Ljc1NyAwLDE5OS45MjEgMCwxOTkuOTIxbDY2LjQ0NiwwbDAsLTExMS42NWMwLC01Ljk3NiAwLjQzLC0xMS45NSAyLjE5MSwtMTYuMjIxYzQuNzk1LC0xMS45MzUgMTUuNzM3LC0yNC4yOTkgMzQuMDk1LC0yNC4yOTljMjQuMDM0LDAgMzMuNjYzLDE4LjM0IDMzLjY2Myw0NS4yMDRsMCwxMDYuOTY2bDY2LjQ1LDBabS0yNzIuNDAzLC0yOTYuMzIxYy0yMi43NCwwIC0zNy41OTcsMTQuOTUgLTM3LjU5NywzNC41NDVjMCwxOS4xODIgMTQuNDA1LDM0LjU0NCAzNi43MTcsMzQuNTQ0bDAuNDI5LDBjMjMuMTc1LDAgMzcuNiwtMTUuMzYyIDM3LjYsLTM0LjU0NGMtMC40MywtMTkuNTk1IC0xNC40MjQsLTM0LjU0NSAtMzcuMTQ5LC0zNC41NDVaIi8+PC9zdmc+" alt=""My Linkedin>
                        </a>`
                    }
                    </div>

        </div>
    </div>`
    }
}

class SpecialImage extends HTMLElement {
    connectedCallback() {
        let specialImage = this.getAttribute('url')
        this.innerHTML = 
        ` <div class="splimage">
            <img src="${specialImage}" alt="Special Image">
        </div>`
    }
}

class TripleImages extends HTMLElement {
    connectedCallback() {
        let first = this.getAttribute('first')
        let second = this.getAttribute('second')
        let third = this.getAttribute('third')
        this.innerHTML = 
        `<div class="gifs">
        <img src="${first}" alt="First Image">
        <img src="${second}" alt="Second Image">
        <img src="${third}" alt="Third Image">
    </div>`
    }
}

class TextImage extends HTMLElement {
    connectedCallback() {
        let title = this.getAttribute('title')
        let text = this.getAttribute('text')
        let image = this.getAttribute('image')
        this.innerHTML = 
        `<div class="twocols" id="nmir">
        <div class="abstract">
            <h2>${title}</h2>
            ${text}
        </div>
        <img class="right" src="${image}" alt="Right Image">
    </div>`
    }
}

class ImageText extends HTMLElement {
    connectedCallback() {
        let title = this.getAttribute('title')
        let text = this.getAttribute('text')
        let image = this.getAttribute('image')
        this.innerHTML = 
        `<div class="twocols" id="mir">
            <img class="left" src="${image}" alt="Left Image">
            <div class="mir_abstract">
                <h2>${title}</h2>
                ${text}
            </div>
        </div>`
    }
}

class ImageCarouselText extends HTMLElement {
    connectedCallback() {
        let title = this.getAttribute('title')
        let text = this.getAttribute('text')
        let attr = this.getAttribute('images')
        let images = JSON.parse(attr)

        function getSwitcherList(){
            let switcher = []
            for(let i=1; i<images.images.length; i++){
                switcher.push(`<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`)
            }
            return switcher.join('')
        }

        function getSliderList(){
            let slider = []
            for(let i=1; i< images.images.length; i++) {
                slider.push(`<div class="carousel-item">
                <img class="d-block w-100" src="${images.images[i]}" alt=" Slider Images">
                </div>`)
            }
            return slider.join('')
        }

        this.innerHTML =         
        `<div class="twocols" id="mir">
            <div class="single>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        ${  getSwitcherList()   }
        
                    </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${images.images[0]}" alt="First slide">
                    </div>
                    ${ getSliderList() }
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>  
            <div class="mir_abstract">
                <h2>${title}</h2>
                    ${text}
            </div>
        </div>
        `
    }
}

class SingleImage extends HTMLElement {
    connectedCallback() {
        let image = this.getAttribute('url')
        this.innerHTML = 
        `<div class="single">
            <img src="${image}" alt="Main Image">
        </div>`
    }
}

class ImageImage extends HTMLElement {
    connectedCallback() {
        let first = this.getAttribute('first')
        let second = this.getAttribute('second')
        this.innerHTML = 
        `<div class="twocols">
        <img class="left" src="${first}" alt="Left Image">
        <img class="right" src="${second}" alt="Right Image">
        </div>
    </div>`
    }
}

class ImageCarousel extends HTMLElement {
    connectedCallback() {
        let attr = this.getAttribute('images')
        let images = JSON.parse(attr)
        // console.log(images.images.slice(1));

        function getSwitcherList(){
            let switcher = []
            for(let i=1; i<images.images.length; i++){
                switcher.push(`<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`)
            }
            return switcher.join('')
        }

        function getSliderList(){
            let slider = []
            for(let i=1; i< images.images.length; i++) {
                slider.push(`<div class="carousel-item">
                <img class="d-block w-100" src="${images.images[i]}" alt=" Slider Images">
                </div>`)
            }
            return slider.join('')
        }

        this.innerHTML = 
        `<div class="single">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          ${  getSwitcherList()   }
        
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="${images.images[0]}" alt="First slide">
          </div>
        ${ getSliderList() }
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      </div>`
    }
}

class TextOnly extends HTMLElement {
    connectedCallback() {
        let title = this.getAttribute('title')
        let text = this.getAttribute('content')
        this.innerHTML = 
        `<div class="fullsize">
        <h2>${title}</h2>
    <p style="text-align:justify;">${text}</p>
        </div>`
    }
}

class ImgCaption extends HTMLElement {
    connectedCallback() {
        let text = this.getAttribute('content')
        this.innerHTML = 
        `<div class="imgcaption">
        <p style="text-align:center;">${text}</p>
        </div>`
    }
}






window.customElements.define('video-container', VideoContainer)
window.customElements.define('hero-image', HeroImage)
window.customElements.define('title-text', TitleText)
window.customElements.define('project-bio', ProjectBio)
window.customElements.define('special-image', SpecialImage)
window.customElements.define('triple-images', TripleImages)
window.customElements.define('text-only', TextOnly)
window.customElements.define('img-caption', ImgCaption)
window.customElements.define('text-image', TextImage)
window.customElements.define('image-text', ImageText)
window.customElements.define('single-image', SingleImage)
window.customElements.define('image-image', ImageImage)
window.customElements.define('image-carousel', ImageCarousel)
window.customElements.define('image-carousel-text', ImageCarouselText)