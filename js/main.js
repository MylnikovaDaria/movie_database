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

// Класс для оздание фильтра для обработки результатов поиска
class FilterConstructor extends StructureConstructor {
  constructor(classNames) {
    super(classNames);
  }

  createA(inner, id) {
    let a = document.createElement("a");
    a.className = this.classNames.a;
    a.setAttribute("href", "#")
    a.id = id;
    a.innerHTML = inner;
    return a
  }

  outputUl() {
    let outputUl = this.createUl();
    let li = this.createLi("");
    let li1 = this.createLi("");
    let li2 = this.createLi("");
    let a = this.createA("Movies", "movie");
    let a1 = this.createA("TV shows", "tv");
    let a2 = this.createA("Person", "person");
    li.appendChild(a);
    li1.appendChild(a1);
    li2.appendChild(a2);
    outputUl.appendChild(li);
    outputUl.appendChild(li1);
    outputUl.appendChild(li2);
    return outputUl;
  }
}

// Класс для создания карточек  upcoming и rated  фильмов, тв шоу
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

// Класс для создания карточек  списков фильмов
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

// Класс для создания карточек  фильмов и тв шоу
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
      inner = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
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

// Класс для создания карточек  людей
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
    console.log(arr);
    let newArr = [];
    arr.forEach(x => {
      newArr.push((x.title == undefined) ? x.name : x.title);
    })
    console.log(newArr);
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

// Функция рандомного выбора
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

// Входящие данные
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let ratedClassNames = {
  div: "main-section__block",
  a: "main-section__block__a",
  img: "main-section__block__img",
  p: "main-section__block__p",
  h2: "main-section__h2"
}

let filterClassNames = {
  ul: "main-section__ul",
  li: "main-section__ul__li",
  a: "main-section__ul__li__a"
}

let asideClassNames = {
  div: "main-aside__block",
  a: "main-aside__block__a",
  img: "main-aside__block__img",
  p: "main-aside__block__p"
}

let cardClassNames = {
  div: "main-section__block main-section__block_search_results movie",
  a: "main-section__block__a main-section__block__a_search_results ",
  img: "main-section__block__img main-section__block__img_search_results",
  p: "main-section__block__p main-section__block__p_search_results"
}

let listClassNames = {
  div: "main-bottom__block",
  a: "main-bottom__block__a",
  img: "main-bottom__block__img"
}

let aside = document.getElementById("aside");
let main = document.getElementById('main');
let mainBlock = document.getElementById('main-block');
let mainSection = document.getElementById('main-section');
let mainBottom = document.getElementById('main-bottom');
let arrList = [3, 28, 3945, 2469, 932, 3681, 43, 338, 3321, 1131, 3682, 1];
let randArrList = getRandomArr(arrList, 3, 0);
let listId;


// Запрос на отображение самых рейтинговых тв шоу
axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&language=en-US&page=1")
  .then(response => {
    let data = getRandomArr(response.data.results, 6, 0);
    data.forEach(x => {
      let blockTvTopRated = new UpcomingConstructor(ratedClassNames, x.poster_path, x.name);
      mainSection.appendChild(blockTvTopRated.outputDiv());
    })
  })

// Запрос на отображение upcoming фильмов
axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&language=en-US&page=1&region=US")
  .then(response => {
    let data = getRandomArr(response.data.results, 3, 0);
    data.forEach(x => {
      let blockUpcoming = new UpcomingConstructor(asideClassNames, x.poster_path, x.title)
      aside.appendChild(blockUpcoming.outputDiv());
    })
  })

// Запрос на отображение пользовательских списков фильмов
randArrList.forEach(x => {
  listId = x;
  axios.get(`https://api.themoviedb.org/3/list/${listId}?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&language=en-US`)
    .then(response => {
      let blockList = new ListConstructor(listClassNames, response.data.name, response.data.poster_path)
      mainBottom.appendChild(blockList.outputDiv());
    })
})

// Функция применения кастомных стилей после получения результатов поиска
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

// Поиск фильмов и tv шоу
document.getElementById('submit').onclick = () => {
  let term = document.getElementById("search").value;
  applyCustomStylesAfterSearch();

  let filter = new FilterConstructor(filterClassNames);
  main.appendChild(filter.outputUl());

  let movie = document.getElementById("movie");
  let tv = document.getElementById("tv");
  let person = document.getElementById("person");

  axios.get(`https://api.themoviedb.org/3/search/multi?api_key=a4d66e0eba55fbd6378c9d51a9483aa3&query=${term}`)
    .then(response => {
      let data = response.data.results;
      let numberOfMovies = data.filter(x => x.media_type == "movie");
      let numberOfTvShows = data.filter(x => x.media_type == "tv");
      let numberOfPerson = data.filter(x => x.media_type == "person");

      console.log(numberOfPerson);

      movie.insertAdjacentHTML("beforeEnd", `<span class="main-section__ul__li__a_span"> (${numberOfMovies.length})</span>`);
      tv.insertAdjacentHTML("beforeEnd", `<span class="main-section__ul__li__a_span"> (${numberOfTvShows.length})</span>`);
      person.insertAdjacentHTML("beforeEnd", `<span class="main-section__ul__li__a_span"> (${numberOfPerson.length})</span>`);
      let resetFilter = () => {
        movie.style.borderBottom = "1px solid transparent";
        tv.style.borderBottom = "1px solid transparent";
        person.style.borderBottom = "1px solid transparent";
      }

      resetFilter();
      movie.style.borderBottom = "1px solid green";
      numberOfMovies.forEach(x => {
        let blockSearch = new CardsConstructor(cardClassNames, x.poster_path, x.name, x.title, x.vote_average, x.release_date, x.first_air_date, x.overview)
        mainSection.appendChild(blockSearch.outputDiv());
      })


      movie.onclick = () => {
        resetFilter();
        movie.style.borderBottom = "1px solid green";
        mainSection.innerHTML = '';
        numberOfMovies.forEach(x => {
          let blockSearch = new CardsConstructor(cardClassNames, x.poster_path, x.name, x.title, x.vote_average, x.release_date, x.first_air_date, x.overview)
          mainSection.appendChild(blockSearch.outputDiv());
        })
      }

      tv.onclick = () => {
        resetFilter();
        tv.style.borderBottom = "1px solid green";
        mainSection.innerHTML = '';
        numberOfTvShows.forEach(x => {
          let blockSearch = new CardsConstructor(cardClassNames, x.poster_path, x.name, x.title, x.vote_average, x.release_date, x.first_air_date, x.overview)
          mainSection.appendChild(blockSearch.outputDiv());
        })
      }

      person.onclick = () => {
        resetFilter();
        person.style.borderBottom = "1px solid green";
        mainSection.innerHTML = '';
        numberOfPerson.forEach(x => {
          let blockSearch = new PersonCardConstructor(cardClassNames, x.profile_path, x.name, x.popularity, x.known_for)
          mainSection.appendChild(blockSearch.outputDiv());
          console.log(x.known_for)
        })
      }
    })
}