class AwardIntro extends HTMLElement {
    connectedCallback() {
        let title = this.getAttribute('title')
        let paragraph = this.getAttribute('paragraph')
        this.innerHTML = 
        `        <div class="img" id="satImgB">
        <div class="desc ">
            <p id="award-title">${title}</p>
            <p class="solo">${paragraph}</p>
        </div>
    </div>`
    }
}

// class AwardItem extends HTMLElement {
//     connectedCallback() {
//         let awardName = this.getAttribute('award-name')
//         let linkToPage = this.getAttribute('link-to-page')
//         let thumbnailURL = this.getAttribute('thumbnail-url')
//         let studentName = this.getAttribute('student-name')
//         let projectName = this.getAttribute('project-name')
//         let judgedBy = this.getAttribute('judged-by')
//         this.innerHTML = 
//         ` <div class="img" id="aerImgG">
//         <br><br><br><br> 
//         <div class="caption2">${awardName}</div>
//         <div class="peoplegrid-award">
//             <div class="people">
//                 <a href ="${linkToPage}"><div class="thumb">
//                     <img src="${thumbnailURL}" alt="Award Recipient">
//                 </div></a>
//                 <a href="${linkToPage}"><div class="peoplename">
//                 ${studentName} <br>
//                 ${projectName}
//                 </div></a>
//                 <div class="peoplerole">
//                     Judged By <br>
//                     ${judgedBy}
//                 </div>
//             </div>

//           </div>
//       </div>
// `
//     }
// }
class AwardItem extends HTMLElement {
    connectedCallback() {
        let awardName = this.getAttribute('award-name')
        let linkToPage = this.getAttribute('link-to-page')
        let thumbnailURL = this.getAttribute('thumbnail-url')
        let studentName = this.getAttribute('student-name')
        let projectName = this.getAttribute('project-name')
        let judgedBy = this.getAttribute('judged-by')
        this.innerHTML = 
        ` 
        <div class="award-item">
            <div class="people">
                <p class="caption2">${awardName}</p>
                <a href ="${linkToPage}">
                    <div class="thumb">
                        <img src="${thumbnailURL}" alt="Award Recipient">
                    </div>
                </a>
                <a href="${linkToPage}">
                    <div class="peoplename">
                    ${studentName} <br>
                    <p class="project-name">${projectName}</p>
                    </div>
                </a>
                <div class="peoplerole">
                    Judged By <br>
                    ${judgedBy}
                </div>
            </div>

            </div>
        </div>
`
    }
}

class JuryItem extends HTMLElement {
    connectedCallback() {
        let awardName = this.getAttribute('award-name')
        let linkToPage = this.getAttribute('link-to-page')
        let thumbnailURL = this.getAttribute('thumbnail-url')
        let studentName = this.getAttribute('student-name')
        let projectName = this.getAttribute('project-name')
        let judgedBy = this.getAttribute('judged-by')
        this.innerHTML = 
        ` 
        <div class="award-item">
            <p class="caption2">${awardName}</p>
                    <div class="people">
                            <div class="thumb">
                                <img src="${thumbnailURL}" alt="Award Recipient">
                            </div>
                            <div class="peoplename">
                            ${studentName} <br>
                            <p class="project-name">${projectName}</p>
                            </div>
                        <div style="text-align:left;" class="peoplerole">
                             <br>
                            ${judgedBy}
                        </div>
                    </div>

            </div>
        </div>
`
    }
}





window.customElements.define('award-intro', AwardIntro)
window.customElements.define('award-item', AwardItem)
window.customElements.define('jury-item', JuryItem)