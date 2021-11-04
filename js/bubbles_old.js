console.clear()
var w = window.screen.width,
h = window.screen.height;

var midlineY = 2*(h/3);
var minNameOffsetNum = 6;

var color = d3.scaleOrdinal(d3.schemeCategory20);
var centerScale = d3.scalePoint().padding(1).range([w/20,19*(w/20)]);
var centerScaley = d3.scalePoint().padding(1).range([h/3, 2*h]);
var forceStrength = 0.06;

if (window.screen.width > 767){
  var svg = d3.select("body").append("svg")
    .attr('class', 'svg-container')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('class', 'svg-content')
    .attr('viewBox' , "0 0 "  + w + " " + h)
    .attr("width", w)
    .attr("height", h)
}

else {
  var svg = d3.select("body").append("svg")
    .attr('class', 'svg-container')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('class', 'svg-content')
    .attr('viewBox' , "0 -200 "  + w + " " + h)
    .attr("width", w)
    .attr("height", h)
}
// var defs = svg.append("defs");

// defs.append("pattern")
// .attr("id", "student")
// .attr("height", "100%")
// .attr("width", "100%")
// .attr("patternContentUnits", "objectBoundingBox")
// .append("image")
// .attr("height", "1")
// .attr("width", "1")
// .attr("preserveAspectRatio", "none")
// .attr("xmlns:xlink", "https://www.w3.org/1999/xlink")


var simulation = d3.forceSimulation()
        .force("collide",d3.forceCollide( function(d){
              return radiusScale(d.radius) + 1 }).iterations(60)
        )
        .force("charge", d3.forceManyBody())
        // .force("center", d3.forceCenter(w/2, midlineY))
        .force("y", d3.forceY().y(midlineY))
        .force("x", d3.forceX().x(w / 2))

var radiusScale = d3.scaleSqrt().domain([60, 200]).range([12, 80])

if(window.screen.width<767) {
  console.log(window.screen.width)
  var radiusScale = d3.scaleSqrt().domain([60, 200]).range([12, 20])
}

var div = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0)

var divProf = d3.select("body").append("div")
.attr("class", "proftooltip")
.style("opacity", 0)



var circles
// var circlesEnter
var defs = svg.append('defs')

let file = document.querySelector("#data-provider").getAttribute("filename")

// d3.csv(`../assets/drivers/${file}`, function(data){ 
d3.csv(`../../assets/drivers/${file}`, function(data){ 
    restart(data)

})

var circles

function restart(data) {
    // data.forEach(function(d){
    //     d.x = w / 2;
    //     d.y = h / 2;
    //   })

    // transition
    var t = d3.transition()
    .duration(750);

      //console.table(data);
      a = {
        advisor: [],
        location: [],
        topic: [],
        subtopic: [],
        scale: [],
        height: [],
        time:[],
        SDGname: []
      };
    
      compareDict = {
        mainAdvisor: 'advisor',
        Location: 'location',
        Topic: 'topic',
        Subtopic: 'subtopic',
        Scale: 'scale',
        Height: 'height',
        Time: 'time',
    
    
      }
      data.forEach(function(d){
        a['advisor'].push(d.mainAdvisor)
        a['location'].push(d.Location)
        a['topic'].push(d.Topic)
        a['subtopic'].push(d.Subtopic)
        a['scale'].push(d.Scale)
        a['height'].push(d.Height)
        a['time'].push(d.Time)
    
      })
      a['advisor'].sort();
      a['location'].sort();
      a['topic'].sort();
      a['subtopic'].sort();

    
      defs = svg.select('defs').selectAll('pattern')
      .data(data)
      defs.exit().remove()

  let defEnter = defs
      .enter().append("pattern")
      .attr("id", function(d) {
          return d.key
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", "1")
      .attr("width", "1")
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "https://www.w3.org/1999/xlink")
      .attr("xlink:href", function(d) {
          return `../../projects/2020/${d.key}/${d.key}.jpg`
      })
      
  defs = defs.merge(defEnter)
    
    
    // console.log(circles);
      circles = svg.selectAll("circle").data(data)
      circles.exit()        
        .transition(t)
            .attr("r", 1e-6) 
            .remove()

        circles
        .transition(t)
            .attr("r", (d) => radiusScale(d.radius))


      let enter = circles
        .enter()
        .append("circle")
        .attr("r", 1e-6) 
        .attr("class", "artist")
        // .attr("r", function(d) {
        //       return radiusScale(d.radius);
        //     })
        .style("pointer-events", "all")
        .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
        .attr("fill", function(d) {
            return `url(#${d.key})`
          })    
    
        .on('click', function(d) {
              window.open(`../projects/2020/${d.key}/`)
        })
    
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85')
    
            div.transition()
                .duration(50)
                .style("opacity", 1);
    
            divProf.transition()
                .duration(50)
                .style("opacity", 1);
    
            div.html(d.name)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px")
        })
        
    
        .on('mouseout', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1')
            div.transition()
            .duration(50)
            .style("opacity", 0);
            divProf.transition()
            .duration(50)
            .style("opacity", 0);
            susGoals.html(`<img class="sus-img" src="../assets/ungoals/black.jpg" alt="Sustainability Goals">`)
            // .duration(50)
            .style("opacity", 1);
        })
        .transition(t)
            .attr("r", (d) => radiusScale(d.radius));


        circles = circles.merge(enter)



    // Update and restart the simulation.
    simulation
    .nodes(data)
    .on("tick", ticked);

    hideTitles();
    d3.selectAll('.button').classed("active", false);
    d3.select('.button').classed("active", true);
    groupBubbles()

  function ticked() {
    //console.log("tick")
    //console.log(data.map(function(d){ return d.x; }));
    circles
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; });
  }

  function groupBubbles() {
    hideTitles();

    // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation     
    
    .force("y", d3.forceY().y(midlineY))
    .force("x", d3.forceX().x(w / 2))
    .alpha(1).restart();
    }



    // @v4 We can reset the alpha value and restart the simulation
  function splitBubbles(byVar) {

    if (window.screen.width > 767){
    centerScale.domain(data.map(function(d,i){
      //var a = [];
      // a.push(d[byVar])

      //console.log("test" + compareDict[byVar]);
      return a[compareDict[byVar]][i]; }));
      // return d[byVar]; }));
    if(byVar == "all"){
      hideTitles()
    } else {
        showTitles(byVar, centerScale);
    }

    // @v4 Reset the 'x' force to draw the bubbles to their year centers


    // Add logic to shift the bubbles up and down from the centerline if there are alot
    //to stop crowding
    simulation.force('y', d3.forceY().strength(forceStrength).y(function(d,i){
      if (centerScale.domain().length<minNameOffsetNum){ //if few just use baseline
        return midlineY;
      }
      var index = centerScale.domain().indexOf(d[byVar]); //else offset
      return midlineY+((index%2)-0.5)*100;
    }));
    simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){
      return centerScale(d[byVar]);
    }));

  }

    if (window.screen.width < 767){

    centerScaley.domain(data.map(function(d,i){ return a[compareDict[byVar]][i]; }));
    if(byVar == "all"){
      hideTitles()
    } else {
        showTitles(byVar, centerScaley);
    }

    simulation.force('y', d3.forceY().strength(forceStrength).y(function(d){
        return centerScaley(d[byVar]);
    }));
    simulation.force('x', d3.forceX().strength(forceStrength).x(2*w / 3));
    }


    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(2).restart();
  }

  function hideTitles() {
    svg.selectAll('.title').remove();
  }

  function showTitles(byVar, scale) {
    // Another way to do this would be to create
    // the year texts once and then just hide them.
       var titles = svg.selectAll('.title')
      .data(scale.domain());

    if(window.screen.width > 767) {
    titles.enter().append('text')
          .attr('class', 'title')
        .merge(titles)
        .attr('x', function (d) { return scale(d); })
        .attr('y', function (d,i) { //added up-down-up heights to names in case of clash
            if (centerScale.domain().length<minNameOffsetNum){ //if few just use baseline
              return 4.5*(h/5);
            } return 4.5*(h/5)- ((i+1)%2*(h*0.45));
        })
        .style('fill', 'white')
        .attr('text-anchor', 'middle')
        .text(function (d) { return ' ' + d; });
    }

    if(window.screen.width < 767) {
      titles.enter().append('text')
      .attr('class', 'title')
      .merge(titles)
      .attr('y', function (d) { return scale(d) ; })
      .attr('x', w/12)
      .style('fill', 'white')
      .attr('text-anchor', 'left')
      .text(function (d) { return ' ' + d; });
    }

    titles.exit().remove()
  }

  function setupButtons() {
    d3.selectAll('.button')
      .on('click', function () {

        // Remove active class from all buttons
        d3.selectAll('.button').classed('active', false);
        // Find the button just clicked
        var button = d3.select(this);

        // Set it as the active button
        button.classed('active', true);

        // Get the id of the button
        var buttonId = button.attr('id');

          // console.log(buttonId)
        // Toggle the bubble chart based on
        // the currently clicked button.
        splitBubbles(buttonId);
      });
  }

  setupButtons()
}


function dragstarted(d,i) {
    //console.log("dragstarted " + i)
    if (!d3.event.active) simulation.alpha(1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d,i) {
    //console.log("dragged " + i)
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d,i) {
    //console.log("dragended " + i)
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    var me = d3.select(this)
    console.log(me.classed("selected"))
    me.classed("selected", !me.classed("selected"))

  }