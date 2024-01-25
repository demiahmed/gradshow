d3.csv(
  `${document.querySelector("#router").getAttribute("filepath")}`,
  function (data) {
    console.log(data);
    var PHOTODATA = [];
    let processedName;

    for (var i = 0; i < data.length; i++) {
      processedName = data[i].key;
      var photo = {
        id: i,
        category: data[i].Topic,
        name: data[i].name,
        url: `${document
          .querySelector("#router")
          .getAttribute("prefix")}../projects/${document
          .querySelector("#router")
          .getAttribute("year")}/${processedName}/`,
        //iu: "./explore/" + String(data[i].name) ,
        path: `${document
          .querySelector("#router")
          .getAttribute("prefix")}../projects/${document
          .querySelector("#router")
          .getAttribute("year")}/${processedName}/${processedName}`,
      };
      // console.log(photo.url, photo.path);
      PHOTODATA.push(photo);
    }

    // console.log(PHOTODATA);

    {
      /*Create a component of the filter panel*/
    }

    var FilterPanel = React.createClass({
      render: function () {
        return (
          <button className="button" onClick={this.props.onClick}>
            {this.props.category}
          </button>
        );
      },
    });

    {
      /*Create a layout component for one photo*/
    }

    var Photo = React.createClass({
      render: function () {
        return (
          <a className="photo-container" href={String(this.props.url)}>
            <div className="wrapper" data-category={this.props.category}>
              <img
                className="back-image"
                src={this.props.path + ".jpg"}
                onError={(e) =>
                  (e.target.src = this.props.path + ".png")
                  (e.target.src = "../../assets/fallbackimgs/missing.jpg")
                }
              />
              <img
                className="front-image"
                src={this.props.path + "-project.jpg"}
                onError={(e) => {
                  e.target.src = this.props.path + "-project.png"; // Try loading PNG if JPG fails
                  e.target.onerror = null; // Remove the fallback for PNG if it also fails
                }}
              />{" "}
              {/* <img className = "front-image" src="./assets/awards/zaha.jpg" /> */}
              <div className="overlay">
                <div className="content">{this.props.name}</div>
              </div>
            </div>
          </a>
        );
      },
    });

    {
      /*Create a final collection of photos in photoGallery*/
    }
    var PhotoGallery = React.createClass({
      getInitialState: function () {
        return {
          displayedCategories: PHOTODATA,
          active: false,
        };
      },
      toggleActive: function () {
        this.setState({
          active: !this.state.active,
        });
      },

      selectCategory: function (element) {
        // console.log('element is: '+ element);
        var categoryName = element.toLowerCase();
        var displayedCategories = PHOTODATA.filter(function (el) {
          var searchValue = el.category.toLowerCase();
          return searchValue.indexOf(categoryName) !== -1;
        });

        this.setState({
          displayedCategories: displayedCategories,
        });
      },
      resetFilter: function (element) {
        this.setState({
          displayedCategories: PHOTODATA,
        });
      },

      render: function () {
        var buttonClass = this.state.active ? "active" : "";
        var categoryToSelect = this.selectCategory;
        var getUniqueCategories = [];
        PHOTODATA.forEach(function (el) {
          if (getUniqueCategories.indexOf(el.category) === -1)
            getUniqueCategories.push(el.category);
        });

        return (
          <div className="overlay-photogallery">
            <div className="filter-panel">
              {getUniqueCategories.map(function (el, i) {
                var boundClick = categoryToSelect.bind(null, el);
                return (
                  <FilterPanel onClick={boundClick} category={el} key={i} />
                );
              })}
              <button className="resetBtn" onClick={this.resetFilter}>
                Reset Filter
              </button>
            </div>
            <div className="PhotoGallery">
              {this.state.displayedCategories.map(function (el) {
                return (
                  <Photo
                    key={el.id}
                    url={el.url}
                    category={el.category}
                    path={el.path}
                    name={el.name}
                  />
                );
              })}
            </div>
          </div>
        );
      },
    });

    ReactDOM.render(<PhotoGallery />, document.getElementById("main"));
  }
);
