//Enrty data
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const RATED_CLASSNAMES = {
  div: "main-section__block",
  a: "main-section__block__a",
  img: "main-section__block__img",
  p: "main-section__block__p",
  h2: "main-section__h2"
}

const ASIDE_CLASSNAMES = {
  div: "main-aside__block",
  a: "main-aside__block__a",
  img: "main-aside__block__img",
  p: "main-aside__block__p"
}

const CARD_CLASSNAMES = {
  div: "main-section__block main-section__block_search_results movie",
  a: "main-section__block__a main-section__block__a_search_results ",
  img: "main-section__block__img main-section__block__img_search_results",
  p: "main-section__block__p main-section__block__p_search_results"
}

const LIST_CLASSNAMES = {
  div: "main-bottom__block",
  a: "main-bottom__block__a",
  img: "main-bottom__block__img"
}
const arrList = [3, 28, 3945, 2469, 932, 3681, 43, 338, 3321, 1131, 3682, 1];
const aside = document.getElementById("aside");
const main = document.getElementById('main');
const mainBlock = document.getElementById('main-block');
const mainSection = document.getElementById('main-section');
const mainBottom = document.getElementById('main-bottom');
const movie = document.getElementById("movie");
const search = document.getElementById("search");
const tv = document.getElementById("tv");
const person = document.getElementById("person");
const movieNumber = document.getElementById("movie-number");
const tvNumber = document.getElementById("tv-number");
const personNumber = document.getElementById("person-number");

// Abstract class
class StructureConstructor {
  constructor(classNames) {
    this.classNames = classNames;
  }

  createDiv() {
    let div = document.createElement('div');
    div.className = this.classNames.div;
    return div
  }

  createH2(inner) {
    let h2 = document.createElement("h2");
    h2.className = this.classNames.h2;
    h2.innerHTML = inner;
    return h2
  }

  createP(inner) {
    let p = document.createElement("p");
    p.className = this.classNames.p;
    p.innerHTML = inner;
    return p
  }
  createSpan(inner) {
    let span = document.createElement("span");
    span.className = this.classNames.span;
    span.innerHTML = inner;
    return span
  }
  createImg(attribute) {
    let img = document.createElement("img");
    img.className = this.classNames.img;
    img.setAttribute("src", attribute)
    return img
  }

  createA(inner) {
    let a = document.createElement("a");
    a.className = this.classNames.a;
    a.setAttribute("href", "#")
    a.innerHTML = inner;
    return a
  }

  createUl() {
    let ol = document.createElement("ol");
    ol.className = this.classNames.ul;;
    return ol;
  }

  createLi(inner) {
    let li = document.createElement("li");
    li.className = this.classNames.li;
    li.innerHTML = inner;
    return li;
  }
}

// Class for creating movie/tv cards based on criteria (upcoming and top rated)
class UpcomingConstructor extends StructureConstructor {
  constructor(classNames, poster, title) {
    super(classNames);
    this.poster = poster;
    this.title = title;
  }
  getImagePath() {
    let image = `https://image.tmdb.org/t/p/w300${this.poster}`;
    if (this.poster == null || this.poster == undefined || this.poster == NaN) {
      image = `images/pop.png`;
    }
    return image;
  }
  outputDiv() {
    let outputDiv = this.createDiv();
    let a = this.createA("");
    a.appendChild(this.createImg(this.getImagePath()));
    outputDiv.appendChild(a);
    outputDiv.appendChild(this.createA(this.title));
    return outputDiv;
  }
}

// Class for creating movie list cards
class ListConstructor extends StructureConstructor {
  constructor(classNames, name, poster) {
    super(classNames);
    this.name = name;
    this.poster = poster;

  }
  getImagePath() {
    let image = `https://image.tmdb.org/t/p/w300${this.poster}`;
    if (this.poster == null || this.poster == undefined || this.poster == NaN) {
      image = `images/pop.png`;
    }
    return image;
  }
  outputDiv() {
    let outputDiv = this.createDiv();
    let a = this.createA("");
    a.appendChild(this.createImg(this.getImagePath()));
    outputDiv.appendChild(a);
    outputDiv.appendChild(this.createA(this.name));
    return outputDiv;
  }
}

// Class for creating movie/tv cards
class CardsConstructor extends StructureConstructor {
  constructor(classNames, poster, name, title, vote, releaseDate, airDate, overview) {
    super(classNames);
    this.poster = poster;
    this.name = name;
    this.title = title;
    this.vote = vote;
    this.releaseDate = releaseDate;
    this.airDate = airDate;
    this.overview = overview;
  }

  getImagePath() {
    let image = `https://image.tmdb.org/t/p/w200${this.poster}`;
    if (this.poster == null || this.poster == undefined || this.poster == NaN) {
      image = `images/pop.png`;
    }
    return image;
  }

  getTitle() {
    let title = this.name;
    if (this.name == undefined) {
      title = this.title;
    }
    return title;
  }

  getDate() {
    let dateBase = this.releaseDate;
    if (this.releaseDate == undefined) {
      dateBase = this.airDate;
    }

    let date = new Date(dateBase);
    Date.prototype.valid = function() {
      return isFinite(this);
    }

    let inner = "Hey! It`looks like we don`t know the exact date. Can you help us?";
    if (date.valid()) {
      inner = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }
    return inner;
  }

  getPopularity() {
    let popularity = Math.round(this.vote * 10) + "%";
    return popularity;
  }

  outputDiv() {
    let outputDiv = this.createDiv();
    let childDiv = this.createDiv();
    childDiv.removeAttribute("class")
    childDiv.setAttribute("class", "main-section__block_search_results__div")
    outputDiv.appendChild(childDiv);
    childDiv.appendChild(this.createA(this.getTitle()));
    childDiv.appendChild(this.createP(this.getPopularity()));
    childDiv.appendChild(this.createP(this.getDate()));
    childDiv.appendChild(this.createP(this.overview));
    let a = this.createA("");
    a.appendChild(this.createImg(this.getImagePath()));
    outputDiv.appendChild(a);
    return outputDiv;
  }
}

// Class for creating person cards
class PersonCardConstructor extends StructureConstructor {
  constructor(classNames, profile, name, popularity, knownFor) {
    super(classNames);
    this.profile = profile;
    this.name = name;
    this.popularity = popularity;
    this.knownFor = knownFor;
  }

  getImagePath() {
    let image = `https://image.tmdb.org/t/p/w200${this.profile}`;
    if (this.profile == null || this.profile == undefined || this.profile == NaN) {
      image = `images/no_photo.jpg`;
    }
    return image;
  }

  getPopularity() {
    let popularity = Math.round(this.popularity * 10) + "%";
    return popularity;
  }
  getKnownFor() {
    let arr = this.knownFor;
    let newArr = [];
    arr.forEach(x => {
      newArr.push((x.title == undefined) ? x.name : x.title);
    })
    let inner = newArr.join(" , ")
    return inner;
  }
  outputDiv() {
    let outputDiv = this.createDiv();
    let childDiv = this.createDiv();
    childDiv.removeAttribute("class")
    childDiv.setAttribute("class", "main-section__block_search_results__div")
    outputDiv.appendChild(childDiv);
    childDiv.appendChild(this.createA(this.name));
    childDiv.appendChild(this.createP(this.getPopularity()));
    childDiv.appendChild(this.createP(`Known for: ${this.getKnownFor()}`));
    let a = this.createA("");
    a.appendChild(this.createImg(this.getImagePath()));
    outputDiv.appendChild(a);
    return outputDiv;
  }
}

// Class for creating filtered search results
class DataFilter {
  constructor(data) {
    this.movieNumber = data.filter(x => x.media_type == "movie");
    this.tvNumber = data.filter(x => x.media_type == "tv");
    this.personNumber = data.filter(x => x.media_type == "person");
  }
  getMovieCards() {
    if (this.movieCards == undefined) {
      this.movieCards = [];
      this.movieNumber.forEach(x => {
        this.movieCards.push(new CardsConstructor(CARD_CLASSNAMES, x.poster_path, x.name, x.title, x.vote_average, x.release_date, x.first_air_date, x.overview))
      });
    }
    return this.movieCards;
  }
  getTvCards() {
    if (this.tvCards == undefined) {
      this.tvCards = [];
      this.tvNumber.forEach(x => {
        this.tvCards.push(new CardsConstructor(CARD_CLASSNAMES, x.poster_path, x.name, x.title, x.vote_average, x.release_date, x.first_air_date, x.overview))
      });
    }
    return this.tvCards;
  }
  getPersonCards() {
    if (this.personCards == undefined) {
      this.personCards = [];
      this.personNumber.forEach(x => {
        this.personCards.push(new PersonCardConstructor(CARD_CLASSNAMES, x.profile_path, x.name, x.popularity, x.known_for))
      });
    }
    return this.personCards;
  }
}


// Function for random choice
let getRandomArr = (arr, arrLength, min) => {
  let outputArr = [];

  for (let i = 0; i < arrLength; i++) {
    outputArr = getRandomArrNum(outputArr, i, arr, arrLength, min);
  }

  let arrResponse = [];
  outputArr.forEach(x => arrResponse.push(arr[x]));
  return arrResponse;
}

let getRandomArrNum = (outputArr, i, arr, arrLength, min) => {
  if (outputArr.length == i + 1) {
    return outputArr;
  }
  let number = Math.floor(Math.random() * (arr.length - min)) + min;

  if (outputArr.includes(number)) {
    getRandomArrNum(outputArr, i, arr, arrLength, min);
  } else {
    outputArr.push(number)
  }
  return outputArr;
}

// Get request for top rated tv shows
axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&language=en-US&page=1")
  .then(response => {
    let data = getRandomArr(response.data.results, 6, 0);
    data.forEach(x => {
      let blockTvTopRated = new UpcomingConstructor(RATED_CLASSNAMES, x.poster_path, x.name);
      mainSection.appendChild(blockTvTopRated.outputDiv());
    })
  })

// Get request for upcoming movies
axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&language=en-US&page=1&region=US")
  .then(response => {
    let data = getRandomArr(response.data.results, 3, 0);
    data.forEach(x => {
      let blockUpcoming = new UpcomingConstructor(ASIDE_CLASSNAMES, x.poster_path, x.title)
      aside.appendChild(blockUpcoming.outputDiv());
    })
  })

// Get request for users` movie lists
let randArrList = getRandomArr(arrList, 3, 0);
randArrList.forEach(x => {
  let listId = x;
  axios.get(`https://api.themoviedb.org/3/list/${listId}?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&language=en-US`)
    .then(response => {
      let blockList = new ListConstructor(LIST_CLASSNAMES, response.data.name, response.data.poster_path)
      mainBottom.appendChild(blockList.outputDiv());
    })
})

// Function for apllying custom styles after search done
let applyCustomStylesAfterSearch = () => {
  aside.style.display = "none";
  mainSection.style.width = "100%";
  mainSection.style.display = "flex";
  mainSection.style.flexDirection = "column";
  mainSection.style.alignItems = "center";
  mainSection.innerHTML = "";
  mainBottom.innerHTML = "";
  mainBlock.style.width = "90%"
  aside.innerHTML = "";
  main.style.flexDirection = "row-reverse";
}

// Function for reset styles for filter
let resetFilter = (button) => {
  movie.style.borderBottom = "1px solid transparent";
  tv.style.borderBottom = "1px solid transparent";
  person.style.borderBottom = "1px solid transparent";
  mainSection.innerHTML = '';
  button.style.borderBottom = "1px solid green";
}

// Function for counting search results
let populateCounters = (dataFilter) => {
  movieNumber.innerHTML = ` (${dataFilter.movieNumber.length})`;
  tvNumber.innerHTML = ` (${dataFilter.tvNumber.length})`;
  personNumber.innerHTML = ` (${dataFilter.personNumber.length})`;
}

// Get request for multiple search
document.getElementById('submit').onclick = () => {
  let term = search.value;
  applyCustomStylesAfterSearch();
  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&query=${term}`)
    .then(response => {
      document.getElementById("filter").style.display = "block";
      let dataFilter = new DataFilter(response.data.results);
      populateCounters(dataFilter);
      resetFilter(movie);
      dataFilter.getMovieCards().forEach(x => {
        mainSection.appendChild(x.outputDiv());
      })

      movie.onclick = () => {
        resetFilter(movie);
        dataFilter.getMovieCards().forEach(x => {
          mainSection.appendChild(x.outputDiv());
        })
      }

      tv.onclick = () => {
        resetFilter(tv);
        dataFilter.getTvCards().forEach(x => {
          mainSection.appendChild(x.outputDiv());
        })
      }

      person.onclick = () => {
        resetFilter(person);
        dataFilter.getPersonCards().forEach(x => {
          mainSection.appendChild(x.outputDiv());
        })
      }
    })
}